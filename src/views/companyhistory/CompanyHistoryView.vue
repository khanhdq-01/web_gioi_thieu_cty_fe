<template>
  <section class="company-timeline-wrapper text-center py-5">
    <div class="company-timeline-inner mx-auto">
      <div class="company-history-heading text-center py-3">
        <h3>
        会社沿革
      </h3></div>

      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in companyData" :key="index">
          <div class="timeline-date">
            <span class="year">{{ item.year }}</span>
            <span class="month">{{ item.month }}月</span>
          </div>
          <div class="timeline-content">
            <p class="event-text">{{ item.event }}</p>
          </div>
        </div>
      </div>

      <!-- Nút căn phải nội bộ -->
    </div>
    <div class="text-end mt-4 pe-4">
      <router-link
        v-if="isLoggedIn && userRole === 1"
        to="/company-history-list"
        class="btn btn-outline-primary"
      >
        Manage History
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios"
import "@/assets/css/companyhistory.css";

export default {
  name: "CopanyhistoryView",
  data() {
    return {
      companyData: [],
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
        const response = await axios.get("http://127.0.0.1:8000/api/company-history", {
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