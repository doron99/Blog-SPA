/* eslint @intlify/vue-i18n/no-missing-keys: 'error' */
<template>

<div class="container">
    <admin-user-modal 
    v-show="isShow" 
    :uid="uid"
    @close="isShow=true">
</admin-user-modal>
</div>






    
</template>
<script>
      // eslint-disable-next-line no-unused-vars
     import AdminUserModal from './AdminUserModal.vue'

    export default{
        components:{
            AdminUserModal
        },
        data(){
            return{
                isShow:false,
                uid:null
            }
        },
        created(){
        },
        computed:{
            
            //     return  process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
        },
        mounted(){
            if(!isNaN(this.$route.params.id)){
                this.showModal(this.$route.params.id)
            }
            
   
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
            
            
          
         
        }
    }
</script>

