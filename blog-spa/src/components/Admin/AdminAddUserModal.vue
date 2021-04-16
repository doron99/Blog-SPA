/* eslint @intlify/vue-i18n/no-missing-keys: 'error' */
<template>

     <!-- <div v-if="showModal"> -->
    <transition name="modal" >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" @click.prevent="close()">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">User {{uid}}</h4>
              </div>
              <div class="modal-body text-right" >
                    <div class="container">
                        <div class="d-table-cell ">
                            <label class="fix-width">אימייל</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" v-model="user.uemail">
                        </div>
                    </div>

                    <div class="container">
                        <div class="d-table-cell fix-width">
                            <label class="fix-width">שם פרטי</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" v-model="user.ufname">
                        </div>
                    </div>

                    <div class="container">
                        <div class="d-table-cell fix-width">
                            <label class="fix-width">שם משפחה</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" v-model="user.ulname">
                        </div>
                    </div>

                    <div class="container">
                        <div class="d-table-cell fix-width">
                            <label class="fix-width">סיסמה</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" type="password" v-model="user.password">
                        </div>
                    </div>

                    <div class="container">
                        <div class="d-table-cell fix-width">
                            <label class="fix-width">וידוא סיסמה</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" type="password" v-model="user.confirmPassword">
                        </div>
                    </div>
                    <hr/>
                   
                  <div class="form-inline">  
                        <button type="submit" class="btn btn-primary" @click.prevent="addUser()">add</button>
                  </div>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </transition>
  <!-- </div> -->
</template>

<script>
 import _userService from '../../_services/_userService'
 import exHandler from '../../js/exHandler'
  import _service from '../../_services/_service'

export default {
    name: 'AdminAddUserModal',
    props:{
        isShow:Boolean,
    },
    data:function(){
        return {
            user:{
                uemail:null,
                ufname:null,
                ulname:null,
                password:null,
                confirmPassword:null
            }
        }
    },mounted(){
        
    },methods:{
        close(){
            this.$emit('close')
        },
        getUser(){
            
        },
        check(role,event){
            event.preventDefault();
            if(confirm("add/change role?")){
                if(event.target.checked){
                    _userService.addRole(this.uid,role)
                    .then(x => this.$toast.success("updated successfully"))
                    .catch(err => this.$toast.success("error"))
                }else{
                    _userService.deleteRole(this.uid,role)
                    .then(x => this.$toast.success("updated successfully"))
                    .catch(err => this.$toast.success("error"))
                }
                
            }else{
                event.target.checked = !event.target.checked;
            }
            
            
        },
        addUser(){
            let user = {
                email:this.user.uemail,
                fname:this.user.ufname,
                lname:this.user.ulname,
                password:this.user.password,
                confirmPassword:this.user.confirmPassword
            }
            _service.register(user)
            .then(x => {
                console.log(x.data)
                this.$toast.success("added successfully");
                this.$router.replace(`/user-details/${x.data.uid}`);
                
            })
            .catch(err => {
                if(err.response.status == 400 && err.response.data)
                    console.log(err.response.data);
                else
                    console.log(err);
                
                this.$toast.error("error");


            })
        }
    },watch:{
        
    }
    
}
</script>
<style scoped>
    .fix-width {
        width:100px;
    }
</style>