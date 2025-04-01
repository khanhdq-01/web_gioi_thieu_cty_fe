<template>
    <NavBar :name="userName" />
    <div class="article">
  <div class="article-heading text-center">
    <h3>ア会社です。</h3>
  </div>
  <div class="article-list-container">
    <div v-for="article in articleData" :key="article.id" class="project-article-card">
      <div class="project-article-image-wrapper">
        <img v-if="article.image" :src="url + article.image" class="project-article-image" />
      </div>
      <div class="project-article-title">
        <h5>{{ article.name }}</h5>
      </div>
      <div class="project-article-overlay">
        <div class="project-article-info">
          <h5>{{ article.name }}</h5>
          <p>{{ article.description }}</p>
          <RouterLink
            :to="{ name: 'articleDetail', params: { articleId: article.id } }"
            class="btn btn-light btn-sm"
          >
            Xem chi tiết
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <router-link
    v-if="isLoggedIn && userRole === 1"
    to="/article-list"
    class="manage-articles-btn"
  >
    Manage articles
  </router-link>
</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import "@/assets/css/articlehome.css";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      articleData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/articles/',
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchArticleData();
  },
  methods: {
    async fetchArticleData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/article", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Article data fetched:", response.data.data);
        this.articleData = response.data.data;
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    },
  },
};
</script>