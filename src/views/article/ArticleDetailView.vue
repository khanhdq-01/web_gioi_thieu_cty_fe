<template>
  <NavBar :name="userName" />

  <section class="hero-details" v-if="articleData">
    <div class="article-details">
      <h3>Chi tiết bài viết</h3>
    </div>

    <div class="article-item">
      <div class="article-image-details" v-if="articleData.image">
        <img :src="url + articleData.image" class="article-image" />
      </div>
      <div class="article-text-details">
        <h5 class="article-name">{{ articleData.name }}</h5>
        <p class="article-description">{{ articleData.description }}</p>
      </div>
    </div>

    <div class="mb-3">
      <router-link to="/article" class="btn btn-secondary ms-2">Quay lại</router-link>
    </div>
  </section>
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
      articleData: null, // ban đầu là null
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/articles/',
      userName: localStorage.getItem('name') || '',
    };
  },
  mounted() {
    this.fetchArticleData();
  },
  methods: {
    async fetchArticleData() {
      const token = localStorage.getItem("token");
      const articleId = this.$route.params.articleId;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/article/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.articleData = response.data;
        console.log("Article fetched:", this.articleData);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    },
  },
};
</script>
