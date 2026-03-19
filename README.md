# ⚡ surge-axe — AXE Surge Toolkit

> Complete Surge 5 toolkit for iOS — MITM logging, token extraction, ad blocking, mock APIs, CORS bypass

---

## 📦 Modules (One-Click Install)

| Module | Install | Description |
|--------|---------|-------------|
| Master Logger | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/master-logger.sgmodule) | Logs all req/res to Telegram |
| Token Extractor | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/token-extractor.sgmodule) | Captures JWT, API keys, tokens |
| Ads & Tracker Block | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/ads-block.sgmodule) | Blocks 30+ trackers/ad networks |
| CORS Bypass | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/cors-bypass.sgmodule) | Removes all security headers |
| Mock API | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/mock-api.sgmodule) | Local mock endpoints |
| DNS Logger | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/dns-logger.sgmodule) | Logs sensitive DNS queries |
| Body Modifier | [Install](https://raw.githubusercontent.com/APNA_USERNAME/surge-axe/main/modules/body-modifier.sgmodule) | Injects fields into requests |

---

## ⚙️ Setup

### 1. Telegram Bot Setup
1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. `/newbot` → name daal → token copy karo
3. Apne chat pe `/start` karo → Chat ID milega [@userinfobot](https://t.me/userinfobot) se

### 2. Scripts mein token daal
Har JS file mein yeh 2 lines update karo:
```js
const TELEGRAM_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";
```

### 3. Module install karo Surge mein
- Surge → More → Module → Install from URL
- Upar table se koi bhi URL paste karo

### 4. Full conf use karna ho toh
- `conf/Default.conf` download karo
- Apna CA p12 aur passphrase daal
- Telegram token/chat ID update karo
- Surge mein import karo

---

## 🔧 Mock API Endpoints

Test karne ke liye yeh URLs use karo:

| URL | Response |
|-----|----------|
| `http://mock.axe.local/success` | `{"status":"success","code":200}` |
| `http://mock.axe.local/error` | `{"status":"error","code":500}` |
| `http://mock.axe.local/auth` | `{"token":"mock_token_axe_123",...}` |
| `http://mock.axe.local/user` | `{"id":"axe_001","name":"Axe User",...}` |
| `http://mock.axe.local/list` | `{"items":[...],"total":2}` |
| `http://mock.axe.local/ping` | `{"pong":true}` |
| `http://mock.axe.local/empty` | `{}` |
| `http://mock.axe.local/404` | `{"error":"not_found","code":404}` |

---

## 📁 Repo Structure

```
surge-axe/
├── modules/
│   ├── master-logger.sgmodule
│   ├── token-extractor.sgmodule
│   ├── ads-block.sgmodule
│   ├── cors-bypass.sgmodule
│   ├── mock-api.sgmodule
│   ├── dns-logger.sgmodule
│   └── body-modifier.sgmodule
├── scripts/
│   ├── request_logger.js
│   ├── response_logger.js
│   ├── token_extractor.js
│   ├── body_modifier.js
│   └── dns_logger.js
├── conf/
│   └── Default.conf
└── README.md
```

---

## ⚠️ Requirements

- Surge iOS 5.x
- MITM certificate installed & trusted
- Telegram bot token + chat ID

---

## 👤 Author

**AXE / KimiAxe World**
- Website: [kimiaxe.com](https://kimiaxe.com)
