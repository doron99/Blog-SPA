
import { createStore } from 'vuex'



const store = createStore({

    state() {
       return {
          token: '',
          expiration: Date.now(),
          email:'',
          isLoading:false
       }
    },
    mutations: {
        setToken(state,payload){
            localStorage.setItem('token',payload.token);
            localStorage.setItem('expiration',payload.expiration);
            localStorage.setItem('email',payload.uemail);

            state.token = payload.token;
            state.expiration = new Date(payload.expiration);
            state.email = payload.uemail;

            console.log('state.expiration.getTime()',state.expiration.getTime());

        },
        tryLogin(state){
            const token = localStorage.getItem('token');
            const expiration = localStorage.getItem('expiration');
            const email = localStorage.getItem('email');

            if(token && (new Date(expiration) > Date.now())){
                state.token = token;
                state.expiration = expiration;
                state.email = email;
                console.log('login successfully')
            }else{
                state.token = '';
                state.expiration = new Date();
                state.email = ''
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
                localStorage.removeItem('email');
                console.log('login fail and logout')

            }
            
        },
        logout(state) {
            state.token = '';
            state.expiration = new Date();
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
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
        }
    }
    
    
 })
 
 export default store;
