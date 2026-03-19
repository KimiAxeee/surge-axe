// ══════════════════════════════════════
// response_logger.js - AXE Response Logger
// ══════════════════════════════════════

const TELEGRAM_TOKEN = "APNA_TOKEN_DAAL";
const CHAT_ID = "APNA_CHAT_ID_DAAL";

const url = $request.url;
const status = $response.status || 0;
const headers = $response.headers || {};
const rawBody = $response.body || "";

// Body decode
let body = rawBody;
try {
  const j = JSON.parse(body);
  body = JSON.stringify(j, null, 2);
} catch(e) {}

// Status emoji
let statusEmoji = "✅";
if (status >= 400 && status < 500) statusEmoji = "⚠️";
if (status >= 500) statusEmoji = "❌";

// Sensitive data check
const sensitiveKeys = ["token","access_token","refresh_token","api_key","secret","password","private_key","bearer"];
let found = [];
const bodyLower = body.toLowerCase();
for (const k of sensitiveKeys) {
  if (bodyLower.includes(k)) found.push(k);
}

let alert = found.length > 0 ? "\n🔑 KEYS FOUND: " + found.join(", ") : "";

const msg = [
  "━━━━━━━━━━━━━━━━━━━━",
  statusEmoji + " RESPONSE " + status + alert,
  "━━━━━━━━━━━━━━━━━━━━",
  "🔗 " + url,
  "📋 Headers:",
  JSON.stringify(headers, null, 2).substring(0, 500),
  "📦 Body:",
  body.substring(0, 2500),
  "⏰ " + new Date().toISOString()
].join("\n");

$httpClient.post({
  url: "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: msg.substring(0, 4000)
  })
}, function(err, resp, data) {
  $done({});
});
