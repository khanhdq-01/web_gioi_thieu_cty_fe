<template>
  <NavBar :name="userName" />
  <section class="achievement">
    <div class="achievement-heading text-center">
      <h3>Our Technological Achievements</h3>
    </div>
    
    <div class="search-filter-container">
      <input 
        v-model="searchQuery"
        type="text" 
        class="search-input" 
        placeholder="Search achievements..."
      >
      <select v-model="selectedYear" class="filter-select">
        <option value="">All Years</option>
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="selectedCategory" class="filter-select">
        <option value="">All Categories</option>
        <option v-for="category in availableCategories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>

    <div class="achievement-list-container">
      <div 
        v-for="achievement in filteredAchievements" 
        :key="achievement.id" 
        class="project-achievement-card"
      >
      <div class="project-achievement-image-wrapper">
          <img v-if="achievement.image_path" :src="url + achievement.image_path" class="project-image" />
          <div class="project-achievement-overlay">
            <div class="project-achievement-info">
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
      
      <div v-if="filteredAchievements.length === 0" class="no-results">
        <h4>No achievements found matching your criteria</h4>
        <p>Try adjusting your search filters</p>
      </div>
    </div>

    <router-link
      v-if="isLoggedIn && userRole === 1"
      to="/achievement-list"
      class="manage-achievement-btn"
    >
      Manage achievements
    </router-link>
  </section>
  <CompanyHistory />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import "@/assets/css/achievement.css";
import CompanyHistory from '@/views/companyhistory/CompanyHistoryView.vue';

export default {
  components: {
    NavBar,
    CompanyHistory,
  },
  data() {
    return {
      achievementData: [],
      searchQuery: '',
      selectedYear: '',
      selectedCategory: '',
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/',
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  computed: {
  availableYears() {
    return [...new Set(this.achievementData.map(a => a.date.split('-')[0]))];
  },
  availableCategories() {
    return [...new Set(this.achievementData.map(a => a.category))];
  },
  filteredAchievements() {
    return this.achievementData.filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           achievement.summary.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesYear = this.selectedYear ? 
        achievement.date.startsWith(this.selectedYear) : true;
      const matchesCategory = this.selectedCategory ? 
        achievement.category === this.selectedCategory : true;
      
      return matchesSearch && matchesYear && matchesCategory;
    });
  }
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