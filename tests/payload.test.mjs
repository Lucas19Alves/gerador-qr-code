import assert from "node:assert/strict";
import { buildPayload, contrast } from "../src/payload.js";

const base = { url: "", text: "", phone: "", message: "", ssid: "", password: "", security: "WPA", hidden: false, email: "", subject: "", body: "" };
const p = (type, f) => buildPayload(type, { ...base, ...f });

assert.equal(p("link", { url: "github.com" }), "https://github.com");
assert.equal(p("link", { url: "http://a.b" }), "http://a.b");
assert.equal(p("link", { url: "  " }), "");
assert.equal(p("whatsapp", { phone: "(11) 98192-7567", message: "Oi tudo bem?" }), "https://wa.me/5511981927567?text=Oi%20tudo%20bem%3F");
assert.equal(p("whatsapp", { phone: "+55 11 98192-7567" }), "https://wa.me/5511981927567");
assert.equal(p("wifi", { ssid: "Casa;1", password: "a:b" }), "WIFI:T:WPA;S:Casa\\;1;P:a\\:b;;");
assert.equal(p("wifi", { ssid: "Livre" }), "WIFI:T:nopass;S:Livre;;");
assert.equal(p("email", { email: "a@b.com", subject: "Olá mundo" }), "mailto:a@b.com?subject=Ol%C3%A1%20mundo");
assert.ok(contrast("#000000", "#ffffff") > 20);
assert.ok(contrast("#ffffff", "#ffffff") < 1.01);
console.log("payload ok");
