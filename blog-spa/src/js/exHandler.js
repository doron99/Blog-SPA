


var exHandler = {
    functionName: (data) => {
       return data  
     },
     handle(error) {
        let message = {
            html: 'Network Error.',
            icon: 'fa-warning',
            timeout: 2500,
         }
         if(error.hasOwnProperty('response') && error.response.hasOwnProperty('data')){
            if(error.response.data.length > 0){
               message.html = error.response.data;
               return message;
            }
         }
        switch (error.response.status) {
            case 400:
                message.html = "not found"
                console.log('400 error');  // not getting here
                break;
            case 401:
                message.html = "unauthorized"
                console.log('401 error');  // or here
                break;
            default:
                message.html = "error"
                console.log('some other error');  // end up here all the time
                break;
        }

        return message;
    },
   
 }
 export default exHandler