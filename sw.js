const CACHE='artist-training-clean-20260908-v1';
const STATIC=[
  './manifest.webmanifest',
  './progress-addon.css',
  './progress-addon.js',
  './apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  ]));
});
self.addEventListener('fetch',event=>{
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
