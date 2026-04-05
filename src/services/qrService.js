import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const qrService = {
  async generate(text, color = "#000000") {
    try {
      const response = await axios.post(`${API_URL}/generate`, {
        text,
        color
      });
      return response.data.qrCode;
    } catch (error) {
      console.error("Erro ao gerar QR Code no serviço:", error);
      throw error;
    }
  },

  download(qrCodeUrl) {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
