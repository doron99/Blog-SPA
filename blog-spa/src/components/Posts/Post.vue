<template>
    <div if="post" class="container col-lg-8 text-right" style="direction:rtl;">

        <!-- Title -->
        <h1 v-if="post" class="mt-4">{{post?.title}} 
            <router-link 
                v-if="post && isLoggedIn" 
                class="btn btn-primary" 
                :to="'/create-post/'+post.postId">עריכה</router-link>
        </h1>

        <!-- Author -->
        <p class="lead">
          by
          <a href="#" v-if="post">{{post?.author?.ufname +' '+ post?.author?.ulname}}</a>
        </p>

        <hr>

        <!-- Date/Time -->
        <p v-if="post">פורסם ב: {{dateFormat(post.created)}}</p>

        <hr>

        <!-- Preview Image  http://placehold.it/900x300-->
        <img class="img-fluid rounded"  :src="img || getPlaceHolder" alt="">

        <hr>

        <!-- Post Content -->
         <p v-if="post" class="lead" v-html="post?.content">
            </p>  

       
        <hr>

        <!-- Comments Form -->
        
        <comments-list :postId="postId"  v-if="post"></comments-list>
       
     

      </div>
   
</template>

<script>
import _service from '../../_services/_service'
import {dateFormat} from '../../js/helper2.js'
import CommentsList from '../Comments/CommentsList.vue'
import store from '../../store'
    import {useI18n} from 'vue-i18n'

export default{
     setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        components:{
            CommentsList
        },
        data(){
            return{
                postId:'',
                post:null,
                img:null
            }
        },
        created(){
            this.getData();
        },
        computed:{
            isLoggedIn(){
                return store.getters.isLoggedIn;
            },
            getPlaceHolder(){
                return process.env.VUE_APP_DEFAULT_IMG;
            }
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
            
        },
         methods:{
              async getData(){

                this.postId = this.$route.params.id;
                let self = this;
                _service.getPost(this.postId)
                .then(res => {
                    self.post = res.data;
                    if(this.post.coverImagePath)
                        self.img = process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
                    
                }).catch(() =>{
                    this.$toast.error('could not load this post');
                })
            },
            printID(){
                console.log('route', this.$route.params.id);
            },
            dateFormat(value){
                 let x = dateFormat(value);
                 return x
             }
            
        }
    }
    
</script>