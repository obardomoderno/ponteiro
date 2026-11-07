// O app saiu da raiz e agora mora em semana/. Este service worker só se desinstala e limpa o cache antigo.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith("ponteiro-") || k.startsWith("tempo-")).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister()),
  );
});
