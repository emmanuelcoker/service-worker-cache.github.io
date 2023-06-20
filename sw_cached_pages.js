const cacheName = "v1";

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js',
];

//call the install event
self.addEventListener('install', (event) => {
    console.log('Service worker: installed');

    //wait until files are cached
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files...');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting()) //end waitUntil event
    );
})


//call the activate event
self.addEventListener('activate', (event) => {
    console.log('Service worker: activated');

    //get rid of unwanted caches here
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map( cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old cache...');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

//showing cache files when offline
//fetch event
self.addEventListener('fetch', (event) =>  {
    console.log('Service Worker: fetching');
    event.respondWith(
        fetch(event.request).catch(() => {
            //if network is offline, fetch from cach
            caches.match(event.request)
        })
    )

})
