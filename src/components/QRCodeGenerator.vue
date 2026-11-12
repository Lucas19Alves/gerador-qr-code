<script setup>
import { computed, reactive, ref, watch } from "vue";
import QRCode from "qrcode";
import { buildPayload, contrast } from "../payload";

const types = [
  { id: "link", label: "Link", icon: "bi-link-45deg" },
  { id: "text", label: "Texto", icon: "bi-fonts" },
  { id: "whatsapp", label: "WhatsApp", icon: "bi-whatsapp" },
  { id: "wifi", label: "Wi-Fi", icon: "bi-wifi" },
  { id: "email", label: "E-mail", icon: "bi-envelope" },
];
const swatches = ["#17213a", "#000000", "#1f6f5c", "#7a2e8e", "#c2410c"];

const type = ref("link");
const f = reactive({ url: "", text: "", phone: "", message: "", ssid: "", password: "", security: "WPA", hidden: false, email: "", subject: "", body: "" });
const dark = ref("#17213a");
const light = ref("#ffffff");
const level = ref("M");

const svg = ref("");
const error = ref("");
const copied = ref(false);

const payload = computed(() => buildPayload(type.value, f));
const ratio = computed(() => contrast(dark.value, light.value));
const opts = computed(() => ({ errorCorrectionLevel: level.value, margin: 2, color: { dark: dark.value, light: light.value } }));

watch([payload, opts], async () => {
  error.value = "";
  if (!payload.value) return (svg.value = "");
  try {
    svg.value = await QRCode.toString(payload.value, { ...opts.value, type: "svg" });
  } catch {
    svg.value = "";
    error.value = "Conteúdo grande demais para um QR Code. Encurte o texto ou reduza a resistência a danos.";
  }
}, { immediate: true });

const fileName = () => `qrcode-${type.value}-${Date.now()}`;

function save(href, ext) {
  const a = document.createElement("a");
  a.href = href;
  a.download = `${fileName()}.${ext}`;
  a.click();
}

async function downloadPng() {
  save(await QRCode.toDataURL(payload.value, { ...opts.value, width: 1024 }), "png");
}

function downloadSvg() {
  const url = URL.createObjectURL(new Blob([svg.value], { type: "image/svg+xml" }));
  save(url, "svg");
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyImage() {
  try {
    const blob = await (await fetch(await QRCode.toDataURL(payload.value, { ...opts.value, width: 1024 }))).blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    error.value = "Este navegador não permite copiar imagens. Use Baixar PNG.";
  }
}
</script>

<template>
  <div class="app">
    <header class="head">
      <h1>Gerador de QR Code</h1>
      <p class="lead">Escolha o tipo, preencha e o código aparece na hora. Nada sai do seu navegador.</p>
    </header>

    <section class="panel" aria-label="Conteúdo do QR Code">

      <div class="types" role="tablist" aria-label="Tipo de conteúdo">
        <button v-for="t in types" :key="t.id" role="tab" :aria-selected="type === t.id" :class="{ on: type === t.id }" @click="type = t.id">
          <i :class="['bi', t.icon]" aria-hidden="true"></i>{{ t.label }}
        </button>
      </div>

      <div class="fields">
        <template v-if="type === 'link'">
          <label>Endereço<input v-model="f.url" type="url" inputmode="url" placeholder="seusite.com.br" autofocus /></label>
        </template>
        <template v-else-if="type === 'text'">
          <label>Texto<textarea v-model="f.text" rows="4" placeholder="Qualquer mensagem"></textarea></label>
        </template>
        <template v-else-if="type === 'whatsapp'">
          <label>Número com DDD<input v-model="f.phone" type="tel" inputmode="tel" placeholder="(11) 91234-5678" /></label>
          <label>Mensagem inicial (opcional)<textarea v-model="f.message" rows="3" placeholder="Olá! Vi seu QR Code e…"></textarea></label>
        </template>
        <template v-else-if="type === 'wifi'">
          <label>Nome da rede<input v-model="f.ssid" placeholder="MinhaCasa" /></label>
          <div class="row">
            <label>Senha<input v-model="f.password" type="text" autocomplete="off" placeholder="Deixe vazio se for aberta" /></label>
            <label class="narrow">Segurança
              <select v-model="f.security" :disabled="!f.password"><option>WPA</option><option>WEP</option></select>
            </label>
          </div>
          <label class="check"><input v-model="f.hidden" type="checkbox" /> Rede oculta</label>
        </template>
        <template v-else>
          <label>Para<input v-model="f.email" type="email" placeholder="contato@empresa.com" /></label>
          <label>Assunto (opcional)<input v-model="f.subject" /></label>
          <label>Mensagem (opcional)<textarea v-model="f.body" rows="3"></textarea></label>
        </template>
      </div>

      <fieldset class="style">
        <legend>Aparência</legend>
        <div class="colors">
          <span class="lbl">Cor</span>
          <button v-for="c in swatches" :key="c" class="sw" :style="{ background: c }" :aria-label="`Usar cor ${c}`" :aria-pressed="dark === c" @click="dark = c"></button>
          <label class="picker" title="Cor personalizada"><input v-model="dark" type="color" aria-label="Cor do código" /></label>
          <span class="lbl gap">Fundo</span>
          <label class="picker" title="Cor do fundo"><input v-model="light" type="color" aria-label="Cor do fundo" /></label>
        </div>
        <label class="inline">Resistência a danos
          <select v-model="level">
            <option value="L">Baixa (código menor)</option>
            <option value="M">Média</option>
            <option value="Q">Alta</option>
            <option value="H">Máxima (para impressão)</option>
          </select>
        </label>
        <p v-if="ratio < 3" class="warn" role="status">Pouco contraste entre código e fundo. Muitos celulares não vão conseguir ler.</p>
      </fieldset>
    </section>

    <section class="preview" aria-live="polite">
      <div class="label" :class="{ empty: !svg }">
        <div v-if="svg" class="qr" :style="{ background: light }" v-html="svg" role="img" :aria-label="`QR Code para ${payload}`"></div>
        <div v-else class="placeholder">
          <i class="bi bi-qr-code" aria-hidden="true"></i>
          <span>{{ error || 'Preencha ao lado para ver seu QR Code.' }}</span>
        </div>
        <p v-if="svg" class="payload" :title="payload">{{ payload }}</p>
      </div>

      <div class="actions">
        <button class="primary" :disabled="!svg" @click="downloadPng"><i class="bi bi-download" aria-hidden="true"></i>Baixar PNG</button>
        <button :disabled="!svg" @click="downloadSvg">Baixar SVG</button>
        <button :disabled="!svg" @click="copyImage">{{ copied ? 'Copiado' : 'Copiar imagem' }}</button>
      </div>
      <p v-if="svg && error" class="warn">{{ error }}</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
  gap: clamp(24px, 4vw, 56px);
  width: min(1040px, 100%);
  align-items: start;
}

