const QRCode = require("qrcode");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { text, color } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto ou URL é obrigatório" });
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, {
      color: {
        dark: color || "#000000",
        light: "#ffffff"
      },
      margin: 2,
      width: 512
    });
    
    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    res.status(500).json({ error: "Erro interno ao gerar QR Code" });
  }
};