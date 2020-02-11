const STORAGE = {
	registerServiceWorker: (dataParams={})=>{
        if('serviceWorker' in navigator) {
            window.addEventListener('load', ()=>{
                navigator.serviceWorker.register('/enableGymNetworkRequest.js').then(function (registration){
                    console.log('Service Worker registration Success', registration.scope)
                }, function(err){
                    //registration Failed
                    console.log('Service Worker registration Failed', err)
                })
            })
        }
    }
}
export default STORAGE