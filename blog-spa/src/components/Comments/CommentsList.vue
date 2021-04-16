<template>
<div class="container  mb-5 mt-5">
    
    <div v-if="!isLoggedIn" class="card divComment my-4 " ref="divComment">
        <h5 class="card-header">
            עליך להתחבר על מנת להגיב
        </h5>
    </div>
    <div v-else class="card divComment my-4 " ref="divComment">
              <h5 class="card-header">
                Leave a Comment: 
              </h5>
              <h6 class="card-header" v-if="comment.commentParentId != null">
                  reply to: {{replyAuthor}}
                  <button  @click.prevent="cancelReply()">X</button>
              </h6>
              <div class="card-body">
                <form @submit.prevent="createComment()">
                <div class="form-group">
                    <textarea v-model="comment.content" class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
        </div>

    <div v-if="tree.length > 0" class="card">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center mb-5"> תגובות </h3>
                <div  class="row">
                    <div class="col-md-12">
                        <div  
                            v-for="comment in tree" :key="comment" 
                            class="media"  
                            :class="comment.children.length === 0 ? 'mb-4' : ''"> 
                            <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" 
                            :src="getPlaceHolder" />
                            <div class="media-body">
                                <div class="row">
                                    <div class="col-8 d-flex">
                                        <h5>{{comment?.author?.ufname + ' ' + comment?.author?.ulname}}</h5> 
                                    </div>
                                    <div class="col-4">
                                        <div class="pull-right reply"> 
                                            <button v-if="isLoggedIn && comment.authorId == UID" class="btn-link" @click.prevent="setModal(true,comment)" >
                                                <span><i class="fa fa-edit"></i> </span>
                                            </button>
                                            
                                            <button v-if="isLoggedIn" class="btn-link" @click.prevent="replyTo(comment)">
                                                <span><i class="fa fa-reply"></i> </span>
                                            </button> 
                                            
                                            <button v-if="isLoggedIn && comment.authorId == UID" class="btn-link" @click.prevent="deleteComment(comment)">
                                                <span><i class="fa fa-trash"></i> </span>
                                            </button> 
                                            
                                        </div>
                                    </div>
                                </div> 
                                {{comment.content}} 
                                <!-- here the sub comment start -->
                                <div v-for="child in comment.children" :key="child" class="media mt-4 mb-4"> 
                                    <a class="pr-3" href="#">
                                        <img class="rounded-circle" 
                                        alt="" 
                                        :src="getPlaceHolder" />
                                    </a>
                                
                                    <div class="media-body">
                                        <div class="row">
                                            <div class="col-8 d-flex">
                                                <h5 class="">{{child?.author?.ufname + ' ' + child?.author?.ulname}}</h5> 

                                        
                                            </div>
                                            <div class="col-4 pull-right reply "> 
                                            <button v-if="isLoggedIn && child.authorId == UID" class="btn-link" @click.prevent="setModal(true,child)" >
                                                <span><i class="fa fa-edit"></i> </span>
                                            </button>
                                            
                                            <button v-if="isLoggedIn && child.authorId == UID" class="btn-link" @click.prevent="deleteComment(child)">
                                                <span><i class="fa fa-trash"></i> </span>
                                            </button> 

                                        </div>
                                        </div> 
                                        {{child.content}}
                                    </div>
                                </div>
                                
                                <!-- here the sub comment end -->
                            </div> 
                        </div>
                    </div>
                </div>
                
                   
            </div>
        </div>
    </div>
   
    <!----------------------- modal --------------------->
    <div
      v-if="commentTmp != null"
      ref="modal"
      class="modal-open modal fade"
      :class="{show, 'd-block': active}"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
                <h5 class="modal-title">Edit Comment</h5>
                <button
                style="display:none"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click.prevent="setModal(false,null)"
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <textarea v-model="commentTmp.content" class="form-control" rows="3"></textarea>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-hidden="true" aria-label="Close" @click.prevent="setModal(false,null)">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="updateComment(commentTmp)">Save changes</button>
            </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>

</div>
</template>

