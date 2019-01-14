import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login'
import NotFound from '@/components/404/NotFound'
// 修改为按需加载的方式
const Home = () => import('@/components/home/Home')
const Users = () => import('@/components/users/Users')
const Roles = () => import('@/components/roles/Roles')
const Rights = () => import('@/components/rights/Rights')
const Categories = () => import('@/components/categories/Categories')
const Goods = () =>import('@/components/goods/Goods')
const GoodsAdd = () => import('@/components/goods-add/GoodsAdd')
// import Home from '@/components/home/Home'
// import Users from '@/components/users/Users'
// import Roles from '@/components/roles/Roles'
// import Rights from '@/components/rights/Rights'
// import Categories from '@/components/categories/Categories'
// import Goods from '@/components/goods/Goods'
// import GoodsAdd from '@/components/goods-add/GoodsAdd'
// 安装插件
Vue.use(VueRouter)
// 创建路由实例,并导出
const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [{
        path: '/users',
        component: Users
      }, {
        path: '/roles',
        component: Roles
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/categories',
        component: Categories
      },{
        path: '/goods/:page?',
        component:Goods
      },{
        path:'/goods-add',
        component:GoodsAdd
      }
    ]
    },
    {
      path:'*',
      component:NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  /*
    登录访问控制的思路：
    1 判断访问的是不是登录页面
    2 如果是，直接 next() 放行
    3 如果不是，就判断有没有登录
    4 如果没有登录，就跳转到登录页面，让用户登录
    5 如果登录了，就直接 next() 放行
  */
  if (to.path === '/login') {
    next()
    return
  }

  const token = localStorage.getItem('token')
  if (token) {
    // 登录
    next()
  } else {
    // 没有登录
    next('/login')
  }
})
export default router