h1 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.02; letter-spacing: -0.03em; margin: 0 0 12px; font-weight: 800; }
.head { grid-column: 1 / -1; }
.lead { color: var(--muted); margin: 0; max-width: 46ch; }

.types { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.types button {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 14px; border-radius: 999px; border: 1.5px solid var(--line);
  background: var(--card); color: var(--ink); font: inherit; font-weight: 600; cursor: pointer;
}
.types button.on { background: var(--ink); border-color: var(--ink); color: var(--paper); }

.fields { display: grid; gap: 14px; margin-bottom: 24px; }
.row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
label { display: grid; gap: 6px; font-weight: 600; font-size: 0.92rem; }
input:not([type="color"]):not([type="checkbox"]), textarea, select {
  font: inherit; font-weight: 400; color: var(--ink);
  background: var(--card); border: 1.5px solid var(--line); border-radius: 10px; padding: 11px 13px; width: 100%;
}
textarea { resize: vertical; }
input:focus, textarea:focus, select:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px var(--signal); }
.check { display: flex; align-items: center; gap: 8px; font-weight: 500; }
.check input { width: 18px; height: 18px; accent-color: var(--ink); }

.style { border: 0; border-top: 1.5px solid var(--line); padding: 18px 0 0; margin: 0; display: grid; gap: 14px; }
legend { font-weight: 700; padding: 0; float: left; width: 100%; margin-bottom: 4px; }
.colors { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.lbl { font-size: 0.92rem; font-weight: 600; margin-right: 4px; }
.lbl.gap { margin-left: 14px; }
.sw { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--card); box-shadow: 0 0 0 1.5px var(--line); cursor: pointer; }
.sw[aria-pressed="true"] { box-shadow: 0 0 0 2.5px var(--ink); }
.picker { display: inline-block; width: 30px; height: 30px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 1.5px var(--line); }
.picker input { width: 48px; height: 48px; margin: -9px; border: 0; padding: 0; cursor: pointer; }
.inline { grid-template-columns: auto 1fr; align-items: center; gap: 12px; max-width: 440px; }
.warn { margin: 0; color: #9a3412; background: #fff1e6; border-radius: 8px; padding: 10px 12px; font-size: 0.9rem; }

.preview { position: sticky; top: 24px; display: grid; gap: 14px; }
.label {
  background: var(--card); border-radius: 20px; padding: 22px;
  border: 1.5px solid var(--line);
}
.qr { border-radius: 10px; overflow: hidden; line-height: 0; }
.qr :deep(svg) { width: 100%; height: auto; display: block; }
.placeholder {
  aspect-ratio: 1; display: grid; place-content: center; justify-items: center; gap: 12px; text-align: center;
  border: 2px dashed var(--line); border-radius: 10px; color: var(--muted); padding: 24px;
}
.placeholder i { font-size: 3.5rem; opacity: 0.5; }
.payload { margin: 14px 2px 0; font-size: 0.85rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.actions button {
  font: inherit; font-weight: 700; padding: 12px; border-radius: 12px; cursor: pointer;
  border: 1.5px solid var(--ink); background: transparent; color: var(--ink);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.actions .primary { grid-column: 1 / -1; background: var(--signal); border-color: var(--signal); }
.actions button:disabled { opacity: 0.4; cursor: not-allowed; }
.actions button:focus-visible, .types button:focus-visible, .sw:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }

@media (max-width: 820px) {
  .app { grid-template-columns: 1fr; }
  .preview { position: static; order: 1; max-width: 420px; width: 100%; justify-self: center; }
  .panel { order: 2; }
}
</style>
