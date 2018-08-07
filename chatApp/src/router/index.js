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
      {path:'',component:HomeMessages},
      {path:'messages',component:HomeMessages},
      {path:'friends',component:HomeFriends},
      {path:'groups',component:HomeGroups},
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
    path:'/chat/:target',
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
