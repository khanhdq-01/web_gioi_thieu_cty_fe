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
import MapView from '../views/MapView.vue'
import RecruitmentView from '../views/RecruitmentView.vue'
import AddJob from '@/views/job/AddJob.vue'
import DeleteJob from '@/views/job/DeleteJob.vue'
import ChangeJob from '@/views/job/ChangeJob.vue'


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
      meta: { requiresAuth: false }, // Đảm bảo không yêu cầu đăng nhập
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
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/add-job',
      name: 'addJob',
      component: AddJob,
    },
    {
      path: '/change-job',
      name: 'changeJob',
      component: ChangeJob,
    },
    {
      path: '/delete-job',
      name: 'deleteJob',
      component: DeleteJob,
    },
  ],
})

export default router
