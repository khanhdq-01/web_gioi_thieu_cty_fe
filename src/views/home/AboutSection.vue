<template>
  <section class="hero text-center">
    <div class="hero-heading text-center py-3">
      <h3>リーム</h3>
    </div>
    <div class="about-list-container">
      <div v-for="(about, index) in aboutData" :key="about.id" class="about-item">
        <div class="about-text-container">
          <h5 class="about-title">{{ about.title }}</h5>
        </div>
        <div class="about-image-container">
          <img v-if="about.image_path" :src="url + about.image_path" class="about-image" />
        </div>
      </div>
    </div>

    <router-link
      v-if="isLoggedIn && userRole === 1"
      to="/about-list"
      class=" btn btn-outline-primary position-absolute end-0 bottom-0 m-3"
      style="position: absolute; bottom: 20px; right: 20px;"
    >
      Manage abouts
    </router-link>
  </section>
</template>

<script>
import axios from "axios"
import "@/assets/css/abouthome.css";

export default {
  name: "AboutSection",
  data() {
    return {
      aboutData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/abouts/',
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchaboutData();
  },
  methods: {
    async fetchaboutData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/about", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.aboutData = response.data.data;
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    },
  },
};
</script>

