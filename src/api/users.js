import axios from './config';

export function getTeacher(){
  return axios.get('/users/getUser_teacher').then(function(res){
    if (res.data.code == 0){
      return Promise.resolve(res.data.user)
    } else{
      return Promise.resolve({})
    }
  })
}

export function getStudent(){
  return axios.get('/users/getUser').then(function(res){
    if (res.data.code == 0){
      return Promise.resolve(res.data.user)
    } else{
      return Promise.resolve({})
    }
  })
}

export function getExit(){
  return axios.get('/users/exit').then(function(res){
    return Promise.resolve(res.data)
  })
}