
import { createStore } from 'vuex'



const store = createStore({

    state() {
       return {
          token: '',
          expiration: Date.now(),
          email:'',
          uid:'',
          isLoading:false,
          
       }
    },
    mutations: {
        setToken(state,payload){
            localStorage.setItem('token',payload.token);
            localStorage.setItem('expiration',payload.expiration);
            localStorage.setItem('email',payload.uemail);
            localStorage.setItem('uid',payload.uid);

            state.token = payload.token;
            state.uid = payload.uid;
            state.expiration = new Date(payload.expiration);
            state.email = payload.uemail;

            console.log('state.expiration.getTime()',state.expiration.getTime());

        },
        tryLogin(state){
            const token = localStorage.getItem('token');
            const expiration = localStorage.getItem('expiration');
            const email = localStorage.getItem('email');
            const uid = localStorage.getItem('uid');

            if(token && (new Date(expiration) > Date.now())){
                state.token = token;
                state.expiration = expiration;
                state.email = email;
                state.uid = uid;
            }else{
                state.token = '';
                state.expiration = new Date();
                state.email = ''
                state.uid = '';

                localStorage.removeItem('uid');
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
                localStorage.removeItem('email');
            }
            
        },
        logout(state) {
            state.token = '';
            state.expiration = new Date();
            state.email = ''
            state.uid = '';

            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('uid');
            localStorage.removeItem('email');

        },
        setLoading(state,payload){
            state.isLoading = payload;
        }

    },
    getters:{
        isLoggedIn(state){
            return state.token  && (new Date(state.expiration) > Date.now());
        },
        getEmail(state){
            return state.email;
        },
        isLoading(state){
            return state.isLoading;
        },
        getToken(state){
            return state.token;
        },
        uid(state){
            return state.uid;
        }
    }
    
    
 })
 
 export default store;
