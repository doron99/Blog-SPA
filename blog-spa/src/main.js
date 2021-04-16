import { createApp } from 'vue'
import App from './App.vue'

import Toaster from '@meforma/vue-toaster';
import CKEditor from '@ckeditor/ckeditor5-vue';



//axios
import axios from 'axios';
axios.defaults.baseURL = `${process.env.VUE_APP_ROOT_URL}/api/`
axios.defaults.headers.post["Content-Type"] = "application/json";



const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})
axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)


//i18n
import { createI18n } from 'vue-i18n'
import en from './translations/en.json';
import he from './translations/he.json';
const messages = {
    he: he,
    en: en,
  }
const i18n = createI18n({
  locale: 'he',
  messages,
  fallbackWarn: false,
  missingWarn: false,
  disableNoTranslationWarning :true
});

import 'bootstrap-v4-rtl'
import 'bootstrap-v4-rtl/dist/css/bootstrap.min.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import router from './routes'
import store from './store'
const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(CKEditor);
app.use(Toaster);
app.use(router);
app.mount('#app')
