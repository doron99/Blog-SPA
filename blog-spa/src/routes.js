

import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import Home from './components/General/Home.vue'
import PostsList from './components/Posts/PostsList.vue'
import Post from './components/Posts/Post.vue'
import CreatePost from './components/Posts/CreatePost.vue'
import PostsTable from './components/Posts/PostsTable.vue'

import store from './store'
import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
    {path: '/login',component: Login,meta:{requireUnauth:true}},
    {path: '/register',component: Register,meta:{requireUnauth:true}},
    {path: '/posts/:id',component: Post},
    {path: '/posts',component: PostsList},
    {path: '/create-post/:id',component: CreatePost,meta:{requireAuth:true}},
    {path: '/create-post',component: CreatePost,meta:{requireAuth:true}},
    {path: '/posts-manage',component: PostsTable,meta:{requireAuth:true}},

    {path: '',component: Home},
    {path: "/:catchAll(.*)",component: Home},
   
]});


  router.beforeEach(function(to, from,next){
    if(to.meta.requireAuth && !store.getters.isLoggedIn){
      next('/login');
    }else if(to.meta.requireUnauth && store.getters.isLoggedIn){
      next('/');
    }else{
      next();
    }
  });

export default router;