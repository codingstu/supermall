import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('views/home/home') 
const category = ()=>import('views/category/category') 
const shopcart = ()=>import('views/shopcart/shopcart') 
const profile = ()=>import('views/profile/profile') 

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/shopcart',
    component:shopcart
  },
  {
    path:'/profile',
    component:profile
  }
]

const router = new VueRouter({
  routes
})

export default router
