<template>
    <NavBar :name="userName" />
    <section class="achievement">
    <div class="achievement-heading  text-center">
      <h3>ア会社です。</h3>
    </div>
    <div class="achievement-list-container">
      <div v-for="achievement in achievementData" :key="achievement.id" class="project-card">
        <div class="project-image-wrapper">
          <img v-if="achievement.image_path" :src="url + achievement.image_path" class="project-image" />
          <div class="project-overlay">
            <div class="project-info">
              <h5>{{ achievement.title }}</h5>
              <p>{{ achievement.category }}</p>
              <p>{{ achievement.date }}</p>
              <p>{{ achievement.summary }}</p>
              <p>{{ achievement.description }}</p>
              <RouterLink
                :to="{ name: 'achievementDetail', params: { achievementId: achievement.id } }"
                class="btn btn-light btn-sm"
              >
                Xem chi tiết
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      v-if="isLoggedIn && userRole === 1"
      to="/achievement-list"
      class="btn btn-primary"
      style="position: absolute; bottom: 20px; right: 20px;"
    >
      Manage achievements
    </router-link>
  </section>
  <CompanyHistory />
  <Footer />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import Footer from "@/views/home/Footer.vue";
import "@/assets/css/achievement.css";
import CompanyHistory from '@/views/companyhistory/CompanyHistoryView.vue';

export default {
  components: {
    NavBar,
    Footer,
    CompanyHistory,
  },
  data() {
    return {
      achievementData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/',
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchAchievementData();
  },
  methods: {
    async fetchAchievementData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/achievements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.achievementData = response.data.data;
      } catch (error) {
        console.error("Error fetching achievement data:", error);
      }
    },
  },
};
</script>