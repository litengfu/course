import {getTeacher, getStudent} from '../api/users'
const state = {
  teacher:getTeacher(),
  student:getStudent()
}
export default state