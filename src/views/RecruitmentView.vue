<template>
    <div>
      <NavBar :name="userName" :role="roleId" />
  
      <!-- Trang tuyển dụng -->
      <section class="careers py-5">
        <div class="container">
          <h2 class="text-center mb-4">Cơ Hội Nghề Nghiệp</h2>
          <div class="row">
            <div v-for="(job, index) in jobs" :key="index" class="col-md-6">
              <div class="card job-card">
                <div class="card-body">
                  <h5 class="card-title">{{ job.title }}</h5>
                  <p class="card-text"><strong>Yêu cầu:</strong> {{ job.requirements }}</p>
                  <p class="card-text"><strong>Mô tả:</strong> {{ job.description }}</p>
                  <button class="btn btn-primary" @click="applyJob(job.id)">Ứng tuyển</button>
                </div>
              </div>
            </div>
          </div>
          <p v-if="successMessage" class="text-success mt-3 text-center">{{ successMessage }}</p>
          <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  import axios from "axios";
  
  export default {
    components: { NavBar },
    data() {
      return {
        userName: "",
        roleId: "",
        jobs: [],
        successMessage: "",
        errorMessage: "",
      };
    },
    mounted() {
      this.userName = localStorage.getItem("name");
      this.roleId = localStorage.getItem("role_id");
  
      if (!this.userName) {
        this.$router.push({ name: "login" });
      }
      
      this.fetchJobs();
    },
    methods: {
      async fetchJobs() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/job-listings");
          this.jobs = response.data;
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu:", error);
          this.jobs = [
            { id: 1, title: "Lập Trình Viên Fullstack", requirements: "Kinh nghiệm 2 năm, biết Vue.js và Laravel.", description: "Phát triển và bảo trì hệ thống web.", },
            { id: 2, title: "Nhân Viên Kinh Doanh", requirements: "Kỹ năng giao tiếp tốt, có kinh nghiệm sales.", description: "Tư vấn và bán sản phẩm công nghệ cho khách hàng.", },
            { id: 3, title: "Chuyên Viên Marketing", requirements: "Có kinh nghiệm chạy quảng cáo Facebook, Google.", description: "Lên kế hoạch và triển khai các chiến dịch marketing.", },
          ];
        }
      },
      async applyJob(jobId) {
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/apply-job/${jobId}`,
            {},
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
          this.successMessage = response.data.message;
          this.errorMessage = "";
        } catch (error) {
          this.errorMessage = error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
          this.successMessage = "";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .careers {
    background-color: #f8f9fa;
  }
  
  .job-card {
    transition: transform 0.3s ease;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .job-card:hover {
    transform: translateY(-10px);
  }
  
  .btn-primary {
    width: 100%;
  }
  </style>
  