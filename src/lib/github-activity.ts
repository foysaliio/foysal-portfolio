export type ContributionDay = {
  date: string;
  weekday: number;
  contributionCount: number;
  contributionLevel: string;
};

export type GitHubActivityData = {
  username: string;
  from: string;
  to: string;
  days: ContributionDay[];
  total: number;
  currentStreak: number;
  longestStreak: number;
};

export function summarizeDays(days: ContributionDay[], today: string) {
  const ordered = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let total = 0;
  let run = 0;
  let longestStreak = 0;
  let previous = 0;
  for (const day of ordered) {
    const time = Date.parse(day.date + "T00:00:00Z");
    total += day.contributionCount;
    run = day.contributionCount > 0
      ? (time - previous === 86400000 ? run + 1 : 1)
      : 0;
    longestStreak = Math.max(longestStreak, run);
    previous = time;
  }
  const byDate = new Map(ordered.map((day) => [day.date, day]));
  let cursor = Date.parse(today + "T00:00:00Z");
  // An unfinished, inactive today does not break yesterday's streak.
  if (!byDate.get(today)?.contributionCount) cursor -= 86400000;
  let currentStreak = 0;
  while (byDate.get(new Date(cursor).toISOString().slice(0, 10))?.contributionCount) {
    currentStreak++;
    cursor -= 86400000;
  }
  return { total, currentStreak, longestStreak };
}
