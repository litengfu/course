import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () => import('../pages/login')
//教师
const teacherHome = () => import('../pages/teacher/home/teacherHome')
const teacherProblem = () => import('../pages/teacher/problem/teacher_problem')
const addProblem = () => import('../pages/teacher/addProblem/addProblem')
const teacherIssue = () => import('../pages/teacher/issue/teacher_issue')
const teacherPersonal = () => import('../pages/teacher/personal/teacher_personal')
const teacherDetail = () => import('../pages/teacher/detail/teacher_detail')
const account = () => import('../pages/teacher/account/account')
const own = () => import('../pages/teacher/own/own')
const other = () => import('../pages/teacher/other/other_problem')
const teacher_announcement = () => import('../pages/teacher/announcement/announcement')
const teacher_reserve = () => import('../pages/teacher/reserve/reserve')
const teacherInfo = () => import('../pages/teacher/teacherInfo/teacherInfo')
//学生
const studentHome = () => import('../pages/student/home/studentHome')
const studentProblem = () => import('../pages/student/problem/problem')
const studentIssue = () => import('../pages/student/issue/issue')
const studentPersonal = () => import('../pages/student/personal/personal')
const studentAccount = () => import('../pages/student/account/account')
const studentOwn = () => import('../pages/student/own/own')
const studentFinally = () => import('../pages/student/finally/finally')
const studentDetail = () => import('../pages/student/detail/student_detail')
const studentAddProblem = () => import('../pages/student/addProblem/addProblem')
const ownDetail = () => import('../pages/student/ownDetail/ownDetail')
const studentAlready = () => import('../pages/student/already/already')
const student_announcement = () => import('../pages/student/announcement/announcement')
var routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/student',
    component: studentHome,
    children: [
      {
        path: 'problem',
        component: studentProblem,
        children: [
          {
            path: ':id',
            component: studentDetail
          }
        ]
      },
      {
        path: 'announcement',
        component: student_announcement
      },
      {
        path: 'addProblem',
        component: studentAddProblem
      },
      {
        path: 'issue',
        component: studentIssue
      },
      {
        path: 'personal',
        component: studentPersonal,
        children: [
          {
            path: 'account',
            component: studentAccount
          },
          {
            path: 'own',
            component: studentOwn
          },
          {
            path: 'finally',
            component: studentFinally,
            children: [
              {
                path: ':id',
                component: ownDetail
              }
            ]
          },
          {
            path:'already',
            component: studentAlready,
          }
        ]
      },
      {
        path: '*',
        component: studentProblem
      }
    ]
  },
  {
    path: '/teacher',
    component: teacherHome,
    children: [
      {
        path: 'problem',
        component: teacherProblem,
        children: [
          {
            path: ':id',
            component: teacherDetail
          }
        ]
      },
      {
        path: 'announcement',
        component: teacher_announcement
      },
      {
        path: 'addProblem',
        component: addProblem
      },
      {
        path: 'issue',
        component: teacherIssue
      },
      {
        path: 'personal',
        component: teacherPersonal,
        children: [
          {
            path: 'account',
            component: account
          },
          {
            path: 'own',
            component: own
          },
          {
            path: 'other',
            component: other
          },
          {
            path: 'reserve',
            component:teacher_reserve
          }
        ]
      },
      {
        path:'teacherInfo/:uid',
        component:teacherInfo
      },
      {
        path: '*',
        component: teacherProblem
      }
    ]
  }
]
export default new Router({ routes })