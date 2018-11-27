//Install the event

self.addEventListener('install', e => {
	console.log('Service Worker: installed');
});

//Activate the event
self.addEventListener('activate', e => {
	console.log('Service Worker: activated');
});
