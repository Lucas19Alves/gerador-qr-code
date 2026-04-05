<script setup>
import QRCodeGenerator from "./components/QRCodeGenerator.vue";
import AppFooter from "./components/AppFooter.vue";
import "./assets/styles.css";
</script>

<template>
  <main class="container-fluid h-100 d-flex flex-column justify-content-center align-items-center py-2">
    <div class="w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <QRCodeGenerator />
    </div>
    <AppFooter />
  </main>
</template>

<style>
/* Estilos globais adicionais se necessário */
.h-100 {
  height: 100vh !important;
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
</style>
