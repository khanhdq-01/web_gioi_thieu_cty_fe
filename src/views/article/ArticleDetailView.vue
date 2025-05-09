<template>
  <NavBar :name="userName" />

  <section class="hero-details">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Failed to load article.</div>
    <div v-else-if="articleData">
      <div class="article-details">
        <h3>Chi tiết bài viết</h3>
      </div>

      <div class="article-item">
        <div class="article-image-details" v-if="articleData.image">
          <img :src="url + articleData.image" class="article-image" :alt="articleData.name" loading="lazy" />
          <p class="image-caption">{{ articleData.name }} Image</p>
        </div>
        <div class="article-text-details">
          <h5 class="article-name">{{ articleData.name }}</h5>
          <div class="article-description" v-html="articleData.description"></div>
        </div>
      </div>

      <div class="action-buttons mb-3">
        <router-link to="/article" class="btn btn-secondary ms-2" aria-label="Back to articles">Quay lại</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      articleData: null,
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/articles/',
      userName: localStorage.getItem('name') || '',
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchArticleData();
  },
  methods: {
    async fetchArticleData() {
      this.isLoading = true;
      this.error = null;
      const token = localStorage.getItem("token");
      const articleId = this.$route.params.articleId;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/article/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.articleData = response.data.data || response.data; // Handle nested data
        console.log("Article fetched:", this.articleData);
      } catch (error) {
        console.error("Error fetching article data:", error);
        this.error = error.message || 'Failed to load article';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
/* article-details.css */
.hero-details {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e0e7ff 100%); /* Light tech gradient */
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: #1a1a1a;
}

/* Particle Background */
.hero-details::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(125, 211, 252, 0.1) 2px, transparent 2px);
  background-size: 30px 30px;
  animation: float 15s infinite linear;
  opacity: 0.2;
  z-index: 0;
}

@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-30px); }
}

/* Loading and Error States */
.loading, .error {
  text-align: center;
  padding: 4rem;
  font-size: 1.5rem;
  color: #f9a8d4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e0e7ff 100%);
  position: relative;
  z-index: 1;
}

/* Title Section */
.article-details {
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 1;
}

/* Neon Underline */
.article-details h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #7dd3fc, #f9a8d4, transparent);
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(125, 211, 252, 0.5);
  animation: glowPulse 2s infinite ease-in-out;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeInGlow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 15px rgba(125, 211, 252, 0.5); }
  50% { box-shadow: 0 0 25px rgba(125, 211, 252, 0.8); }
}

/* Content Section */
.article-item {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95); /* Glassmorphism */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(125, 211, 252, 0.3);
  padding: 2rem;
  animation: floatIn 1s ease-out;
  position: relative;
  z-index: 1;
}

/* Image Section */
.article-image-details {
  width: 100%;
  margin-bottom: 2rem;
  overflow: hidden;
  border-radius: 15px;
  position: relative;
  transition: transform 0.5s ease;
}

.article-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-image-details:hover .article-image {
  transform: scale(1.05);
}

.image-caption {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 0.5rem;
  animation: fadeInText 1.6s ease-out;
}

/* Text Section */
.article-text-details {
  padding: 1rem;
}

.article-name {
  font-size: 2.2rem;
  font-weight: 700;
  color: #7dd3fc;
  text-shadow: 0 0 8px rgba(125, 211, 252, 0.3);
  margin-bottom: 1.5rem;
  animation: fadeInText 1.2s ease-out;
  line-height: 1.3;
}

.article-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  animation: fadeInText 1.4s ease-out;
  text-align: justify;
}

.article-description :deep(h1, h2, h3, h4, h5, h6) {
  color: #7dd3fc;
  margin: 1rem 0;
  font-weight: 600;
}

.article-description :deep(p) {
  margin: 0.5rem 0;
}

.article-description :deep(ul, ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.article-description :deep(img) {
  max-width: 100%;
  border-radius: 10px;
  margin: 1rem 0;
}

/* Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

.btn-secondary, .btn-primary {
  display: inline-block;
  padding: 0.8rem 2rem;
  color: #1a1a1a;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #7dd3fc, #f9a8d4);
}

.btn-secondary:hover, .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(125, 211, 252, 0.7);
}

.btn-secondary::before, .btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn-secondary:hover::before, .btn-primary:hover::before {
  width: 200px;
  height: 200px;
}

/* Animations */
@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-details {
    padding: 2rem 1rem;
  }

  .article-details h3 {
    font-size: 2.5rem;
  }

  .article-details h3::after {
    width: 150px;
  }

  .article-item {
    padding: 1.5rem;
  }

  .article-image-details {
    max-height: 300px;
  }

  .article-name {
    font-size: 1.8rem;
  }

  .article-description {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }

  .btn-secondary, .btn-primary {
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .article-details h3 {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .article-details h3::after {
    width: 120px;
  }

  .article-item {
    padding: 1rem;
  }

  .article-image-details {
    max-height: 250px;
  }

  .article-name {
    font-size: 1.6rem;
  }

  .article-description {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}
</style>