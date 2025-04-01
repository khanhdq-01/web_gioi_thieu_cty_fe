import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ArticleDetailView from '../views/article/ArticleDetailView.vue'
import ArticleView from '../views/article/ArticleView.vue'
import ArticleList from '../views/article/ArticleList.vue'
import ArticleForm from '../views/article/ArticleForm.vue'
import JobList from '../views/job/JobList.vue'
import JobForm from '../views/job/JobForm.vue'
import AchievementDetailView from '../views/achievement/AchievementDetailView.vue'
import AchievementView from '../views/achievement/AchievementView.vue'
import AchievementList from '../views/achievement/AchievementList.vue'
import AchievementForm from '../views/achievement/AchievementForm.vue'
import CompanyBlog from '../views/home/CompanyBlog.vue'
import UserInforView from '../views/UserInforView.vue'
import MapView from '../views/map/MapView.vue'
import RecruitmentView from '../views/job/RecruitmentView.vue'
import SlideList from '../views/home/slides/SlideList.vue'
import SlideForm from '../views/home/slides/SlideForm.vue'
import AboutList from '../views/home/abouts/AboutList.vue'
import AboutForm from '../views/home/abouts/AboutForm.vue'
import MemberList from '../views/home/members/MemberList.vue'
import MemberForm from '../views/home/members/MemberForm.vue'
import CompanyList from '../views/home/company/CompanyList.vue'
import CompanyForm from '../views/home/company/CompanyForm.vue'
import CompanyInforForm from '@/views/companyinfors/CompanyInforForm.vue'
import CompanyInforList from '@/views/companyinfors/CompanyInforList.vue'
import CompanyHistoryForm from '@/views/companyhistory/CompanyHistoryForm.vue'
import CompanyHistoryList from '@/views/companyhistory/CompanyHistoryList.vue'

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
      path: '/article',
      name: 'articleView',
      component: ArticleView,
    },
    {
      path: '/article/:articleId',
      name: 'articleDetail',
      component: ArticleDetailView,
    },
    {
      path: '/article-list',
      name: 'articleList',
      component: ArticleList,
    },
    {
      path: '/articles/add',
      name: 'add-article',
      component: ArticleForm
    },
    {
      path: '/articles/edit/:id',
      name: 'edit-article',
      component: ArticleForm,
      props: route => ({ isEdit: true, articleId: route.params.id })
    },

    {
      path: '/job-list',
      name: 'jobList',
      component: JobList,
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: JobForm
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: JobForm,
      props: route => ({ isEdit: true, jobId: route.params.id })
    },

    {
      path: '/achievement',
      name: 'achievementView',
      component: AchievementView,
    },
    {
      path: '/achievement/:achievementId',
      name: 'achievementDetail',
      component: AchievementDetailView,
    },
    {
      path: '/achievement-list',
      name: 'achievementList',
      component: AchievementList,
    },
    {
      path: '/achievement/add',
      name: 'add-achievement',
      component: AchievementForm
    },
    {
      path: '/achievement/edit/:id',
      name: 'edit-achievement',
      component: AchievementForm,
      props: route => ({ isEdit: true, achievementId: route.params.id })
    },
    {
      path: '/user-infor',
      name: 'userInfor',
      component: UserInforView,
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
      path: '/company-blog',
      name: 'companyBlog',
      component: CompanyBlog,
    },
    {
      path: '/slide-list',
      name: 'slideList',
      component: SlideList,
    },
    {
      path: '/slides/add',
      name: 'add-slide',
      component: SlideForm
    },
    {
      path: '/slides/edit/:id',
      name: 'edit-slide',
      component: SlideForm,
      props: route => ({ isEdit: true, slideId: route.params.id })
    },

    {
      path: '/about-list',
      name: 'aboutList',
      component: AboutList,
    },
    {
      path: '/abouts/add',
      name: 'add-about',
      component: AboutForm
    },
    {
      path: '/abouts/edit/:id',
      name: 'edit-about',
      component: AboutForm,
      props: route => ({ isEdit: true, aboutId: route.params.id })
    },

    {
      path: '/company-infor-list',
      name: 'companyInforList',
      component: CompanyInforList,
    },
    {
      path: '/company-infor-form/add',
      name: 'add-company-infor-form',
      component: CompanyInforForm,
    },
    {
      path: '/company-infor-form/edit/:id',
      name: 'edit-company-infor-form',
      component: CompanyInforForm,
      props: route => ({ isEdit: true, companyInforId: route.params.id })
    },

    {
      path: '/company-history-list',
      name: 'companyHistoryList',
      component: CompanyHistoryList,
    },
    {
      path: '/company-history-form/add',
      name: 'add-company-history-form',
      component: CompanyHistoryForm,
    },
    {
      path: '/company-history-form/edit/:id',
      name: 'edit-company-history-form',
      component: CompanyHistoryForm,
      props: route => ({ isEdit: true, companyHistoryId: route.params.id })
    },

    {
      path: '/member-list',
      name: 'memberList',
      component: MemberList,
    },
    {
      path: '/members/add',
      name: 'add-member',
      component: MemberForm
    },
    {
      path: '/members/edit/:id',
      name: 'edit-member',
      component: MemberForm,
      props: route => ({ isEdit: true, memberId: route.params.id })
    },

    {
      path: '/company-profile-list',
      name: 'company-profile-list',
      component: CompanyList,
    },
    {
      path: '/companys/add',
      name: 'add-company',
      component: CompanyForm
    },
    {
      path: '/companys/edit/:id',
      name: 'edit-company',
      component: CompanyForm,
      props: route => ({ isEdit: true, companyId: route.params.id })
    },


    {
    path: '/apply/:jobId',
    name: 'application',
    component: () => import('@/views/job/ApplicationView.vue'),
    props: true
    },
    {
      path: '/applications/job/:jobId',
      name: 'job-applications',
      component: () => import('@/views/job/JobApplications.vue'),
      props: true
    }
  
  ],
})

export default router
