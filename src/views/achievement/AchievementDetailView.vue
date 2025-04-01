<template>
  <NavBar :name="userName" />

  <section class="hero-details" v-if="achievementData">
    <div class="achievement-details">
      <h3>Chi tiết bài viết</h3>
    </div>

    <div class="achievement-item">
      <div class="achievement-image-details" v-if="achievementData.image_path">
        <img :src="url + achievementData.image_path" class="achievement-image" />
      </div>
      <div class="achievement-text-details">
        <h5 class="achievement-name">{{ achievementData.title }}</h5>
        <p class="achievement-description">{{ achievementData.category }}</p>
        <p class="achievement-description">{{ achievementData.date }}</p>
        <p class="achievement-description">{{ achievementData.summany }}</p>
        <p class="achievement-description">{{ achievementData.description }}</p>
      </div>
    </div>

    <div class="mb-3">
      <router-link to="/achievement" class="btn btn-secondary ms-2">Quay lại</router-link>
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
      achievementData: null, // ban đầu là null
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/',
      userName: localStorage.getItem('name') || '',
    };
  },
  mounted() {
    this.fetchachievementData();
  },
  methods: {
    async fetchachievementData() {
      const token = localStorage.getItem("token");
      const achievementId = this.$route.params.achievementId;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/achievements/${achievementId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.achievementData = response.data;
        console.log("achievement fetched:", this.achievementData);
      } catch (error) {
        console.error("Error fetching achievement data:", error);
      }
    },
  },
};
</script>
