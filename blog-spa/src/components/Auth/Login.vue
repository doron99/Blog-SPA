<template>
    <div class="login-form" style="direction:rtl;">
    <form  @submit.prevent="login()" >
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" 
            class="form-control" 
            placeholder="Username" 
            v-model="email"
            required="required">
        </div>
        <div class="form-group">
            <input type="password" 
            class="form-control" 
            placeholder="Password" 
            v-model="password"
            required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix  d-none" >
            <label class="float-left form-check-label"><input type="checkbox"> Remember me</label>
            <a href="#" class="float-right">Forgot Password?</a>
        </div>        
    </form>
    <p class="text-center"><router-link to="/register">Create an Account</router-link></p>
</div>
</template>

<script>
    import {useI18n} from 'vue-i18n'

import _service from '../../_services/_service'
export default {
     setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
    data(){
        return {
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            let formData = {
                email:this.email,
                password:this.password
            }
            _service.login(formData)
            .then(res => {
                this.$toast.success('Logged In Successfully');
                console.log(res.data);
                this.$store.commit('setToken',{
                    token:res.data.token,
                    expiration:res.data.expiration,
                    uemail:res.data.uemail});
                this.$router.replace({ path: "Home" });
            }).catch(err => {
                this.$toast.error('message string');
                console.log(err);

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