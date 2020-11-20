import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('views/home/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home.vue')
  },
  {
    path: '/category',
    name: 'Cate', 
    // 懒加载
    component: () => import('views/category/Cate.vue')
  },{
    path: '/cart',
    name: 'Cart',
    component: () => import('views/cart/Cart.vue')
  },{
    path: '/profile',
    name: 'Profile',
    component: () => import('views/profile/Profile.vue')
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: () => import('views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
