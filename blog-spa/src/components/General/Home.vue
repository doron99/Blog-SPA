<template>

    <div class="col-md-12" style="">
      
     <div id="intro" class="p-5 text-center bg-light">
        <h1 class="mb-3 h2">הבלוג הראשון שלי בVue JS</h1>
        <p class="mb-3">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.
</p>
        <router-link class="btn btn-primary m-2 "  
          role="button"  to="/posts">
            רשימת פוסטים
            </router-link>
        
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

</style>
