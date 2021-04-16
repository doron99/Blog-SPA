<template>
<div>
    <button type="button" class="btn btn-primary" @click="toggleModal">My Modal</button>
    <div
      ref="modal"
      class="modal-open modal fade"

      :class="{show, 'd-block': active}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleModal"
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" @click="toggleModal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
</div>
    
</template>
<script>

export default{
    

        props:["showModal"],
        data(){
            return{
                active: true,
                show: true,
            }
        },
        created(){
        },
        mounted(){
            this.toggleModal();
        },
        computed:{
            showMyModal(){return this.showModal;}
        },
        watch:{
            showMyModal(value) {
                this.toggleModal();
            },
            
                
            
        },
        methods:{
            close(){
                this.$emit('close');
            },
            updateComment(){
                this.$emit('updateComment',this.comment);
            },
            toggleModal() {
                this.$emit('close');
                const body = document.querySelector("body");
                this.show = !this.show;
                this.active = !this.active;
                this.active
                    ? body.classList.add("modal-open")
                    : body.classList.remove("modal-open");
                
            },
        
        }
}
</script>