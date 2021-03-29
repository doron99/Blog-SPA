<template>
<div class="container text-right" style="direction:rtl;">
 <div class="card"  >
             <div class="card-body">
                <h5 class="card-title">{{post.postId? 'Edit' : 'Add'}} Post</h5>
                <div class="row">
                    <!-- //main div -->
                    <div class="col-sm-12">
                        
                        <div class="form-inline mb-2">
                            Title <input  class="form-control form-control-sm w-50" v-model="post.title" />
                        </div>
                        <div class="form-inline mb-2">
                            Excerpt <input class="form-control form-control-sm w-50" v-model="post.excerpt" />
                        </div>
                       
                        <div class="form-group">
                            <label for="content">Content</label>
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
                        <img v-if="img" class="img-fluid rounded imagePreviewWrapper float-right"  :src="img || ''" alt="">
                    </div>
                </div>
             </div>
             <div class="card-footer">
                 <button @click.prevent="isUpdate? Update() :Create()">{{isUpdate? 'Update' : 'Create'}}</button>
             </div>
        </div>
        <div class="mt-4">
            <input
                ref="fileInput"
                type="file"
                @input="pickFile">
                <button @click="Upload()">Upload</button>
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

   import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
    import _service from '../../_services/_service'
    export default{
        data(){
            return{
                editor: DocumentEditor,
                isUpdate:false,
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
        mounted(){
            this.editor.contentsLangDirection = 'rtl';
            console.log('post id: ' + this.$route.params.id)
            if(!isNaN(this.$route.params.id)){
                this.isUpdate = true;
                this.getPost();
            }
        },
        methods:{
            Create(){
                _service.createPost(this.post)
                .then(res => {
                    this.$toast.success('message string');
                    this.$router.push(`/create-post/${res.data.postId}`);
                
                }).catch(err => {
                    this.$toast.error('message string');
                    console.log(err);
                })
            },
            Update(){
                _service.UpdatePost(this.post.postId,this.post)
                .then(res => {
                    this.$toast.success('updated successfully');
                    console.log(res);
                }).catch(err =>{
                    this.$toast.error('problem occour');
                    console.log(err)
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
            async getPost(){
                this.$store.commit('setLoading',true)

                await _service.getPost(this.$route.params.id)
                .then(res => {
                    console.log(res.data);
                    this.post.postId=res.data.postId
                    this.post.title=res.data.title
                    this.post.excerpt=res.data.excerpt
                    this.post.content=res.data.content
                    this.post.created=res.data.created
                    this.post.coverImagePath=res.data.coverImagePath
                    this.img = process.env.VUE_APP_ROOT_URL + '/data/posts/' + this.post.coverImagePath

                }).catch(err => {
                    console.log(err);

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
                    _service.upload(this.post.postId,formData )
                    .then(res => {
                        console.log(res.data);
                        this.$toast.success('successfully uploaded');
                    }).catch(err =>{
                        console.log(err);
                        this.$toast.error('upload failed');
                    })
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