import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'

Vue.use(Router)

const routes=[
  {
    path: '/',
    name: 'home',
    component: Home
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
  }
]


export default 
()=>new Router({
  mode:'history',
  routes
})
