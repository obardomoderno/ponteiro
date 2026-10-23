// Service worker do Ponteiro: guarda o app no aparelho para abrir sem internet.
// Funciona em qualquer subpasta (ex.: usuario.github.io/ponteiro/). A sincronização com o GitHub nunca passa pelo cache.
const VERSION = "ponteiro-v11";
const HOME = new URL("./", self.location).href;
const SHELL = ["./", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req.url, { cache: "no-store", credentials: "same-origin" })   // sempre a versão publicada, sem o cache do navegador
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(HOME, copy)); return res; })
        .catch(() => caches.match(HOME)),
    );
    return;
  }

  if (url.searchParams.has("u")) return;   // verificação de versão nova: nunca do cache
  const cacheable = url.origin === self.location.origin || url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!cacheable) return;
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => { if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })
        .catch(() => hit);
      return hit || net;
    }),
  );
});
