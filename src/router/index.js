import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App'

const Home = () => import('../views/home/Home'); // 主页
const videoCourse = () => import('../views/videoCourse/videoCourse'); // 小视频
const Study = () => import('../views/study/study'); // 我的学习
const Mine = () => import('../views/mine/mine'); // 个人中心
const Search = () => import('../views/home/Search'); 
const CourseList = () => import('../views/course/courseList'); // 课程列表页
const CourseInner = () => import('../views/course/courseInner'); // 课程二级页
const CourseInfo = () => import('../views/courseInfo/courseInfo'); // 课程详情页
const Order = () => import('../views/order/order'); // 订单页
const EditAddress = () => import('../views/order/editAddress'); // 编辑地址
const SelectAddress = () => import('../views/order/selectAddress'); // 地址列表选择
const PayMent = () => import('../views/pay/payment'); // 订单支付页
const PayCheck = () => import('../views/pay/payCheck'); // 微信h5支付时手动查询页
const PayResult = () => import('../views/pay/payResult'); // 支付结果页
const StudyList = () => import('../views/study/studyList'); // 我的学习
const StudyInner = () => import('../views/study/studyInner'); // 我的学习二级页
const accountSet = () => import('../views/mine/accountSet'); // 个人中心账号设置
const orderList = () => import('../views/mine/orderList'); // 个人中心订单列表
const orderInner = () => import('../views/mine/orderInner'); // 个人中心订单列表二级页
const systemSet = () => import('../views/mine/systemSet'); // 个人中心系统设置
const changePassword = () => import('../views/mine/changePassword'); // 个人中心更改密码
const aboutUs = () => import('../views/mine/aboutUs'); // 个人中心关于我们
const Agreement = () => import('../views/mine/agreement'); // 个人中心用户协议
const UserNotice = () => import('../views/mine/userNotice'); // 个人中心用户须知
const Login = () => import('../views/login/login'); // 登录
const BindPhone = () => import('../views/login/bindPhone'); // 绑定手机
const BindCode = () => import('../views/login/bindCode'); // 绑定手机 验证码
const ForgetPassword = () => import('../views/login/forgetPassword'); // 找回密码
const SelectGrade = () => import('../views/login/selectGrade'); // 绑定年级

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
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
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
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/order/:courseid?',
    name: 'Order',
    component: Order,
    meta: {
      requireLogin: true,
      keepAlive: true
    },
  },
  {
    path: '/editaddress/:id?',
    name: 'EditAddress',
    component: EditAddress,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/selectaddress',
    name: 'SelectAddress',
    component: SelectAddress,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/payment/:sn',
    name: 'PayMent',
    component: PayMent,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/paycheck/:sn',
    name: 'PayCheck',
    component: PayCheck,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/payresult/:sn',
    name: 'PayResult',
    component: PayResult,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/studylist/:type',
    name: 'StudyList',
    component: StudyList,
    children: [
      {
        path: 'studystatus/:status?',
        name: 'StudyInner',
        component: StudyInner,
        meta: {
          requireLogin: true
        },
      },
      {
        path: 'studystatus',
        redirect: 'studystatus/1'
      },
      {
        path: '*',
        redirect: '404'
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
    path: '/forgetpassword',
    component: ForgetPassword,
    name: 'ForgetPassword'
  },
  {
    path: '/agreement',
    component: Agreement,
    name: 'Agreement'
  },
  {
    path: '/usernotice',
    component: UserNotice,
    name: 'UserNotice'
  },
  
  {
    path: '/selectgrade',
    component: SelectGrade,
    name: 'SelectGrade',
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/accountsetting',
    component: accountSet,
    name: 'accountSet',
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/orderlist',
    component: orderList,
    name: 'orderList',
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'state/:status?',
        component: orderInner,
        name: orderInner,
        meta: {
          requireLogin: true
        },
      },
      {
        path: '*',
        redirect: '404'
      }
    ]
  },
  {
    path: '/systemset',
    name: 'systemSet',
    component: systemSet,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/changepassword',
    name: 'changePassword',
    component: changePassword,
    meta: {
      requireLogin: true
    },
  },
  {
    path: '/aboutus',
    name: 'aboutUs',
    component: aboutUs
  },
  
  {
    path: '/404',
    name: 'Error',
    component: Error
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
