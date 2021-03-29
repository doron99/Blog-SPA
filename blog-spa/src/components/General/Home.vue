<template>

    <div class="col-md-12">
      
     <div id="intro" class="p-5 text-center bg-light">
        <h1 class="mb-3 h2">Learn Bootstrap 5 with MDB</h1>
        <p class="mb-3">Best & free guide of responsive web design</p>
        <a class="btn btn-primary m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A" role="button" rel="nofollow"
          target="_blank">Start tutorial</a>
        <a class="btn btn-primary m-2" href="https://mdbootstrap.com/docs/standard/" target="_blank"
          role="button">Download MDB UI KIT</a>
    </div>

  </div>
  
</template>

<script>
    import {useI18n} from 'vue-i18n'

export default {
  
   setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
  components:{
  },
  name: 'Home',
  props: {
    msg: String
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
