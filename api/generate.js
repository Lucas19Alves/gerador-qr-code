// filepath: c:\Users\Lucas\Documents\Projetos\gerador-qr-code\api\generate.js
const QRCode = require("qrcode");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { text, color } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto é obrigatório" });
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, { color: { dark: color } });
    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar QR Code" });
  }
};