import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import Chat from '@/components/Chat'
import HomeMessages from '@/components/Home.Messages'
import HomeFriends from '@/components/Home.Friends'
import HomeGroups from '@/components/Home.Groups'

Vue.use(Router)

const routes=[
  {
    path: '/home',
    component: Home,
    children:[
      {path:'',component:HomeMessages,name:'messages'},
      {path:'friends',component:HomeFriends,name:'friends'},
      {path:'groups',component:HomeGroups,name:'groups'},
    ]
  },
  {
    path:'/signup',
    name:'signup',
    component:SignUp
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path:'/chat/:target/:username',
    props:true,
    name:'chat',
    component:Chat
  },
  {
    path: '*',
    redirect: '/home'
  }
]


export default 
()=>new Router({
  mode:'history',
  routes
})
