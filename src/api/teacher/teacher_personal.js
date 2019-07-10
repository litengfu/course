import axios from '../config';
import ajax from 'axios';
import { getdate } from '../../assets/js/common';

var instance = ajax.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  responseType: "json",
});

//获取教师发布课题
export function getPersonalProblem(page,t_uid){
  return axios.post('/teacher/personal/problem',{page,t_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].p_beginDate = getdate(res.data.data[i].p_beginDate);
      res.data.data[i].p_endDate = getdate(res.data.data[i].p_endDate);
    }
    return Promise.resolve(res.data)
  })
}

//学生自拟课题
export function getStudentProblem(page,t_uid){
  return axios.post('/teacher/personal/student_problem',{page,t_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].d_beginTime = getdate(res.data.data[i].d_beginTime);
      res.data.data[i].d_endTime = getdate(res.data.data[i].d_endTime);
    }
    return Promise.resolve(res.data)
  })
}

//通过学生自拟的课题
export function getReview({d_beginTime,d_describe,d_endTime,d_name,s_speciality,s_uid,t_uid,t_name}){
  return axios.post('/teacher/personal/review',{
    d_beginTime,
    d_describe,
    d_endTime,
    d_name,
    d_status:2,
    s_speciality,
    s_uid,
    t_uid,
    t_name
  }).then(function(res){
    return Promise.resolve(res.data)
  })
}
export function getNoPass({d_beginTime,d_describe,d_endTime,d_name,s_speciality,s_uid,t_uid,t_name}){
  return axios.post('/teacher/personal/review',{
    d_beginTime,
    d_describe,
    d_endTime,
    d_name,
    d_status:1,
    s_speciality,
    s_uid,
    t_uid,
    t_name
  }).then(function(res){
    return Promise.resolve(res.data)
  })
}

//修改手机号
export function getSetCellphone(t_uid,t_cellphone){
  return axios.post('/teacher/personal/cellphone',{t_uid,t_cellphone}).then(function(res){
    return Promise.resolve(res.data)
  })
}

//上传图片
export function uploadFilds(formDate){
  return instance.post('/teacher/personal/img',formDate);
}

//修改密码
export function getSetPassword(t_uid,oldPassword,newPassword){
  return axios.post('/teacher/personal/setPassword',{t_uid,oldPassword,newPassword}).then(function(res){
    return Promise.resolve(res.data)
  })
}
//学生答辩
export function getReserve(page,t_uid){
  return axios.post('/teacher/personal/reserve',{t_uid,page}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].c_beginTime = getdate(res.data.data[i].c_beginTime);
      res.data.data[i].c_endTime = getdate(res.data.data[i].c_endTime);
      res.data.data[i].c_reserveTime = getdate(res.data.data[i].c_reserveTime,2);
    }
    return Promise.resolve(res.data)
  })
}
//确认学生答辩时间
export function getReserveConfirm({s_uid,p_name,c_reserveTimeStatus,c_beginTime}){
  return axios.post('/teacher/personal/reserveConfirm',{s_uid,p_name,c_reserveTimeStatus,c_beginTime}).then(function(res){
    return Promise.resolve(res.data)
  })
}