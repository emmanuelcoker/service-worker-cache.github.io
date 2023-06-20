//registering the service worker
//make sure service workers are supported

if('serviceWorker' in navigator) {
    // console.log('Service worker Supported!');
    window.addEventListener('load', ()=> {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })

}
