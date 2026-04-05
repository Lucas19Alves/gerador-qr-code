<script setup>
import { ref } from "vue";
import { qrService } from "../services/qrService";

const text = ref("");
const color = ref("#000000");
const qrCode = ref("");
const loading = ref(false);

const generateQRCode = async () => {
  if (!text.value.trim()) {
    alert("Por favor, digite um texto ou link para gerar o QR Code.");
    return;
  }

  loading.value = true;
  try {
    qrCode.value = await qrService.generate(text.value, color.value);
  } catch (error) {
    alert("Erro ao gerar QR Code. Tente novamente.");
  } finally {
    loading.value = false;
  }
};

const downloadQRCode = () => {
  qrService.download(qrCode.value);
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="card border-0 shadow-lg bg-dark text-white rounded-4 overflow-hidden">
        <div class="card-body p-4 p-md-5">
          <h1 class="card-title text-center mb-4 fw-bold">Gerador de QR Code</h1>
          
          <div class="mb-4">
            <label class="form-label small text-uppercase fw-semibold opacity-75">Texto ou URL</label>
            <input 
              v-model="text" 
              class="form-control form-control-lg bg-secondary text-white border-0 shadow-none" 
              type="text" 
              placeholder="Ex: https://github.com"
              @keyup.enter="generateQRCode"
            />
          </div>

          <div class="mb-4">
            <label class="form-label small text-uppercase fw-semibold opacity-75">Cor do QR Code</label>
            <div class="d-flex align-items-center gap-3">
              <input 
                v-model="color" 
                type="color" 
                class="form-control form-control-color bg-transparent border-0 p-0" 
                style="width: 50px; height: 50px;"
                title="Escolha a cor do QR Code"
              />
              <span class="text-monospace small">{{ color }}</span>
            </div>
          </div>

          <button 
            @click="generateQRCode" 
            class="btn btn-primary btn-lg w-100 fw-bold py-3 transition-all"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Gerando...' : 'Gerar QR Code' }}
          </button>

          <transition name="fade">
            <div v-if="qrCode" class="mt-5 text-center result-area">
              <div class="qr-preview-container bg-white p-4 rounded-3 d-inline-block shadow-sm mb-4">
                <img :src="qrCode" :alt="'QR Code'" class="img-fluid" style="min-width: 200px;" />
              </div>
              
              <div class="d-grid gap-2">
                <button @click="downloadQRCode" class="btn btn-outline-light btn-lg border-2">
                  <i class="bi bi-download me-2"></i> Baixar Imagem
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

.transition-all:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.qr-preview-container {
  transition: transform 0.3s ease;
}

.qr-preview-container:hover {
  transform: scale(1.02);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.form-control-color::-webkit-color-swatch {
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.1);
}

.text-monospace {
  font-family: 'Courier New', Courier, monospace;
}
</style>
