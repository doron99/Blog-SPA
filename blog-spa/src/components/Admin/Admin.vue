<template>

<div style="width:100%">
    <ul class="nav nav-tabs mt-1">
    <li class="nav-item">
        <router-link class="nav-link" to="/admin/users" active-class="active">ניהול משתמשים</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" to="/admin/add-user" active-class="active">הוסף משתמש</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" :to="'/admin/users/'+UID" active-class="active">פרטי משתמש</router-link>
    </li>
    </ul>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark d-none">
        <!-- Brand -->

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/users" active-class="active">ניהול משתמשים</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/add-user" active-class="active">הוסף משתמש</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="'/admin/users/'+UID" active-class="active">פרטי משתמש</router-link>
            </li>
            </ul>
        </div>
    </nav>
    
    <router-view></router-view>
</div>


    
</template>
<script>
      
    export default{
        components:{
            
        },
         
        data(){
            return{
                
            }
        },
        created(){
        },
        computed:{
            UID(){
                return this.$store.getters.uid;
            }
        },
        watch:{
            
        },
        mounted(){
            
        },
        methods:{
            
            
          },
          
        
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