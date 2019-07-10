import {getTeacher, getStudent} from '../api/users'
const mutations = {
  setTeacher(state){
    state.teacher = getTeacher()
  },
  setStudent(state){
    state.student = getStudent()
  }
}

export default mutations