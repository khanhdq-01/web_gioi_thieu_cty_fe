<template>
  <section class="company d-flex align-items-center justify-content-center text-center">
    <div class="company-content">
      <div class="company-heading text-center py-3">
      <h3>ームベト</h3>
      </div>
      <div class="carousel-container">
        <div class="carousel-company" :style="{ transform: `translateX(-${currentcompanyIndex * 100}%)` }">
          <div v-for="(company, index) in companyData" :key="company.id" class="company-item">
            <img v-if="company.image_path" :src="url + company.image_path" class="company-image">
            <h5 class="company-title">{{ company.title }}</h5>
            <h5 class="company-content">{{ company.content }}</h5>
          </div>
        </div>
      </div>
    </div>
    <router-link v-if="isLoggedIn && userRole === 1" to="/company-profile-list" class="btn btn-outline-primary position-absolute end-0 bottom-0 m-3" style="position: absolute; bottom: 20px; right: 20px;">
      Manage companys
    </router-link>
  </section>
</template>

<script>
import axios from "axios"
import "@/assets/css/companyhome.css";

export default {
  name: "HeroSection",
  data() {
    return {
      companyData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/company-profiles/',
      currentcompanyIndex: 0,
      intervalId: null,
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchcompanyData();
  },
  methods: {
    async fetchcompanyData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/company-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.companyData = response.data.data;
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    },
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>