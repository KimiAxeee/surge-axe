// ══════════════════════════════════════
// body_modifier.js - AXE Body Injector
// Request body mein custom fields inject karo
// ══════════════════════════════════════

const headers = $request.headers || {};
const rawBody = $request.body || "";

if (!rawBody) {
  $done({});
  return;
}

let modified = rawBody;
let didModify = false;

try {
  let json = JSON.parse(rawBody);

  // Custom field inject
  // json["_axe"] = "intercepted";
  
  // Example: Agar koi field missing ho toh add karo
  // if (!json["device_id"]) json["device_id"] = "axe_device_001";

  modified = JSON.stringify(json);
  didModify = true;
} catch(e) {
  // JSON nahi hai - form data ya plain text
  // modified = rawBody + "&_axe=1"; // form data ke liye
  modified = rawBody;
}

if (didModify) {
  $done({
    body: modified,
    headers: headers
  });
} else {
  $done({});
}
