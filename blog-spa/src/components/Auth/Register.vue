<template>
    <div class="login-form" style="direction:rtl;">
        <form  @submit.prevent="register()" >
            <h2 class="text-center">Register</h2>       
            <div class="form-group">
                <input type="text" 
                class="form-control" 
                :placeholder="$t('email')" 
                v-model="user.email"
                required="required">
            </div>
            <div class="form-group">
                <input type="text" 
                class="form-control" 
                :placeholder="$t('firstname')"
                v-model="user.fname"
                required="required">
            </div>
            <div class="form-group">
                <input type="text" 
                class="form-control" 
                :placeholder="$t('lastname')"
                v-model="user.lname"
                required="required">
            </div>
            <div class="form-group">
                <input type="password" 
                class="form-control" 
                :placeholder="$t('password')"
                v-model="user.password"
                required="required">
            </div>
            <div class="form-group">
                <input type="password" 
                class="form-control" 
                :placeholder="$t('confirmpassword')"
                v-model="user.confirmpassword"
                required="required">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">{{$t('register')}}</button>
            </div>  
        </form>
       
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
                user:{
                    fname:"",
                    lname:"",
                    email:"",
                    password:"",
                    confirmpassword:""  
                }
                
            }
        },
        methods:{
            register(){
                let formData = this.user;
                _service.register(formData)
                .then(() => {
                    this.$toast.success('registered Successfully');
                    this.$router.replace({ path: "/login" });
                }).catch(err => {
                    this.$toast.error('error occour');
                })
            }
        }
    }
</script>

<style scoped>
.login-form {
    width: 340px;
    margin: 50px auto;
    font-size: 15px;}

    .login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgb(0 0 0 / 30%);
    padding: 30px;
}

</style>