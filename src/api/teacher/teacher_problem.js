import axios from '../config';
import { getdate } from '../../assets/js/common'

//获取课题
export function getProblem(page) {
  return axios.post('/teacher/problem', { page }).then(function (res) {
    for (var i in res.data.data) {
      res.data.data[i].p_beginDate = getdate(res.data.data[i].p_beginDate);
      res.data.data[i].p_endDate = getdate(res.data.data[i].p_endDate);
    }
    return Promise.resolve(res.data)
  })
}

//课题详情
export function detail(id) {
  return axios.post('/teacher/problem/detail', { id }).then(function (res) {
    res.data.data.p_beginTime = res.data.data.p_beginDate;
    res.data.data.p_endTime= res.data.data.p_endDate;
    res.data.data.p_beginDate = getdate(res.data.data.p_beginDate);
    res.data.data.p_endDate = getdate(res.data.data.p_endDate);
    return Promise.resolve(res.data)
  })
}
//选择该课题的学生
export function choose_student(name,p_beginTime,p_endTime) {
  return axios.post('/teacher/problem/choose_student', { name,p_beginTime,p_endTime}).then(function (res) {
    for (var i in res.data.data) {
      res.data.data[i].c_beginTime = getdate(res.data.data[i].c_beginTime);
      res.data.data[i].c_endTime = getdate(res.data.data[i].c_endTime);
    }
    return Promise.resolve(res.data)
  })
}

//最终确定学生

export function finally_student(name,p_beginTime,p_endTime) {
  return axios.post('/teacher/problem/finally_student', { name,p_beginTime,p_endTime }).then(function (res) {
    for (var i in res.data.data) {
      res.data.data[i].c_beginTime = getdate(res.data.data[i].c_beginTime);
      res.data.data[i].c_endTime = getdate(res.data.data[i].c_endTime);
      if (res.data.data[i].c_reserveTime == null || res.data.data[i].c_reserveTime==0) {
        res.data.data[i].c_reserveTime = ''
      } else {
        res.data.data[i].c_reserveTime = getdate(res.data.data[i].c_reserveTime,2);
      }
    }
    return Promise.resolve(res.data)
  })
}

//教师确认课题学生
export function confirmStudent({p_name, s_uid, c_status, c_beginTime}) {
  return axios.post('/teacher/problem/confirm', { p_name, s_uid, c_status, c_beginTime }).then(function (res) {
    return Promise.resolve(res.data)
  })
}

//添加课题
export function addProblem(info){
  return axios.post('/teacher/addProblem',info).then(function(res){
    return Promise.resolve(res.data)
  })
}

//评分
export function getAddGrade({s_uid,p_name,c_beginTime,c_endTime,h_grade}){
  return axios.post('/teacher/problem/addGrade',{s_uid,p_name,p_beginTime:c_beginTime,p_endTime:c_endTime,h_grade}).then(function(res){
    return Promise.resolve(res.data)
  })
}
//修改评分
export function getUpdateGrade({s_uid,p_name,c_beginTime,c_endTime,h_grade}){
  return axios.post('/teacher/problem/updateGrade',{s_uid,p_name,p_beginTime:c_beginTime,p_endTime:c_endTime,h_grade}).then(function(res){
    return Promise.resolve(res.data)
  })
}