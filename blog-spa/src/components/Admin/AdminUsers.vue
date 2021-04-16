/* eslint @intlify/vue-i18n/no-missing-keys: 'error' */
<template>

<div class="container">
    <admin-user-modal 
    v-show="isShow" 
    :uid="uid"
    @close=closeModal>
</admin-user-modal>

    <div class="resp" style="width:100%;margin-top:4rem;margin-bottom:4rem;text-align:center;">
<div style="margin: 0px auto;">
    <h4>management</h4>
    </div>
<table style="margin: 0px auto;">
    <tr style="">
        <th>id</th>
        <th>{{t('שם מלא')}}</th>
        <th>{{t('תאריך יצירה')}}</th>
        <th>{{t('אימייל')}}</th>

        <th>{{t('edit')}}</th>
        <th></th>
    </tr>
        
        <tr style="" v-for="(user,index) in users" :key="user" :index="index">
            <td data-th="id">{{user.uid}}</td>
            <td :data-th="t('שם מלא')">{{user.ufname + ' ' + user.ulname}}</td>
            <td :data-th="t('תאריך יצירה')">
                {{user.created}}
            </td>
            <td :data-th="t('אימייל')">{{user.uemail}}</td>

            <td :data-th="t('edit')">
                <button @click.prevent="showModal(user.uid)">{{t('enter')}}</button>
            </td>
            <td>
                <!-- <button v-if="uid == post.authorId"  
                    @click.prevent="setVisible(post,index)" 
                    :class="post.public ? 'btn btn-danger btn-sm' : 'btn btn-warning btn-sm'">
                    {{post.public ? 'הסתר פוסט':'הצג פוסט'}}
                </button> -->
            </td>
        </tr>
    </table>


</div>

<div class="d-flex justify-content-center mt-3 mb-3">
                <pagination  
                    :totalPages="totalPages || 1"
                    :currPage="currPage || 1"
                    :maxVisibleButtons="maxVisibleButtons"
                    @pagechanged="onPageChange($event)">
                </pagination>
        </div>


    
</div>







    
</template>
<script>
      // eslint-disable-next-line no-unused-vars
     import _userService from '../../_services/_userService'


     import {useI18n} from 'vue-i18n'
     import pagination from '../General/Pagination'
     import AdminUserModal from './AdminUserModal.vue'
   // import Pagination from '../General/Pagination'

    export default{
        components:{
            pagination,
            AdminUserModal
        },
        setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        data(){
            return{
                isShow:false,
                users:[],
                currPage:null,
                itemsPerPage:null,
                TotalPages:1,
                maxVisibleButtons:3,
                uid:null
            }
        },
        created(){
        },
        computed:{
            
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
         
            this.getUsers();
   
        },
        methods:{
            showModal(_uid) {
                this.isShow = true;
                this.uid = _uid;
            },
            closeModal() {
                this.isShow = false;
                this.uid = null;
            },
            getUsers(){
                let data = {
                    currPage:this.currPage,
                    itemsPerPage:this.itemsPerPage
                }
                this.$store.commit('setLoading',true)
                _userService.getUsers(data)
                .then(res => {
                    console.log(res.data)
                    
                    this.users = res.data.data; 
                    this.currPage = res.data.currPage;
                    this.itemsPerPage = res.data.itemsPerPage;
                    this.totalPages = res.data.totalPages;
                }).catch(err => {
                    this.$toast.error(err);
                    console.log(err)

                }).then(() => {
                    this.$store.commit('setLoading',false)
                })
            }
            
          
         
        }
    }
</script>
<style scoped>
@media only screen and (min-width: 500px)  {
    tr {
        height:35px;
    }
}
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
}


</style>