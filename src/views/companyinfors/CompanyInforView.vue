<template>
  <section class="company-infor-section d-flex align-items-center justify-content-center text-center">
    <div class="company-info">
      <div class="company-info-heading text-center py-3">
      <h3>発会社です。</h3>
      </div>
      <div class="company-info-container">
        <div class="company-info-company" :style="{ transform: `translateX(-${currentcompanyIndex * 100}%)` }">
          <div v-for="(company, index) in companyData" :key="company.id" class="company-item">
            <div class="company-info">
            <div class="company-info-row">
              <h5 class="company-info-title">Tên công ty</h5>
              <h5 class="company-info-content">{{ company.company_name }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Địa chỉ</h5>
              <h5 class="company-info-content">{{ company.address }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Giám đốc</h5>
              <h5 class="company-info-content">{{ company.director_name }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Ngày thành lập</h5>
              <h5 class="company-info-content">{{ company.founded_date }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Nội dung kinh doanh</h5>
              <h5 class="company-info-content">{{ company.business_scope }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Vốn đầu tư</h5>
              <h5 class="company-info-content">{{ company.capital }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Tập đoàn mẹ</h5>
              <h5 class="company-info-content">{{ company.group_parent }}</h5>
            </div>
            <div class="company-info-row">
              <h5 class="company-info-title">Thành viên</h5>
              <h5 class="company-info-content">{{ company.employee_count }}</h5>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <router-link v-if="isLoggedIn && userRole === 1" to="/company-infor-list" class="btn btn-outline-primary position-absolute end-0 bottom-0 m-3" style="position: absolute; bottom: 20px; right: 20px;">
      Manage companys
    </router-link>
  </section>
</template>

<script>
import axios from "axios"
import "@/assets/css/companyinfor.css";

export default {
  name: "CopanyInforView",
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
        const response = await axios.get("http://127.0.0.1:8000/api/company-info", {
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