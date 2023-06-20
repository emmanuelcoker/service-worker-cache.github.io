const cacheName = "v2";

//call the install event
self.addEventListener('install', (event) => {
    console.log('Service worker: installed');

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
        fetch(event.request)
        .then((res) => {
            //make a clone of the response
            const resClone = res.clone();

            //open cache
            caches.open(cacheName)
                .then((cache) => {
                    //add response to the cache
                    cache.put(event.request, resClone);
                });

            return res;
        })
        .catch((err) => {
            //if network is offline, fetch from cach
            console.log(`Service Worker Error: ${err}`)
            caches.match(event.request).then(res => res)
        })
    )

})