<script>
    import {useI18n} from 'vue-i18n'
    import store from '../../store'
    import _service from '../../_services/_service.js'
    export default{
        components:{
        },
         setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        props:["postId"],
        data(){
            return{
                active: false,
                show: false,
                commentTmp:{
                    commentId:-1,
                    postId:'',
                     commentParentId:null,
                     content:''
                },
                comment:{
                     postId:'',
                     commentParentId:null,
                     content:''
                },
                replyAuthor:'',
                tree:[],
                list:this.comments
            }
        },
        computed:{
            isLoggedIn(){
                return store.getters.isLoggedIn;
            },
            getPlaceHolder(){
                return process.env.VUE_APP_DEFAULT_IMG;
            },
            UID(){
                return store.getters.uid;
            }
        },
        created(){
            console.log(process.env.VUE_APP_DEFAULT_IMG)
            this.comment.postId = this.postId;
            _service.getComments(this.postId)
            .then(res => {
                this.list = res.data;
                this.tree = this.list_to_tree(this.list)
            }).catch(() => {

            }).then(() =>{

            })

        },
        methods:{
            deleteComment(comment){
                let self = this;
                if(confirm("Do you really want to delete?")){
                    _service.deleteComment(comment.postId,comment.commentId)
                    .then(() => {
                        this.$toast.success('comment deleted');
                        let filteredList = this.list.filter(x => x.commentId != comment.commentId);
                        this.list = filteredList;
                        this.tree = this.list_to_tree(this.list);

                    })
                    .catch((err) => {
                        this.$toast.error(err.response.data);
                    })
                }
            },
            updateComment(comment){
                
                let index = this.list.findIndex(x => x.commentId == comment.commentId);
                if(this.list[index].content === comment.content){
                    this.setModal(false,null);
                    return;
                }

                this.$store.commit('setLoading',true);
                let self = this;
                _service.updateComment(comment.postId,comment.commentId,comment.content)
                .then(res => {
                    this.$toast.success('comment updated');
                    self.list[index].content = comment.content;
                    self.tree = this.list_to_tree(this.list)
                    this.setModal(false,null);
                })
                .catch(err => {
                    this.$toast.error(err.response.data);
                })
                .then(() => {
                    this.$store.commit('setLoading',false);
                });
            },
            setModal(flag,comment){
                this.active= flag;
                this.show= flag;
                this.commentTmp =  Object.create(comment);
            },
            createComment(){
                _service.createComment(this.postId,this.comment)
                .then(res => {
                    this.$toast.success('comment added');
                    this.list = null;
                    this.list = res.data
                    this.tree = this.list_to_tree(this.list)
                    this.cancelReply();
                    this.comment.content = '';
                }).catch(()=> {
                    this.$toast.error('comment failed');
                })
            },
            replyTo(comment){
                this.replyAuthor = comment.author.ufname + ' ' + comment.author.ulname
                this.comment.commentParentId = comment.commentId
                this.goTo('divComment')
            },
            cancelReply(){
                this.replyAuthor = '';
                this.comment.commentParentId = null
            },
            goTo(refName){
                var element = this.$refs[refName];
                var top = element.offsetTop ;
                window.scrollTo(0,top+100);
            },
            list_to_tree(list) {
                var map = {}, node, roots = [], i;
                
                for (i = 0; i < list.length; i += 1) {
                    map[list[i].commentId] = i; // initialize the map
                    list[i].children = []; // initialize the children
                }
                
                for (i = 0; i < list.length; i += 1) {
                    node = list[i];
                    if (node.commentParentId !== null) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.commentParentId]].children.push(node);
                    } else {
                    roots.push(node);
                    }
                }
                return roots;
            },
           
        
    }
        
    }
</script>

<style scoped>

html,
body {
    height: 100%
}
.btn-link {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    border: none;
}
body {
    display: grid;
    place-items: center;
    font-family: 'Source Sans Pro', sans-serif;
    background: #9C27B0
}

.card {
    position: relative;
    display: flex;
    padding: 20px;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #d2d2dc;
    border-radius: 11px;
    -webkit-box-shadow: 0px 0px 5px 0px rgb(249, 249, 250);
    -moz-box-shadow: 0px 0px 5px 0px rgba(212, 182, 212, 1);
    box-shadow: 0px 0px 5px 0px rgb(161, 163, 164)
}

.media img {
    width: 60px;
    height: 60px
}

.reply a {
    text-decoration: none
}

</style>