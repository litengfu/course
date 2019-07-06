import axios from '../config';
import ajax from 'axios';
import { getdate } from '../../assets/js/common'
var instance = ajax.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  responseType: "json",
});
//学生自拟课题
export function getStudentProblem(page,s_uid){
  return axios.post('/student/personal/own_problem',{page,s_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].d_beginTime = getdate(res.data.data[i].d_beginTime);
      res.data.data[i].d_endTime = getdate(res.data.data[i].d_endTime);
    }
    return Promise.resolve(res.data)
  })
}

//最终课题
export function getFinallyProblem(s_uid) {
  return axios.post('/student/personal/finally',{s_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].c_beginTime = getdate(res.data.data[i].c_beginTime);
      res.data.data[i].c_endTime = getdate(res.data.data[i].c_endTime);
    }
    return Promise.resolve(res.data)
  })
}
//上传图片
export function uploadFilds(formDate){
  return instance.post('/student/personal/img',formDate);
}

//修改密码
export function getSetPassword(s_uid,oldPassword,newPassword){
  return axios.post('/student/personal/setPassword',{s_uid,oldPassword,newPassword}).then(function(res){
    return Promise.resolve(res.data)
  })
}
//已选课题
export function getAlready(s_uid){
  return axios.post('/student/personal/already',{s_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].c_beginTime = getdate(res.data.data[i].c_beginTime);
      res.data.data[i].c_endTime = getdate(res.data.data[i].c_endTime);
    }
    return Promise.resolve(res.data)
  })
}

//预约答辩
export function getReserveTime(s_uid,p_name,c_reserveTime,c_beginTime){
  return axios.post('/student/personal/reserveTime',{s_uid,p_name,c_reserveTime,c_beginTime}).then(function(res){
    return Promise.resolve(res.data)
  })
}