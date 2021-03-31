<template>


 <nav class="navbar navbar-expand-md navbar-dark bg-primary text-center">
    <router-link class="navbar-brand abs" to="/" active-class="active" exact>Blog</router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span class="navbar-toggler-icon" @click="toggleNavbar()"></span>
    </button>
    <div class="navbar-collapse collapse " style="z-index: 1;" id="collapsingNavbar">
        <ul class="navbar-nav "
            v-bind:class="[showCenterClass ? 'abs-center-x' : '']">
             <li class="nav-item ">
                <router-link class="nav-link" to="/" active-class="active"  exact>{{t('home')}}</router-link>
            </li>
        
            <li class="nav-item">
                <router-link class="nav-link" to="/posts" active-class="active">{{t('posts')}}</router-link>

            </li>
            <li v-show="isLoggedIn" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{getEmail}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/create-post" active-class="active">create post</router-link>
                <router-link class="dropdown-item" to="/posts-manage" >manage posts</router-link>

              </div>
            </li>

        </ul>
        <ul class="navbar-nav mr-auto">
            <li v-show="!isLoggedIn" class="nav-item">
                <router-link class="nav-link" to="/login" active-class="active">{{$t('login')}}</router-link>
            </li>
            <li v-show="!isLoggedIn" class="nav-item">
                 <router-link class="nav-link" to="/register" active-class="active">{{$t('register')}}</router-link>
            </li>
            <li v-show="isLoggedIn" class="nav-item">
                 <button class="nav-link logout-btn" @click="logout()" >{{$t('logout')}}</button>
            </li>
         
        </ul>
    </div>
</nav>


</template>

<script>
import store from '../../store'
import {useI18n} from 'vue-i18n'
    export default{
        setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        data(){
            return {
              showCenterClass:true
            }
        },
        mounted(){
              //console.log(this.$helpers.isLoggedIn());
        },
        computed:{
          isLoggedIn(){
            return store.getters.isLoggedIn;
          },getEmail(){
            return store.getters.getEmail;
          }
        },
        methods: {
          toggleNavbar() {
            this.showCenterClass = !this.showCenterClass;
          },
          logout(){
            store.commit('logout');
            this.$router.replace("/");
          }
        }
        
    }

</script>
<style scoped>
@media screen and (min-width: 500px) {
  .abs-center-x {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
}
.logout-btn{
      background: none;
    border: none;
}



</style>