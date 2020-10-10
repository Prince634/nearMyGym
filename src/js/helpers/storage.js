const STORAGE = {
	registerServiceWorker: (dataParams={})=>{
        if('serviceWorker' in navigator) {
            window.addEventListener('load', ()=>{
                navigator.serviceWorker.register('/sw.js').then(function (registration){
                    console.log('Service Worker registration Success', registration.scope)
                }, function(err){
                    //registration Failed
                    console.log('Service Worker registration Failed', err)
                })
            })
        }
    },
    unregisterServiceWorker(){
        if('serviceWorker' in navigator) {
            try{
                navigator.serviceWorker.getRegistrations().
                then((registers)=>{
                    for( let i = 0; i < registers.length; i++ ) {
                        registers[i].unregister();
                    }
                })
            
            }catch(e){

            }
        }
    }
}
export default STORAGE