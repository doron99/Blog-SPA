
import axios from 'axios'
//import store from '../store'
axios.defaults.headers.post["Content-Type"] = "application/json";

 //const token = localStorage.getItem("token") != null ? localStorage.getItem("token"):"";
 //const headers = { headers:  { 'Authorization': `Bearer ${store.getters.getToken}`}};
 //const headersData ={headers: { 'Content-Type': 'multipart/form-data',
 //                               'Authorization': `Bearer ${store.getters.getToken}`}}
export default {
  register(formData) {
    return axios.post('/auth/register', formData);
  },
  login(formData) {
    return axios.post('/auth/login',formData);
  },

  getPosts() {
    return axios.get('/posts');
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
  async createComment(id,formData){

    return await axios.post(`/posts/${id}/comments`,formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async getComments(id){
    return await axios.get(`/posts/${id}/comments`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async upload(id,formData){
    return await axios.post(`/posts/${id}/upload`,formData,{headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  }

 
}