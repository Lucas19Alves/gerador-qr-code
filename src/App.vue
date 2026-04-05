<script setup>
import QRCodeGenerator from "./components/QRCodeGenerator.vue";
import AppFooter from "./components/AppFooter.vue";
import "./assets/styles.css";
</script>

<template>
  <main class="container py-5 min-vh-100 d-flex flex-column justify-content-center">
    <QRCodeGenerator />
    <AppFooter />
  </main>
</template>

<style>
/* Estilos globais adicionais se necessário */
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
