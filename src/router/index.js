import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App'

const Home = () => import('../views/home/Home'); // 主页
const videoCourse = () => import('../views/videoCourse/videoCourse'); // 小视频
const Study = () => import('../views/study/study'); // 我的学习
const Mine = () => import('../views/mine/mine'); // 个人中心
const CourseList = () => import('../views/course/courseList'); // 课程列表页
const CourseInner = () => import('../views/course/courseInner'); // 课程二级页
const CourseInfo = () => import('../views/courseInfo/courseInfo'); // 课程详情页
const Login = () => import('../views/login/login'); // 登录
const BindPhone = () => import('../views/login/bindPhone'); // 绑定手机
const BindCode = () => import('../views/login/bindCode'); // 绑定手机 验证码
const ForgotPassword = () => import('../views/login/forgotPassword'); // 找回密码
const SelectGrade = () => import('../views/login/selectGrade'); // 绑定年级
const Agreement = () => import('../views/mine/agreement'); // 用户协议
const Error = () => import('../views/error/error'); // 404

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/video',
    name: 'Video',
    component: videoCourse,
  },
  {
    path: '/study',
    name: 'Study',
    component: Study,
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
  },
  {
    path: '/courselist/:type?',
    name: 'CourseList',
    component: CourseList,
    children: [
      {
        path: 'grade/:level?/subject/:kind?',
        name: 'CourseInner',
        component: CourseInner,
      },
      {
        path: '*',
        redirect: '404'
      }
    ]
  },
  {
    path: '/courseinfo/:id',
    name: 'CourseInfo',
    component: CourseInfo,
    // meta: {
    //   requireLogin: true
    // },
  },
  {
    path: '/about/:id',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'mine/:user',
        name: 'mine',
        component: Mine,
        meta: {
          requireLogin: true
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: [
      {
        path: '*',
        redirect: '/login',
      }
    ]
  },
  {
    path: '/bindphone',
    component: BindPhone,
    name: 'BindPhone',
    children: [
      {
        path: 'code',
        component: BindCode,
        name: BindCode
      }
    ]
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    name: 'ForgotPassword'
  },
  {
    path: '/agreement',
    component: Agreement,
    name: 'Agreement'
  },
  {
    path: '/selectgrade',
    component: SelectGrade,
    name: 'SelectGrade'
  },
  {
    path: '404',
    name: 'Error',
    component: Error
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
