// eslint-disable-next-line no-unused-vars
import axios from 'axios'
//import store from '../store'

export default {

  async getUsers(data) {
    return await axios.get('/users',{
      params: data
    });
  },
  async getUser(id) {
    return await axios.get(`/users/${id}`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async createUser(formData){
    return await axios.post('/users',formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async updateUser(id,formData){
    return await axios.put(`/users/${id}`,formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async addRole(id,role){
    return await axios.get(`/users/${id}/role/${role}`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async deleteRole(id,role){
    return await axios.delete(`/users/${id}/role/${role}`,{},{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
//   async setPostVisible(id,flag){
//     return await axios.patch(`/posts/${id}`,[
//       {"op":"replace",
//       "path":"/Public",
//       "value":flag}
//     ],{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
//   },
  async upload(id,formData){
    return await axios.post(`/users/${id}/upload`,formData,{headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
  async changePassword(id,formData){
    return await axios.post(`/users/${id}/changePassword`,formData,{ headers:  { 'Authorization': `Bearer ${localStorage.getItem('token')}`}});
  },
 
  

 
}