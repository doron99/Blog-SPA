<template>
<div style="direction:rtl;">
      <loading v-if="isLoading"></loading>

    <nav-bar></nav-bar>
    <main class="container">
      <div class="row">
        
          <right-aside v-if="showAside"></right-aside>
        
          <router-view></router-view>
        

      </div>
      
      
    </main>
    <the-footer></the-footer>
    
    
</div>
 
</template>

<script>

import NavBar from './components/General/NavBar.vue'
import TheFooter from './components/General/TheFooter.vue'
import RightAside from './components/General/RightAside.vue'
import loading from './components/General/loading.vue'
import store from './store'
export default {
  
  name: 'App',
  components: {
    NavBar,
    TheFooter,
    RightAside,
    loading
  },
  computed: {
      showAside() {
        let path = this.$route.path;
        if(path == "/posts" || path.indexOf("/posts/") !== -1) {
          return true
        } else {
          return false
        }
      },
      isLoading(){
        return store.getters.isLoading;
      }
    },
    created(){
      store.commit('tryLogin')

    },
    mounted(){
      //console.log('process.env.NODE_ENV:' +process.env.NODE_ENV)
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
