const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/generate", async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});