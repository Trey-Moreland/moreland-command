// Moreland Command service worker: app shell cache-first, status.json network-first (offline falls back to last copy)
const C='mc-20261022b',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png','fonts/orbitron-400.ttf','fonts/orbitron-700.ttf','fonts/sharetechmono.ttf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(u.pathname.endsWith('.enc')){const k=u.pathname.split('/').pop();e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(k,cp));}return r;}).catch(()=>caches.match(k)));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
