
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
              <div class="modal-body text-right" v-if="user != null">
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
                <div v-if="userIsAdmin">
                    <div class="container">
                        <div class="d-table-cell ">
                            <label class="fix-width">יצירת פוסטים</label>
                        </div>
                        <div class="d-table-cell ">
                            <input type="checkbox" id="checkbox" v-model="user.isPost">

                            <!-- <input class="" type="checkbox" v-model="" id="defaultCheck1"> -->
                       </div>
                    </div>
                    <div class="container">
                        <div class="d-table-cell ">
                            <label class="fix-width" >יצירת תגובות</label>
                        </div>
                        <div class="d-table-cell ">
                            <input type="checkbox" id="checkbox2" v-model="user.isComment">
                       </div>
                    </div>
                </div>
                  <div class="form-inline">  
                        <button type="submit" class="btn btn-primary" @click.prevent="updateUser()">update</button>
                  </div>
                  
                  <div v-if="userIsAdmin">
                      <hr>
                      <div class="container mt-3">
                        <h4>הרשאות</h4>
                        </div>
                        <div class="container">
                            <div class="d-table-cell ">
                                <label class="fix-width" for="defaultCheck3">Administrator</label>
                            </div>
                            <div class="d-table-cell ">
                                <input class="" type="checkbox" v-model="isAdmin" @change.prevent ="check('Administrator',$event)" id="defaultCheck3">
                            </div>
                        </div>
                        <div class="container">
                            <div class="d-table-cell ">
                                <label class="fix-width" for="defaultCheck4">User</label>
                            </div>
                            <div class="d-table-cell ">
                                <input class="" type="checkbox" v-model="isUser" @change.prevent ="check('User',$event)" id="defaultCheck4">
                            </div>
                        </div>
                  </div>
                  
                    <hr>
                    <div class="container mt-3">
                        <h4>שינוי סיסמה</h4>
                    </div>
                    <div class="container">
                        <div class="d-table-cell ">
                            <label class="fix-width">סיסמה</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" type="password" v-model="password">
                        </div>
                    </div>

                    <div class="container">
                        <div class="d-table-cell fix-width">
                            <label class="fix-width">וידוא סיסמה</label>
                        </div>
                        <div class="d-table-cell w-100">
                            <input class="form-control form-control-sm" type="password" v-model="confirmPassword">
                        </div>
                    </div>
                    <div class="form-inline">  
                        <button type="submit" class="btn btn-primary" @click.prevent="updatePassword()">update password</button>
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
 
export default {
    name: 'AdminUserModal',
    props:{
        isShow:Boolean,
        uid:Number
    },
    data:function(){
        return {
            user:null,
            isUser:false,
            isAdmin:false,
            password:'',
            confirmPassword:''
        }
    },mounted(){
        if(this.uid != null){
            this.getUser();
        } 
    },computed:{
            userIsAdmin(){
                return this.$store.getters.isAdmin;
            }
    },
    methods:{
        updatePassword(){
            let formData = {
                uid:this.uid,
                password:this.password,
                confirmPassword:this.confirmPassword
            }
            _userService.changePassword(this.uid,formData)
            .then(x => {
                this.$toast.success('password changed');
                this.password = '';
                this.confirmPassword = '';
            })
            .catch(err => {
                this.$toast.error('failed')
            })
        },
        close(){
            this.$emit('close')
        },
        getUser(){
            _userService.getUser(this.uid)
            .then(u => {
                this.user = u.data;
                console.log(this.user.roles.some(e => e.roleName === 'Administrator'))
                if (this.user.roles.some(e => e.roleName === 'Administrator'))
                    this.isAdmin = true;
                if (this.user.roles.some(e => e.roleName === 'User'))
                    this.isUser = true;

            }).catch(err => {
                this.user = null;
            })
        },
        check(role,event){
            event.preventDefault();
            if(confirm("add/change role?")){
                console.log(role,event.target.checked);
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
        updateUser(){
            let user = {
                uid:this.uid,
                uemail:this.user.uemail,
                ufname:this.user.ufname,
                ulname:this.user.ulname,
                isPost:this.user.isPost,
                isComment:this.user.isComment
            }
            _userService.updateUser(this.uid,user)
            .then(x => {
                this.$toast.success("updated successfully");
            })
            .catch(err => {
                this.$toast.error("error occour");
            });
        }
    },watch:{
        uid:function(newVal, oldVal){
            if(this.uid != null){
                this.isAdmin = false;
                this.isUser = false;
                this.user = null;
                this.getUser();
            }
            
        }
    }
    
}
</script>
<style scoped>
    .fix-width {
        width:100px;
    }
</style>