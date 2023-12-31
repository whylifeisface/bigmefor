import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login/index.vue'
import MainView from '../views/main/index.vue'
import ArticleCategory from '../views/article/ArticleCategory.vue'
import ArticleManger from '../views/article/ArticleManger.vue'
import UserInfo from '../views/user/UserInfo.vue'
import UserAvatar from '../views/user/UserAvatar.vue'
import UserResetPassword from '../views/user/UserResetPassword.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/ts/register',
      name: 'register-ts',
      component: import('../views/ts/Login/LoginIndex.vue')
    },
    {
      path: '/ts/login',
      name: 'login-ts',
      component: import('../views/ts/Login/LoginIndex.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/article/manger',
          component: ArticleManger
        },
        {
          path: '/article/category',
          component: ArticleCategory
        },
        {
          path: '/user/info',
          component: UserInfo
        },
        {
          path: '/user/resetpassword',
          component: UserResetPassword
        },
        {
          path: '/user/avatar',
          component: UserAvatar
        },
      ]
    },
    {
      path: '/main/ts',
      name: 'main-ts',
      component:  import('../views/ts/main/MainIndex.vue'),
      children: [
        {
          path: '/ts/article/manger',
          component: import('../views/ts/article/ArticleManger.vue'),
        },
        {
          path: '/ts/article/category',
          component: import('../views/ts/article/ArticleCategory.vue'),
        },
        {
          path: '/ts/user/info',
          component: import('../views/ts/user/UserInfo.vue'),
        },
        {
          path: '/ts/user/resetpassword',
          component: import('../views/ts/user/UserResetPassword.vue'),
        },
        {
          path: '/ts/user/avatar',
          component: import('../views/ts/user/UserAvatar.vue'),
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
