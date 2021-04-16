<template>
     <!-- <div v-if="showModal"> -->
    <transition name="modal" >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" @click="close()">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Img</h4>
              </div>
              <div class="modal-body">
                <img class="img-fluid img-thumbnail" id="img01" :src="'srcEncoded1'" >
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  <!-- </div> -->
</template>

<script>
export default {
    props:{
        isShow:Boolean
    },
    data:function(){
        return {
            //srcEncoded1:this.srcEncoded
        }
    },mounted(){
        //console.log(this.srcEncoded1)
    },methods:{
        close(){
            this.$emit('close',false)
        }
    }
    
}
</script>