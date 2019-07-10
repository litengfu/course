import axios from '../config';
import { getdate } from '../../assets/js/common'

//根据教师uid获取问题
export function getTeacherIssue(page,uid){
  return axios.post('/teacher/issue',{page:page,uid:uid}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].m_time = getdate(res.data.data[i].m_time,true);
    }
    return Promise.resolve(res.data)
  })
}

//教师发送解答

export function getSendAnswer(id,answer){
  return axios.post('/teacher/issue/answer',{id,answer}).then(function(res){
    return Promise.resolve(res.data)
  })
}

//公告
export function getAnnouncement(page){
  return axios.post('/teacher/issue/announcement',{page}).then(function(res){
    for (var i in res.data.data) {
      res.data.data[i].a_time = getdate(res.data.data[i].a_time,true);
    }
    return Promise.resolve(res.data)
  })
}
//添加公告
export function getAddAnnouncement(t_uid,a_describe){
  var a_time = new Date().getTime();
  return axios.post('/teacher/issue/addAnnouncement',{t_uid,a_time,a_describe}).then(function(res){
    return Promise.resolve(res.data)
  })
}