<template>
    <div>
      <NavBar :name="userName" :role="roleId" />
  
      <!-- Thành tựu công ty -->
      <section class="achievements py-5">
        <div class="container">
          <h2 class="text-center mb-4">Thành Tựu Công Ty</h2>
          <div class="row">
            <div v-for="(achievement, index) in achievements" :key="index" class="col-md-4">
              <div class="card achievement-card">
                <img :src="achievement.image" class="card-img-top" alt="Achievement Image">
                <div class="card-body">
                  <h5 class="card-title">{{ achievement.title }}</h5>
                  <p class="card-text">{{ achievement.description }}</p>
                </div>
              </div>
            </div>
          </div>
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
        achievements: []
      };
    },
    mounted() {
      this.userName = localStorage.getItem("name");
      this.roleId = localStorage.getItem("role_id");
  
      if (!this.userName) {
        this.$router.push({ name: "login" });
      }
      
      this.fetchAchievements();
    },
    methods: {
      async fetchAchievements() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/company-achievements");
          this.achievements = response.data;
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu:", error);
          this.achievements = [
            { title: "Giải thưởng Doanh nghiệp Xuất sắc", description: "Nhận giải thưởng uy tín về đổi mới sáng tạo năm 2023.", image: "/images/achievement1.jpg" },
            { title: "Top 10 Công ty Công nghệ Hàng đầu", description: "Nằm trong danh sách công ty công nghệ dẫn đầu khu vực.", image: "/images/achievement2.jpg" },
            { title: "Hơn 1 Triệu Khách Hàng", description: "Công ty đã phục vụ hơn 1 triệu khách hàng trên toàn cầu.", image: "/images/achievement3.jpg" }
          ];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .achievements {
    background-color: #f8f9fa;
  }
  
  .achievement-card {
    transition: transform 0.3s ease;
  }
  
  .achievement-card:hover {
    transform: translateY(-10px);
  }
  </style>
  