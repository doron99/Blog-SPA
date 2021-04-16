<template>

<div class="container col-md-8 ">
      <!--Section: Content-->
      <section class="text-center mt-4">
        <!-- <h4 class="mb-5"><strong>Latest posts</strong></h4> -->

        <div v-if="posts.length > 0" class="row">
          <div  v-for="(post) in posts" :key="post.postId"  class="col-lg-6 col-md-12 mb-4">
            <div class="card">
              <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img :src="post.coverImagePath 
                ? getImg(post.coverImagePath): 
                getPlaceHolder" class="img-fluid" style="height:235px" />
                <a href="#!">
                  <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
              </div>
              <div class="card-body">
                <div class="sub-header">
                      <div class="sub-header-in-left">
                        {{dateFormat(post.created)}}
                      </div>
                      <div class="sub-header-in-right">
                        {{post.author.ufname + ' ' + post.author.ulname}}
                      </div>
                </div>
                <h5 class="card-title">{{post.title}}</h5>
                <p class="card-text">
                  {{post.excerpt}}
                </p>
                <router-link class="btn btn-primary" :to="'/posts/'+post.postId">{{t('read')}}</router-link>
               
              </div>
              <div class="card-footer">
                <div style="display:flex;">
                  <div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          

         
        </div>
      </section>
 
      <!-- Pagination -->
      <div class="d-flex justify-content-center mb-3">
                <pagination  
                    :totalPages="totalPages"
                    :currPage="currPage"
                    :maxVisibleButtons="maxVisibleButtons"
                    @pagechanged="onPageChange($event)">
                </pagination>
        </div>
     
   
    </div>
 
 

</template>
<script>
    import {dateFormat} from '../../js/helper2.js'
    import {useI18n} from 'vue-i18n'
    import Pagination from '../General/Pagination'
    import _service from '../../_services/_service'
    export default{
      components:{
        Pagination
      },
       setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        data(){
            return{
                posts:[],
                currPage:null,
                itemsPerPage:null,
                TotalPages:1,
                maxVisibleButtons:3,
            }
        },
        created(){
        },
        computed:{
            getPlaceHolder(){
                return process.env.VUE_APP_DEFAULT_IMG;
            }
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
            this.getPosts()
        },
        methods:{
          dateFormat(value){
                 let x = dateFormat(value);
                 return x
             },
          getPosts(){
              let data = {
                currPage:this.currPage,
                itemsPerPage:this.itemsPerPage
              }
              this.$store.commit('setLoading',true)
              _service.getPosts(data)
              .then(res => {
                this.posts = res.data.data; 
                this.currPage = res.data.currPage;
                this.itemsPerPage = res.data.itemsPerPage;
                this.totalPages = res.data.totalPages;
              }).catch(err => {
                this.$toast.error('error occour');
              }).then(() => {
                  this.$store.commit('setLoading',false)
              })
          },
          onPageChange(event){
                this.currPage=event
                this.$router.push(`/posts?currPage=${this.currPage}&itemsPerPage=${this.itemsPerPage}`)
                this.getPosts()
            },
          getImg(img){
            return process.env.VUE_APP_ROOT_URL + '/data/posts/' + img
          }
        }
    }
</script>
<style scoped>
  .sub-header{
    border-radius: 5px;
    padding-bottom: 5px;
    margin: 3px 8px;
    font-size: 16px;
    color: rgb(90, 173, 239);
    font-weight: 600;
    overflow: auto;
    font-size: 12px;
  }
  .sub-header-in-left{
    float: left; 
    width: 50%; 
    text-align: left; 
    position: relative;
  }
  .sub-header-in-right{
    float: right; 
    width: 50%; 
    text-align: right; 
    position: relative;
  }
</style>