<script setup>
import QRCodeGenerator from "./components/QRCodeGenerator.vue";
import AppFooter from "./components/AppFooter.vue";
import "./assets/styles.css";
</script>

<template>
  <main class="page">
    <QRCodeGenerator />
  </main>
  <AppFooter />
</template>

<style>
.page {
  min-height: calc(100vh - 88px);
  display: grid;
  place-items: center;
  padding: clamp(24px, 5vw, 64px) clamp(16px, 4vw, 40px);
}
</style>
