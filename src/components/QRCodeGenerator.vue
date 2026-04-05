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
  <div class="row justify-content-center w-100 m-0">
    <div class="col-12 col-sm-10 col-md-8 col-lg-4">
      <div class="card border-0 shadow-lg bg-dark text-white rounded-4 overflow-hidden card-compact">
        <div class="card-body p-3 p-md-4">
          <h2 class="h4 card-title text-center mb-3 fw-bold">Gerador de QR Code</h2>
          
          <div class="mb-3">
            <label class="form-label small text-uppercase fw-semibold opacity-75 mb-1">Texto ou URL</label>
            <input 
              v-model="text" 
              class="form-control form-control-sm bg-secondary text-white border-0 shadow-none py-2" 
              type="text" 
              placeholder="Ex: https://github.com"
              @keyup.enter="generateQRCode"
            />
          </div>

          <div class="mb-3">
            <label class="form-label small text-uppercase fw-semibold opacity-75 mb-1">Cor do QR Code</label>
            <div class="d-flex align-items-center gap-2">
              <input 
                v-model="color" 
                type="color" 
                class="form-control form-control-color bg-transparent border-0 p-0 color-picker-sm" 
                title="Escolha a cor do QR Code"
              />
              <span class="text-monospace x-small opacity-75">{{ color }}</span>
            </div>
          </div>

          <button 
            @click="generateQRCode" 
            class="btn btn-primary btn-sm w-100 fw-bold py-2 transition-all"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Gerando...' : 'Gerar QR Code' }}
          </button>

          <transition name="fade">
            <div v-if="qrCode" class="mt-3 text-center result-area">
              <div class="qr-preview-container bg-white p-2 rounded-3 d-inline-block shadow-sm mb-2">
                <img :src="qrCode" :alt="'QR Code'" class="img-fluid qr-image-sm" />
              </div>
              
              <div class="d-grid">
                <button @click="downloadQRCode" class="btn btn-outline-light btn-sm border-2 py-2">
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
.card-compact {
  max-width: 360px;
  margin: 0 auto;
}

.color-picker-sm {
  width: 35px;
  height: 35px;
}

.qr-image-sm {
  max-width: 140px; /* Tamanho reduzido do QR Code */
  height: auto;
}

.x-small {
  font-size: 0.75rem;
}

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
