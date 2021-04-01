<template>
    <div>
    <ul class="pagination pagination-sm">
    <li class="page-item mr-1 ml-1"  :class="{ active: isInFirstPage}">
      <button
        class="page-link"
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        <span >First</span>
      </button>
    </li>

    <li class="page-item mr-1 ml-1" :class="{ active: isInFirstPage}">
      <button
        class="page-link"
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <span >Previous</span>

      </button>
    </li>

    <li class="page-item mr-1 ml-1" v-for="page in pages" :key="page.name" >
      <button
        class="page-link "
        type="button"
        @click="onClickPage(page.name)"
        :class="page.isActive"
        :disabled="page.isDisabled"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="page-item mr-1 ml-1" :class="{ active: isInLastPage}">
      <button
        class="page-link"
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li class="page-item mr-1 ml-1" :class="{ active: isInLastPage}">
      <button
        class="page-link"
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>

  
</div>
</template>
<script>
export default {
 setup(){

 },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    currPage: {
      type: Number,
      required: true
    }
  },
  data(){
      return {
          isInLastPage:false,
          isInFirstPage:true,
      }
  },
  created(){
  },
  computed: {
        firstPage(){ return this.currPage === 1},
        middlePage(){ return this.currPage === this.totalPages},
        getState(){
            return this.currPage === 1 ? 1 : this.currPage === this.totalPages? 2 : 3;
        },
         startPage(){
                 return this.currPage === 1 ? 1 : this.currPage === this.totalPages?this.totalPages - this.maxVisibleButtons : this.currPage - 1;
        }
      
        ,
        pages() {
            const range = [];
            for (let i = this.startPage;
            i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
            i+= 1 ) {
              if (i<1){continue;}
            range.push({
                name: i,
                isDisabled: (i === this.currPage  ),
                isActive: i === this.currPage?'btn btn-primary':''
            });
            }
            return range;
        }
    },
    methods: {
        onClickFirstPage() {
            this.isInFirstPage = true
            this.isInLastPage = false

            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currPage + 1);
        },
        onClickLastPage() {
            this.isInFirstPage = false

            this.isInLastPage = true
            this.$emit('pagechanged', this.totalPages);
        }
    },
        watch:{
            getState(){
                 if(this.getState == 1){
                     this.isInFirstPage = true;
                 }else if(this.getState == 2){
                     this.isInLastPage = true;
                 }else{
                     this.isInFirstPage = false;
                     this.isInLastPage = false
                 }
            }
    }
  }
</script>
<style scoped>
.pagination {
  margin: 0;
  padding: 0;
}
/* .pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
} */
</style>