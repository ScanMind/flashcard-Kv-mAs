// Service worker: guarda la app completa para usarla sin internet.
// Cuando cambies cualquier archivo, sube el número de CACHE_VERSION para que los teléfonos descarguen la versión nueva.
const CACHE_VERSION = "v2";
const CACHE = "kv-mas-" + CACHE_VERSION;
const ASSETS = ["./", "index.html", "styles.css", "app.js", "data.js", "images.js", "manifest.webmanifest", "apple-touch-icon.png", "favicon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).catch(() => caches.match("index.html"))));
});
