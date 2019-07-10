import axios from '../config';
import { getdate } from '../../assets/js/common'

//根据学生id获取问题
export function getStudentIssue(page,s_uid){
  return axios.post('/student/issue/private',{page,s_uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].m_time = getdate(res.data.data[i].m_time,true);
    }
    return Promise.resolve(res.data)
  })
}

//发送问题
export function getAddQuesstion(m_describe,s_uid,t_uid,p_name){
  var m_time = new Date().getTime()
  return axios.post('/student/issue/addQuesstion',{m_describe,s_uid,t_uid,p_name,m_time}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].m_time = getdate(res.data.data[i].m_time,true);
    }
    return Promise.resolve(res.data)
  })
}
