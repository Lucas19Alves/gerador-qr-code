<template>
  <footer class="footer">
    <span>Feito por <a href="https://github.com/Lucas19Alves" target="_blank" rel="noopener noreferrer">Lucas Alves</a></span>
    <a href="https://portfolio-lucasalves.vercel.app/" target="_blank" rel="noopener noreferrer">Ver outros projetos no portfólio</a>
  </footer>
</template>

<style scoped>
.footer {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px;
  width: min(1040px, 100%); margin: 0 auto; padding: 24px clamp(16px, 4vw, 40px) 32px;
  font-size: 0.9rem; color: var(--muted); border-top: 1.5px solid var(--line);
}
a { color: var(--ink); font-weight: 600; text-decoration-thickness: 2px; text-decoration-color: var(--signal); text-underline-offset: 3px; }
</style>
