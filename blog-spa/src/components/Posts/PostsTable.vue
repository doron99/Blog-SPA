<template>
<div class="resp" style="width:100%;margin-top:4rem;margin-bottom:4rem;text-align:center;">
<div style="margin: 0px auto;">
    <h4>management</h4>
    </div>
<table style="margin: 0px auto;">
    <tr>
        <th>id</th>
        <th>{{t('shortdesc')}}</th>
        <th>{{t('enter')}}</th>
        <th>{{t('edit')}}</th>
    </tr>
        
        <tr v-for="post in posts" :key="post">
        <td data-th="id">{{post.title}}</td>
        <td :data-th="t('shortdesc')">{{post.excerpt}}</td>
        <td :data-th="t('enter')"><router-link :to="'/posts/'+post.postId" class="btn btn-success d-inline">{{t('enter')}}</router-link></td>
        <td :data-th="t('edit')"><router-link :to="'/create-post/'+post.postId" class="btn btn-info d-inline">{{t('edit')}}</router-link></td>
        </tr>
    </table>

<div class="d-flex justify-content-center mt-3 mb-3">
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
      import Pagination from '../General/Pagination'
      import {useI18n} from 'vue-i18n'
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
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
            this.getPosts()
        },
        methods:{
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
                console.log(this.posts);
              }).catch(err => {
                console.log(err)
              }).then(() => {
                  this.$store.commit('setLoading',false)
              })
          },
          onPageChange(event){
                this.currPage=event
                console.log('res:',event,this.itemsPerPage)
                this.$router.push(`/posts-manage?currPage=${this.currPage}&itemsPerPage=${this.itemsPerPage}`)
                this.getPosts()
            },
          getImg(img){
            return process.env.VUE_APP_ROOT_URL + '/data/posts/' + img
          }
        }
    }
</script>
<style scoped>

@media only screen and (max-width: 500px)  {
    .resp table  { 
        direction: rtl;
        display: block ; 
        width:100%
    }   
    .resp th  { 
        position: absolute;
        top: -9999px;
        right: -9999px;
        display:block ;
    }   
     .resp tr { 
    border: 1px solid #ccc;
    display:block;
    }   
    .resp td  { 
        /* Behave  like a "row" */
        border: none;
        border-bottom: 1px solid #eee; 
        position: relative;
        width:100%;
        background-color:White;
        text-indent: 50%; 
        text-align:right;
        padding-right: 0px;
        display:block;   
        margin-top: 9px;
        margin-bottom: 9px;   
    }
    .resp  td:nth-child(1)  {
        border: none;
        border-bottom: 1px solid #eee; 
        position: relative;
        font-size:20px;
        text-indent: 0%;
        text-align:center;
}   
    .resp td:before  { 
        /* Now like a table header */
        position: absolute;
        /* Top/left values mimic padding */
        top: -3px;
        right: 6px;
        width: 45%; 
        text-indent: 0%;
        text-align:right;
        white-space: nowrap;
        background-color:White;
        font-weight:bold;
    }
    /*
    Label the data
    */
    .resp td:nth-of-type(2):before  { content: attr(data-th) }
    .resp td:nth-of-type(3):before  { content: attr(data-th) }
    .resp td:nth-of-type(4):before  { content: attr(data-th) }
    .resp td:nth-of-type(5):before  { content: attr(data-th) }
    .resp td:nth-of-type(6):before  { content: attr(data-th) }
    .resp td:nth-of-type(7):before  { content: attr(data-th) }
    .resp td:nth-of-type(8):before  { content: attr(data-th) }
    .resp td:nth-of-type(9):before  { content: attr(data-th) }
    .resp td:nth-of-type(10):before  { content: attr(data-th) }
}</style>