const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.post("/api/generate", async (req, res) => {
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
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});