import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import ArticleView from '../views/ArticleView.vue'
import ArticleUpdateView from '../views/ArticleUpdateView.vue'
import ArticleAddView from '../views/ArticleAddView.vue'
import ArticleListView from '../views/ArticleListView.vue'
import UserInforView from '../views/UserInforView.vue'
import CompanyProfileView from '../views/CompanyProfileView.vue'
import AchievementsView from '../views/AchievementsView.vue'
import RecruitmentView from '../views/RecruitmentView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/article/:articleId',
      name: 'articleDetail',
      component: ArticleDetailView,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/article/:articleId',
      name: 'articleUpdate',
      component: ArticleUpdateView,
    },
    {
      path: '/article-add',
      name: 'articleAdd',
      component: ArticleAddView,
    },
    {
      path: '/article-list',
      name: 'articleList',
      component: ArticleListView,
    },
    {
      path: '/company-profile',
      name: 'companyProfile',
      component: CompanyProfileView,
    },
    {
      path: '/user-infor',
      name: 'userInfor',
      component: UserInforView,
      meta: { requiresAuth: true }
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: AchievementsView,
    },
    {
      path: '/recruitment',
      name: 'recruitment',
      component: RecruitmentView,
    },
  ],
})

export default router
