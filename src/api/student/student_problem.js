import axios from '../config';
import { getdate } from '../../assets/js/common'

//获取课题
export function getProblem(page, s_speciality) {
  return axios.post('/student/problem', { page, s_speciality }).then(function (res) {
    for (var i in res.data.data) {
      res.data.data[i].p_beginDate = getdate(res.data.data[i].p_beginDate);
      res.data.data[i].p_endDate = getdate(res.data.data[i].p_endDate);
    }
    return Promise.resolve(res.data)
  })
}
//添加课题
export function addProblem(info){
  return axios.post('/student/problem/addProblem',info).then(function(res){
    return Promise.resolve(res.data)
  })
}
//加入课题
export function getAdd(p_name,t_uid,s_uid,c_beginTime,c_endTime){
  return axios.post('/student/problem/add',{p_name,t_uid,s_uid,c_beginTime,c_endTime}).then(function(res){
    return Promise.resolve(res.data)
  })
}
//课题详情
export function detail(c_id) {
  return axios.post('/student/problem/detail', { c_id }).then(function (res) {
    res.data.data.p_beginTime = res.data.data.p_beginDate;
    res.data.data.p_endTime= res.data.data.p_endDate;
    res.data.data.p_beginDate = getdate(res.data.data.p_beginDate);
    res.data.data.p_endDate = getdate(res.data.data.p_endDate);
    return Promise.resolve(res.data)
  })
}