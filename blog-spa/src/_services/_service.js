// eslint-disable-next-line no-unused-vars
import axios from 'axios'
//import store from '../store'


 //const token = localStorage.getItem("token") != null ? localStorage.getItem("token"):"";
 //const headers = { headers:  { 'Authorization': `Bearer ${store.getters.getToken}`}};
 //const headersData ={headers: { 'Content-Type': 'multipart/form-data',
 //                               'Authorization': `Bearer ${store.getters.getToken}`}}



 /////-------------- AUTHENTICATION ----------------////////
export default {
  register(formData) {
    return axios.post('/auth/register', formData);
  },
  login(formData) {
    return axios.post('/auth/login',formData);
  },
 /////-------------- POSTS ----------------////////

  getPosts(data) {
    return axios.get('/posts',{
      params: data
    });
  },
  async getPost(id) {
    return await axios.get(`/posts/${id}`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async createPost(formData){
    return await axios.post('/posts',formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async UpdatePost(id,formData){
    return await axios.put(`/posts/${id}`,formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async setPostVisible(id,flag){
    return await axios.patch(`/posts/${id}`,[
      {"op":"replace",
      "path":"/Public",
      "value":flag}
    ],{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async upload(id,formData){
    return await axios.post(`/posts/${id}/upload`,formData,{headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
 /////-------------- COMMENTS ----------------////////

  async createComment(id,formData){
    return await axios.post(`/posts/${id}/comments`,formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async getComments(id){
    return await axios.get(`/posts/${id}/comments`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async updateComment(postid,commentid,content){
    return await axios.patch(`/posts/${postid}/comments/${commentid}`,[
      {"op":"replace",
      "path":"/content",
      "value":content}
    ],{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async deleteComment(postid,commentid){

    return await axios.delete(`/posts/${postid}/comments/${commentid}`,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  

 
}