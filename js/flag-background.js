/**
 * flag-background.js
 *
 * Rotates the page background between three flag designs, using the exact CSS you gave:
 *   "duo"   -> CSS code 1: diagonal split, trans (top left) + bi (bottom right), hard stripes
 *   "trans" -> CSS code 2: trans flag, hard stripes
 *   "bi"    -> CSS code 3: bisexual flag, smooth gradient
 *
 * The flag is worked out from the visitor's local date/time, so no server or
 * storage is needed. Usage: <script src="flag-background.js" defer></script>
 * (Remove any old `background` rules on `body` so they don't conflict.)
 */
(() => {
  // ===================== CONFIG: edit these =====================
  const CONFIG = {
    order: ["duo", "trans", "bi"], // rotation order (CSS code 1, 2, 3); remove one to skip it
    intervalDays: 1,               // days each flag stays up
    switchAt: "00:00",             // time of day to switch, 24h local time "HH:MM"
    startDate: null,               // optional "YYYY-MM-DD" when the first flag in `order` starts
    testIntervalMinutes: 1,     // e.g. 1 to rotate every minute while testing
  };
  // ==============================================================

  const DAY = 86400000;

  // ---- The three flag styles ----
  const STYLES = `
    /* Shared by all three so the layout never shifts when the flag changes */
    body[data-flag] {
      position: relative;
      isolation: isolate;
      margin: 0;
      min-height: 100vh;
    }

    /* CSS code 1: diagonal duo */
    body[data-flag="duo"] {
      background: linear-gradient(
        to bottom,
        rgb(214, 2, 112) 0% 40%,
        rgb(155, 79, 150) 40% 60%,
        rgb(0, 56, 168) 60% 100%
      );
    }

    body[data-flag="duo"]::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(
        to bottom,
        rgb(91, 206, 250) 0% 20%,
        rgb(245, 169, 184) 20% 40%,
        rgb(255, 255, 255) 40% 60%,
        rgb(245, 169, 184) 60% 80%,
        rgb(91, 206, 250) 80% 100%
      );
      clip-path: polygon(0 0, 100% 0, 0 100%);
    }

    /* CSS code 2: trans, hard stripes */
    body[data-flag="trans"] {
      background: linear-gradient(
        to bottom,
        rgb(91, 206, 250) 0% 20%,
        rgb(245, 169, 184) 20% 40%,
        rgb(255, 255, 255) 40% 60%,
        rgb(245, 169, 184) 60% 80%,
        rgb(91, 206, 250) 80% 100%
      );
    }

    /* CSS code 3: bi, smooth */
    body[data-flag="bi"] {
      background: linear-gradient(
        to bottom,
        rgb(214, 2, 112) 20%,
        rgb(155, 79, 150) 50%,
        rgb(0, 56, 168) 80%
      );
    }
  `;

  // ---- Schedule ----
  const epochDay = (y, m, d) => Math.floor(Date.UTC(y, m, d) / DAY);

  function period(now) {
    if (CONFIG.testIntervalMinutes) {
      return Math.floor(now.getTime() / (CONFIG.testIntervalMinutes * 60000));
    }

    const t = /^(\d{1,2}):(\d{2})$/.exec(CONFIG.switchAt) || [0, 0, 0];
    const switchMin = Number(t[1]) * 60 + Number(t[2]);

    // Before today's switch time we are still in yesterday's period.
    let day = epochDay(now.getFullYear(), now.getMonth(), now.getDate());
    if (now.getHours() * 60 + now.getMinutes() < switchMin) day--;

    const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(CONFIG.startDate || "");
    const start = s ? epochDay(+s[1], +s[2] - 1, +s[3]) : 0;

    const interval = Math.max(1, Math.floor(CONFIG.intervalDays) || 1);
    return Math.floor((day - start) / interval);
  }

  function currentFlag() {
    const valid = ["duo", "trans", "bi"];

    // Preview with ?flag=duo, ?flag=trans or ?flag=bi in the URL.
    const forced = new URLSearchParams(location.search).get("flag");
    if (valid.includes(forced)) return forced;

    const order = CONFIG.order.filter((f) => valid.includes(f));
    if (!order.length) return valid[0];
    return order[((period(new Date()) % order.length) + order.length) % order.length];
  }

  // ---- Apply ----
  function update() {
    document.body.dataset.flag = currentFlag();
  }

  function init() {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);

    update();
    setInterval(update, 30000);                      // catch the switch while the page is open
    document.addEventListener("visibilitychange", update);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
