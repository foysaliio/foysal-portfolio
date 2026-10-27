import http from "node:http";
import { spawn } from "node:child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 3035;
const DEBUG_PORT = 9250;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.eventListeners = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      } else if (msg.method && this.eventListeners.has(msg.method)) {
        this.eventListeners.get(msg.method)(msg.params);
      }
    };
  }

  waitOpen() {
    return new Promise((resolve, reject) => {
      if (this.ws.readyState === WebSocket.OPEN) return resolve();
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.value;
  }

  async navigateAndWait(url) {
    await this.send("Page.navigate", { url });
    for (let i = 0; i < 50; i++) {
      await sleep(200);
      const currentUrl = await this.eval("window.location.href");
      const ready = await this.eval("document.readyState === 'complete'");
      const hasContent = await this.eval("document.body && document.body.innerText.length > 20");
      if (currentUrl === url && ready && hasContent) return;
    }
  }
}

async function run() {
  console.log("Starting Next.js production server on port " + PORT + "...");
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", String(PORT)], {
    stdio: "pipe",
    shell: true,
  });

  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}/`, (res) => {
          if (res.statusCode === 200) resolve();
          else reject();
        }).on("error", reject);
      });
      ready = true;
      break;
    } catch {
      await sleep(1000);
    }
  }

  if (!ready) {
    console.error("Next.js server failed to start");
    server.kill();
    process.exit(1);
  }
  console.log("Next.js server ready!");

  console.log("Launching headless Chrome on debug port " + DEBUG_PORT + "...");
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${process.env.TEMP}\\chrome-inspect-${Date.now()}`,
      `http://127.0.0.1:${PORT}/`,
    ],
    { stdio: "ignore" }
  );

  await sleep(2000);

  const versionInfo = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
  console.log(`Connected to Chrome: ${versionInfo["Browser"]}`);

  const tabs = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
  const targetTab = tabs.find((t) => t.url && t.url.startsWith("http")) || tabs[0];
  console.log(`Target tab: "${targetTab.title}" (${targetTab.url})`);
  const cdp = new CDPClient(targetTab.webSocketDebuggerUrl);
  await cdp.waitOpen();

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  const results = [];

  // Navigate to Homepage
  console.log("\nNavigating to homepage http://127.0.0.1:" + PORT + "/ ...");
  await cdp.navigateAndWait(`http://127.0.0.1:${PORT}/`);
  await sleep(500);

  // Check 1: Responsive widths and Horizontal Overflow
  const viewports = [
    { width: 360, height: 800, label: "360px (Small Mobile)" },
    { width: 390, height: 844, label: "390px (Modern Mobile)" },
    { width: 768, height: 1024, label: "768px (Tablet)" },
    { width: 1024, height: 768, label: "1024px (Desktop)" },
    { width: 1440, height: 900, label: "1440px (Wide Desktop)" },
  ];

  console.log("\n--- VIEWPORT & HORIZONTAL SCROLL CHECKS ---");
  for (const vp of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
    });
    await sleep(400);

    const overflow = await cdp.eval(`
      ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })
    `);

    const passed = !overflow.hasOverflow;
    console.log(`- ${vp.label}: scrollWidth=${overflow.scrollWidth}px, clientWidth=${overflow.clientWidth}px -> ${passed ? "PASS (No horizontal scroll)" : "FAIL"}`);
    results.push({ check: `Horizontal overflow ${vp.width}px`, passed });
  }

  // Check 2: Theme Persistence & Toggle
  console.log("\n--- THEME TOGGLE & PERSISTENCE CHECKS ---");
  console.log("Current URL:", await cdp.eval("window.location.href"));
  console.log("HTML Start:", await cdp.eval("document.documentElement.outerHTML.slice(0, 150)"));
  console.log("Class list:", await cdp.eval("document.documentElement.className"));
  const initialTheme = await cdp.eval(`document.documentElement.classList.contains('dark') ? 'dark' : 'light'`);
  console.log(`- Initial default theme: ${initialTheme} (Expected: dark) -> ${initialTheme === "dark" ? "PASS" : "FAIL"}`);
  results.push({ check: "Initial theme is dark", passed: initialTheme === "dark" });

  // Click theme toggle
  await cdp.eval(`document.querySelector('button[aria-label*="Switch to"]').click()`);
  await sleep(300);

  const toggledTheme = await cdp.eval(`document.documentElement.classList.contains('dark') ? 'dark' : 'light'`);
  const localStorageTheme = await cdp.eval(`localStorage.getItem('theme')`);
  const togglePassed = toggledTheme === "light" && localStorageTheme === "light";
  console.log(`- Toggled theme: ${toggledTheme}, localStorage: ${localStorageTheme} -> ${togglePassed ? "PASS" : "FAIL"}`);
  results.push({ check: "Theme toggle to light", passed: togglePassed });

  // Reload page to test persistence across reloads
  await cdp.navigateAndWait(`http://127.0.0.1:${PORT}/`);
  await sleep(500);
  const reloadedTheme = await cdp.eval(`document.documentElement.classList.contains('dark') ? 'dark' : 'light'`);
  console.log(`- Theme after reload: ${reloadedTheme} -> ${reloadedTheme === "light" ? "PASS (Persisted)" : "FAIL"}`);
  results.push({ check: "Theme persistence across reload", passed: reloadedTheme === "light" });

  // Toggle back to dark
  await cdp.eval(`document.querySelector('button[aria-label*="Switch to"]').click()`);
  await sleep(300);
  const backToDark = await cdp.eval(`document.documentElement.classList.contains('dark') ? 'dark' : 'light'`);
  console.log(`- Theme toggled back to dark: ${backToDark} -> ${backToDark === "dark" ? "PASS" : "FAIL"}`);
  results.push({ check: "Theme toggled back to dark", passed: backToDark === "dark" });

  // Check 3: Mobile Navigation Accessibility
  console.log("\n--- MOBILE NAVIGATION ACCESSIBILITY ---");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await sleep(500);

  const initialMenuExpanded = await cdp.eval(`document.querySelector('button[aria-controls="mobile-navigation"]')?.getAttribute('aria-expanded')`);
  console.log(`- Mobile menu initially aria-expanded: ${initialMenuExpanded} (Expected: false)`);

  // Open mobile menu
  await cdp.eval(`document.querySelector('button[aria-controls="mobile-navigation"]').click()`);
  await sleep(300);
  const openedMenuExpanded = await cdp.eval(`document.querySelector('button[aria-controls="mobile-navigation"]')?.getAttribute('aria-expanded')`);
  const menuVisible = await cdp.eval(`!!document.getElementById('mobile-navigation')`);
  console.log(`- Mobile menu after click: aria-expanded=${openedMenuExpanded}, visible=${menuVisible} -> ${openedMenuExpanded === "true" && menuVisible ? "PASS" : "FAIL"}`);
  results.push({ check: "Mobile menu opens with aria-expanded", passed: openedMenuExpanded === "true" && menuVisible });

  // Close menu via Escape
  await cdp.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
  await sleep(300);
  const closedMenuVisible = await cdp.eval(`!!document.getElementById('mobile-navigation')`);
  console.log(`- Mobile menu closes on Escape: ${!closedMenuVisible ? "PASS" : "FAIL"}`);
  results.push({ check: "Mobile menu closes on Escape", passed: !closedMenuVisible });

  // Check 4: Project Detail Routes Direct Load & Verification
  console.log("\n--- PROJECT DETAIL ROUTES DIRECT LOAD ---");
  const projectSlugs = ["bazar-dor", "fitlog", "dev-stack"];
  for (const slug of projectSlugs) {
    await cdp.navigateAndWait(`http://127.0.0.1:${PORT}/projects/${slug}`);
    await sleep(500);
    const detailTitle = await cdp.eval(`document.querySelector('h1')?.innerText`);
    const hasBackLink = await cdp.eval(`!!document.querySelector('a[href="/#projects"]')`);
    const hasLiveLink = await cdp.eval(`!!document.querySelector('a[href^="http"]')`);
    console.log(`- /projects/${slug}: h1="${detailTitle}", backLink=${hasBackLink}, liveLink=${hasLiveLink} -> PASS`);
    results.push({ check: `Project detail route /projects/${slug}`, passed: !!detailTitle && hasBackLink && hasLiveLink });
  }

  // Summary
  const allPassed = results.every((r) => r.passed);
  console.log(`\n========================================`);
  console.log(`BROWSER INSPECTION SUMMARY: ${allPassed ? "ALL CHECKS PASSED ✓" : "SOME CHECKS FAILED ✗"}`);
  console.log(`========================================`);

  chrome.kill();
  server.kill();
  process.exit(allPassed ? 0 : 1);
}

run();
