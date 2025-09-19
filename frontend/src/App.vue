<script setup>
import { ref } from "vue";
import axios from "axios";

const text = ref("");
const qrCode = ref("");

const generateQRCode = async () => {
  if (!text.value.trim()) {
    alert("Digite um texto para gerar o QR Code.");
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, {
      text: text.value,
      color: "#000000"
    });
    qrCode.value = response.data.qrCode;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
  }
};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 bg-dark" style="max-width: 400px;">
      <h1 class="card-title text-center text-white">Gerador de QR Code</h1>
      
      <div class="mb-3">
        <input 
          v-model="text" 
          class="form-control form-control-lg" 
          type="text" 
          placeholder="Digite um texto ou link"
        />
      </div>

      <button 
        @click="generateQRCode" 
        class="btn btn-primary btn-lg w-100"
      >
        Gerar QR Code
      </button>

      <div v-if="qrCode" class="mt-4 text-center">
        <h2 class="h4">Seu QR Code:</h2>
        <img :src="qrCode" :alt="'QR Code'" class="img-fluid" />
      </div>
    </div>
  </div>
  
  <footer class="footer bg-dark text-white text-center py-3 fixed-bottom">
    <p class="mb-0">
      Desenvolvido por 
      <a href="https://github.com/Lucas19Alves" class="text-white text-decoration-underline">Lucas Alves</a> | 
      <a href="https://portifolio-2-0.vercel.app/" class="text-white text-decoration-underline">Conheça outros projetos</a>
    </p>
  </footer>
</template>

<style>
.vh-100 {
  height: 100vh;
}

.footer {
  background-color: #212529;
}

.footer a:hover {
  opacity: 0.8;
}
</style>