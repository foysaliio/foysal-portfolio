import { NextResponse } from "next/server";
import { summarizeDays, type ContributionDay } from "@/lib/github-activity";

const USERNAME = "foysaliio";
const QUERY = `query Activity($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GitHub activity is not configured yet." }, { status: 503 });
  }
  const to = new Date().toISOString().slice(0, 10);
  const from = new Date(Date.parse(to + "T00:00:00Z") - 364 * 86400000)
    .toISOString().slice(0, 10);
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "foysaliio-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: {
        login: USERNAME, from: from + "T00:00:00Z", to: to + "T23:59:59Z",
      } }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("GitHub request failed");
    const result = await response.json();
    const weeks = result.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (result.errors?.length || !Array.isArray(weeks)) throw new Error("Invalid calendar");
    const days: ContributionDay[] = weeks.flatMap(
      (week: { contributionDays: ContributionDay[] }) => week.contributionDays,
    ).filter((day: ContributionDay) => day.date >= from && day.date <= to);
    if (days.length !== 365 || days.some((day) =>
      !Number.isInteger(day.contributionCount) || day.contributionCount < 0 ||
      !Number.isInteger(day.weekday) || day.weekday < 0 || day.weekday > 6
    ) || new Set(days.map((day) => day.date)).size !== 365) {
      throw new Error("Incomplete calendar");
    }
    days.sort((a, b) => a.date.localeCompare(b.date));
    return NextResponse.json({ username: USERNAME, from, to, days, ...summarizeDays(days, to) });
  } catch {
    return NextResponse.json({ error: "GitHub activity is temporarily unavailable." }, { status: 502 });
  }
}
