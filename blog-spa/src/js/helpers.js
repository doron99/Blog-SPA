
export default {
    methods:{
        isLoggedIn(){
            let token = localStorage.getItem('token');
            let payload = getPayload(token);
    
            if(token != null && payload != null){
                if(!isExpired(payload))
                    return true;
            }
            return false;
    
        },
        functionName: (data) => {
           return something  
         },
         findObjectByLabel(obj, utypeId) {
            if(obj.utypeId === utypeId) { 
                obj.expended = true; 
            }else{
                obj.expended = false
            }
            for(var i in obj) {
                if(obj.hasOwnProperty(i)){
                    var foundLabel = findObjectByLabel(obj[i], utypeId);
                    if(foundLabel) { return foundLabel; }
                }
            }
            return null;
        },
        isExpired(token){
            var payload = this.getPayload(token);
            if (payload == null)
                return true;
            var current_time = Date.now() / 1000;
            if ( payload.exp < current_time) 
                return true 
            
            return false
        },
        getUniqueName(token){
            var payload = this.getPayload(token);
            if(payload == null)
                return null;
    
            return payload.unique_name;
        },
        getPayload(token){
            let res = null;
            try{
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                let payload = JSON.parse(jsonPayload);
                res = payload;
            }catch(e){
                console.log('error jwt:',e);
            }
            return res
        },
        retDateFormatted(date){
            var date = new Date(value);
            var year = date.getFullYear();
            var rawMonth = parseInt(date.getMonth()) + 1;
            var month = rawMonth < 10 ? '0' + rawMonth : rawmonth;
            var rawDay = parseInt(date.getDate());
            var day = rawDay < 10 ? '0' + rawDay : rawDay; 
            return year + '-' + month + '-' + day
        }
    }
    
 }