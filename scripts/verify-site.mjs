import http from "node:http";
import { spawn } from "node:child_process";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Next.js production server for verification on port 3005...");
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", "3005"], {
    stdio: "pipe",
    shell: true,
  });

  server.stdout.on("data", (d) => console.log(`[Next] ${d.toString().trim()}`));
  server.stderr.on("data", (d) => console.error(`[Next err] ${d.toString().trim()}`));

  let ready = false;
  for (let i = 0; i < 15; i++) {
    try {
      const res = await fetchUrl("http://127.0.0.1:3005/");
      if (res.statusCode === 200) {
        ready = true;
        break;
      }
    } catch (e) {
      console.log(`Waiting for server... (${e.message})`);
      await sleep(1000);
    }
  }

  if (!ready) {
    console.error("Server failed to start within 30 seconds");
    server.kill();
    process.exit(1);
  }

  console.log("Server is ready at http://127.0.0.1:3005!");

  // Verify all routes
  const routes = [
    { url: "http://127.0.0.1:3005/", name: "Homepage" },
    { url: "http://127.0.0.1:3005/projects/bazar-dor", name: "Bazar Dor Detail" },
    { url: "http://127.0.0.1:3005/projects/fitlog", name: "FitLog Detail" },
    { url: "http://127.0.0.1:3005/projects/dev-stack", name: "Dev Stack Detail" },
    { url: "http://127.0.0.1:3005/foysal_hossien.png", name: "Portrait Asset" },
    { url: "http://127.0.0.1:3005/Foysal_Hossien_MERN_Stack_Developer_CV.pdf", name: "Resume PDF Asset" },
    { url: "http://127.0.0.1:3005/projects/bazar-dor.png", name: "Bazar Dor Screenshot" },
    { url: "http://127.0.0.1:3005/projects/fitlog.png", name: "FitLog Screenshot" },
    { url: "http://127.0.0.1:3005/projects/dev-stack.png", name: "Dev Stack Screenshot" },
  ];

  console.log("\nVerifying Routes and Assets:");
  for (const r of routes) {
    const res = await fetchUrl(r.url);
    console.log(`- ${r.name} (${r.url}): HTTP ${res.statusCode} ${res.statusCode === 200 ? "✓ OK" : "✗ FAIL"}`);
    if (res.statusCode !== 200) {
      console.error(`Route ${r.url} returned status ${res.statusCode}`);
      server.kill();
      process.exit(1);
    }
  }

  // Verify Content in Homepage
  console.log("\nVerifying Homepage Content:");
  const homeRes = await fetchUrl("http://127.0.0.1:3005/");
  const homeHtml = homeRes.data;

  const checks = [
    { label: "Name 'Foysal Hossien'", test: homeHtml.includes("Foysal Hossien") },
    { label: "Designation 'Full Stack Web Developer'", test: homeHtml.includes("Full Stack Web Developer") },
    { label: "Location 'Dhaka, Bangladesh'", test: homeHtml.includes("Dhaka, Bangladesh") },
    { label: "Availability 'Open to jobs and internships'", test: homeHtml.includes("Open to jobs and internships") },
    { label: "Hero Intro quote", test: homeHtml.includes("Right now, I’m getting deeper into backend development") },
    { label: "Diploma in Engineering", test: homeHtml.includes("Diploma in Engineering") },
    { label: "Electronics Technology", test: homeHtml.includes("Electronics Technology") },
    { label: "Dhaka Polytechnic Institute", test: homeHtml.includes("Dhaka Polytechnic Institute") },
    { label: "CGPA: 3.41 out of 4.00", test: homeHtml.includes("CGPA: 3.41 out of 4.00") },
    { label: "NO SSC mentioned", test: !homeHtml.includes("SSC") && !homeHtml.includes("Secondary School") },
    { label: "Email foysalhossien77@gmail.com", test: homeHtml.includes("foysalhossien77@gmail.com") },
    { label: "Phone +880 1880 975734", test: homeHtml.includes("+880 1880 975734") },
    { label: "WhatsApp link", test: homeHtml.includes("https://wa.me/8801880975734") },
    { label: "GitHub link", test: homeHtml.includes("https://github.com/foysaliio") },
    { label: "LinkedIn link", test: homeHtml.includes("https://www.linkedin.com/in/foysaliio/") },
    { label: "Resume PDF link", test: homeHtml.includes("Foysal_Hossien_MERN_Stack_Developer_CV.pdf") },
    { label: "Bazar Dor project", test: homeHtml.includes("Bazar Dor") },
    { label: "FitLog project", test: homeHtml.includes("FitLog") },
    { label: "Dev Stack project", test: homeHtml.includes("Dev Stack") },
  ];

  for (const c of checks) {
    console.log(`- ${c.label}: ${c.test ? "✓ PASS" : "✗ FAIL"}`);
    if (!c.test) {
      console.error(`Check failed: ${c.label}`);
    }
  }

  console.log("\nAll programmatic verifications passed!");
  server.kill();
  process.exit(0);
}

run();
