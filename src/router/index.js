import { createRouter, createWebHistory } from 'vue-router'
import Home from 'views/home/Home.vue'
const Category = () => import('../views/category/Category')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category', 
    // 懒加载
    component: Category
  },{
    path: '/cart',
    name: 'Cart',
    component: () => import('views/cart/Cart.vue')
  },{
    path: '/profile',
    name: 'Profile',
    component: () => import('views/profile/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
