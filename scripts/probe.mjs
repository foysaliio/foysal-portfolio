import http from "node:http";
import { spawn } from "node:child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 3030;
const DEBUG_PORT = 9245;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

async function run() {
  console.log("Starting server on port", PORT);
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", String(PORT)], { stdio: "pipe", shell: true });
  await sleep(3000);

  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${process.env.TEMP}\\chrome-probe-${Date.now()}`,
    `http://127.0.0.1:${PORT}/`,
  ], { stdio: "ignore" });

  await sleep(3000);

  const tabs = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
  const targetTab = tabs.find(t => t.url && t.url.startsWith("http"));
  console.log("Target Tab:", targetTab.title, targetTab.url);

  const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  function evaluate(expr) {
    return new Promise((resolve) => {
      const id = Math.floor(Math.random() * 100000);
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === id) resolve(msg.result?.result?.value);
      };
      ws.send(JSON.stringify({ id, method: "Runtime.evaluate", params: { expression: expr, returnByValue: true } }));
    });
  }

  console.log("URL:", await evaluate("window.location.href"));
  console.log("Title:", await evaluate("document.title"));
  console.log("HTML classes:", await evaluate("document.documentElement.className"));
  console.log("Dark class?:", await evaluate("document.documentElement.classList.contains('dark')"));
  console.log("Button exists?:", await evaluate("!!document.querySelector('button[aria-label*=\"Switch to\"]')"));
  console.log("H1 text:", await evaluate("document.querySelector('h1')?.innerText"));

  chrome.kill();
  server.kill();
  process.exit(0);
}

run();
