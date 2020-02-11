var CACHE_NAME='Interface'
var CACHE_DATA = [
	'/'
]
self.addEventListener('install', function(event){
	//Install Steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache){
				return cache.addAll(CACHE_DATA)
			})
		);
})

self.addEventListener('fetch', function(event){
	event.responseWith(
		caches.match(event.request)
			.then(function(request){
				if(response){
					return response
				}
				return fetch(event.request)
			})
	)
})