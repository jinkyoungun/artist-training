const CACHE='artist-training-v2-7';
const ASSETS=['./','./index.html','./install.html','./manifest.webmanifest','./manifest-v6.webmanifest','./progress-addon.css','./progress-addon.js','./apple-touch-icon.png','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/artist-training-touch-v6.png','./icons/artist-training-192-v6.png','./icons/artist-training-512-v6.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
