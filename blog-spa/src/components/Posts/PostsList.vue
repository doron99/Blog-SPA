<template>

<div class="container col-md-8 ">
      <!--Section: Content-->
      <section class="text-center mt-4">
        <!-- <h4 class="mb-5"><strong>Latest posts</strong></h4> -->

        <div class="row">
          <div v-for="(post) in posts" :key="post.postId"  class="col-lg-6 col-md-12 mb-4">
            <div class="card">
              <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img :src="post.coverImagePath 
                ? getImg(post.coverImagePath): 
                require('@/assets/placeholder.jpg')" class="img-fluid" style="height:235px" />
                <a href="#!">
                  <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{post.title}}</h5>
                <p class="card-text">
                  {{post.excerpt}}
                </p>
                <router-link class="btn btn-primary" :to="'/posts/'+post.postId">Read</router-link>
               
              </div>
            </div>
          </div>

          

         
        </div>
      </section>
      <!--Section: Content-->

      <!-- Pagination -->
      <nav class="my-4" aria-label="...">
        <ul class="pagination pagination-circle justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
 
 

</template>
<script>
    import {useI18n} from 'vue-i18n'

    import _service from '../../_services/_service'
    export default{
       setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        data(){
            return{
                posts:[]
            }
        },
        created(){
        },
        computed:{
            
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
            this.$store.commit('setLoading',true)

            _service.getPosts()
            .then(res => {
              this.posts = res.data; 
              console.log(this.posts);


            }).catch(err => {
              console.log(err)
            }).then(() => {
                this.$store.commit('setLoading',false)
            })
        },
        methods:{
          getImg(img){
            return process.env.VUE_APP_ROOT_URL + '/data/posts/' + img
          }
        }
    }
</script>