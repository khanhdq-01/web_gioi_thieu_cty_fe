<template>
  <section
    class="hero-header"
    :style="{
      backgroundImage: slideData.length ? `url(${url + slideData[currentSlideIndex].image_path})` : 'none'
    }"
  >
    <!-- Marquee Around -->
    <div class="marquee-wrapper top">
      <div class="marquee-content">{{ slideData[currentSlideIndex]?.title || '' }}</div>
    </div>

    <router-link
      v-if="isLoggedIn && userRole === 1"
      to="/slide-list"
      class="btn btn-outline-primary position-absolute end-0 bottom-0 m-3"

    >
      Manage Slides
    </router-link>
  </section>
</template>


<script>
import axios from "axios"
import "@/assets/css/slidehome.css";

export default {
  name: "HeroSection",
  data() {
    return {
      slideData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/slides/',
      currentSlideIndex: 0,
      intervalId: null,
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchSlideData();
  },
  methods: {
    async fetchSlideData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/slide", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.slideData = response.data.data;
        if (this.slideData.length > 0) {
          this.startAutoSlide();
        }
      } catch (error) {
        console.error("Error fetching slide data:", error);
      }
    },
    startAutoSlide() {
      this.intervalId = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slideData.length;
      }, 5000);
    }
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>