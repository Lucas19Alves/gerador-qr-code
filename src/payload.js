// Monta o conteúdo do QR Code a partir do tipo escolhido.
const wifiEscape = (s) => s.replace(/([\\;,:"])/g, "\\$1");

export function buildPayload(type, f) {
  switch (type) {
    case "link": {
      const url = f.url.trim();
      if (!url) return "";
      return /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `https://${url}`;
    }
    case "text":
      return f.text.trim();
    case "whatsapp": {
      let phone = f.phone.replace(/\D/g, "");
      if (!phone) return "";
      // Número brasileiro sem DDI (10–11 dígitos) ganha o 55.
      if (phone.length <= 11) phone = `55${phone}`;
      const msg = f.message.trim();
      return `https://wa.me/${phone}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
    }
    case "wifi": {
      if (!f.ssid.trim()) return "";
      const sec = f.password ? f.security : "nopass";
      const pass = f.password ? `P:${wifiEscape(f.password)};` : "";
      return `WIFI:T:${sec};S:${wifiEscape(f.ssid.trim())};${pass}${f.hidden ? "H:true;" : ""};`;
    }
    case "email": {
      const to = f.email.trim();
      if (!to) return "";
      const q = new URLSearchParams();
      if (f.subject.trim()) q.set("subject", f.subject.trim());
      if (f.body.trim()) q.set("body", f.body.trim());
      const qs = q.toString().replace(/\+/g, "%20");
      return `mailto:${to}${qs ? `?${qs}` : ""}`;
    }
    default:
      return "";
  }
}

// Luminância relativa (WCAG) para avisar quando o leitor pode falhar.
export function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
