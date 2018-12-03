const cacheVersion = 'v4';

//Install the event
self.addEventListener('install', e => {
	console.log(`Service Worker: installed`);
});

//Activate the event
self.addEventListener('activate', e => {
	console.log(`Service Worker: activated`);
	//delete old caches
	e.waitUntil(
		caches.keys().then(cacheVersions => {
			return Promise.all(
				cacheVersions.map(cache => {
					if(cache !== cacheVersion) {
						console.log(`Service Worker: Clearing old cache`);
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

//The fetch event
self.addEventListener('fetch', e => {
	e.respondWith(
		fetch(e.request).then(res => {
				const resClone = res.clone();
				caches.open(cacheVersion).then(cache => {
						cache.put(e.request, resClone);
					});
				return res;
		}).catch(err => caches.match(e.request).then(res => res))
	);
});

/*
* Resources used: 
* https://www.youtube.com/watch?v=ksXwaWHCW6k&t=7s
*/