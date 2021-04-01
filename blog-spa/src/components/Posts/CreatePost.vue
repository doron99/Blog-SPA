<template>
<div class="container text-right mt-2 mb-2" style="direction:rtl;">
    <div v-if="!isMyPost && post.postId != null" class="card divComment my-4 " ref="divComment">
        <h5 class="card-header">
            אינך יכול לשנות פוסט שאינו שלך.
        </h5>
    </div>
    <div v-if="isMyPost || post.postId == null" class="card mt-2 mb-2"  >
             <div class="card-body">
                <h5 class="card-title">{{post.postId? t('edit') : t('add')}}</h5>
                <div class="row">
                    <!-- //main div -->
                    <div class="col-sm-12">
                        
                        <div class="form-inline mb-2">
                            {{t('title')}} <input  class="form-control form-control-sm w-50" v-model="post.title" />
                        </div>
                        <div class="form-inline mb-2">
                            {{t('excerpt')}} <input class="form-control form-control-sm w-50" v-model="post.excerpt" />
                        </div>
                       
                        <div class="form-group">
                            <label for="content">{{t('content')}}</label>
                            <br/>
                        <ckeditor 
                            :editor="editor" 
                            @ready="onReady" 
                            v-model="post.content" 
                            :config="editorConfig">
                        </ckeditor>
                        </div>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <img v-if="!!post.coverImagePath" class="img-fluid rounded imagePreviewWrapper float-right"  :src="img || ''" alt="">
                    </div>
                </div>
             </div>
             <div class="card-footer">
                 <button @click.prevent="post.postId? Update() :Create()">{{post.postId? t('update') : t('add')}}</button>
             </div>
        </div>
        <div v-if="isMyPost || post.postId == null" class="mt-4">
            <input
                ref="fileInput"
                type="file"
                @input="pickFile">
                <button @click="Upload()">{{t('upload')}}</button>
             <div
                class="imagePreviewWrapper"
                :style="{ 'background-image': `url(${previewImage})` }"
                @click="selectImage">
                </div>

                
            </div>
            
            
        
</div>
   
       
</template>
<script>
      import {useI18n} from 'vue-i18n'
    import store from '../../store'
   import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
    import _service from '../../_services/_service'
    export default{
        setup(){
          const {t,locale} = useI18n();
          return  {t,locale} 
        },
        data(){
            return{
                editor: DocumentEditor,
                isUpdate:false,
                authorId:null,
                post:{
                    postId:null,
                    title:"",
                    excerpt:"",
                    content:"",
                    created:null,
                    coverImagePath:""
                },
                img:null,
                previewImage: null,
                editorConfig: {
                    enterMode:DocumentEditor.ENTER_BR ,

                    toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'imageInsert',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'highlight',
          'removeFormat',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'indent',
          'outdent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          'mediaEmbed',
          '|',
          'undo',
          'redo',
          'CKFinder'
        ]
      },
      language: 'he',
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side',
          'linkImage'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
               },
            }
        },
        created(){
            console.log('created')
        },
        mounted(){
            this.editor.contentsLangDirection = 'rtl';
            if(!isNaN(this.$route.params.id))
                this.onLoad(true);
            else
                this.onLoad(false);
                
        },
        computed:{
            isNewPost(){
                return !isNaN(this.$route.params.id) ? true : false;
            },
            isMyPost(){
                console.log('this.post.authorId: ' + this.authorId)
                console.log('store.getters.uid: ' + store.getters.uid)
                return store.getters.uid == this.authorId ;
            }
        },
        watch:{
            isNewPost(){
                this.onLoad(this.isNewPost);
            }
        },
        methods:{
            onLoad(flag){
                if(!flag){
                    this.authorId = null;
                    this.post.isUpdate = false;
                    this.post.postId = null;
                    this.post.title = "";
                    this.post.excerpt = "";
                    this.post.content = "";
                    this.post.created = null;
                    this.post.coverImagePath = "";
                }else{
                    this.isUpdate = true;
                    this.getPost(this.$route.params.id);
                }
            },
            async Create(){
                let formData = new FormData();
                formData.append('image', this.$refs.fileInput.files[0]);
                this.$store.commit('setLoading',true)
                let promise1 = await _service.createPost(this.post).then(res => res.data.postId);
                //let promise2 = promise1.then()
                if(!isNaN(promise1) && !!this.$refs.fileInput.files[0]){
                    await _service.upload(promise1,formData)
                    .then(() => {
                        this.$toast.success("img uploaded");
                        this.$store.commit('setLoading',false);
                        this.$router.replace(`/posts/${promise1}`);

                    }).catch(err => {
                        this.$toast.error(err.response.data);
                    })
                }
                this.$router.replace(`/posts/${promise1}`);
               
            },
            Update(){
                _service.UpdatePost(this.post.postId,this.post)
                .then(res => {
                    this.$toast.success('updated successfully');
                }).catch(err =>{
                    this.$toast.error(err.response.data)
                })
            },
            onReady(editor ){
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement(),
                        
                );
                editor.execute( 'alignment', { value: 'right' } );

            },
            async getPost(id){
                this.$store.commit('setLoading',true)
                await _service.getPost(id)
                .then(res => {
                    this.authorId = res.data.authorId;
                    this.post.postId=res.data.postId
                    this.post.title=res.data.title
                    this.post.excerpt=res.data.excerpt
                    this.post.content=res.data.content
                    this.post.created=res.data.created
                    this.post.coverImagePath=res.data.coverImagePath
                    this.img = process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath
                }).catch(err => {
                    this.$toast.error('problem occour');
                }).then(()=>{this.$store.commit('setLoading',false)})
            },
            selectImage () {
                this.$refs.fileInput.click()
            },
            pickFile () {
                let input = this.$refs.fileInput
                let file = input.files
                if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.previewImage = e.target.result
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
                }
            },
            Upload(){
                let input = this.$refs.fileInput
                let file = input.files;
                let formData = new FormData();
                formData.append('image', this.$refs.fileInput.files[0]);

                if (file && file[0]) {
                    this.$store.commit('setLoading',true)
                    _service.upload(this.post.postId,formData )
                    .then(res => {
                        this.$toast.success('successfully uploaded');
                    }).catch(err =>{
                        this.$toast.error(err.response.data)
                    }).then(() => this.$store.commit('setLoading',false))
                }
            }
        }
    }
    
</script>
<style>
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
.ck-blurred {
    border: 1px solid #695656;
}
.ck.ck-editor__editable_inline {

    border: 1px solid #695656;
      
}

.cke_top{
    border-radius: 10px 10px 0px 0px
}

.cke_bottom{
    border-radius: 0px 0px 10px 10px
}
</style>