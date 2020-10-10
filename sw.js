self.addEventListener('install', function(event){
	console.log('Service Worker Installed.....');
	event.waitUntil(
		caches.open('static').then((cache)=>{
			console.log('Precache APplication assets.....')
			cache.addAll(['/0.bundle.js', '/1.bundle.js', '/2.bundle.js', '/3.bundle.js', '/4.bundle.js', '/5.bundle.js', '/6.bundle.js', '/7.bundle.js', '/8.bundle.js', '/main.bundle.js', '/vendor~main.bundle.js', '/style.bundle.css'])
		})
		)
})

self.addEventListener('activate', function(event){
	console.log('Service Worker activated.....')
})

self.addEventListener('fetch', function(event){
	console.log('Service Worker url.....', event.request);
	event.respondWith(
		caches.match(event.request).then((resp)=>{
			if(resp){
				return resp;
			}else{
				return fetch(event.request);
			}
		}).catch((e)=>{
			return {}
		})
		)
})