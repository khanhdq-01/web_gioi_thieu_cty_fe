<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container-fluid">
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/logo.png" alt="Logo" class="logo me-2">
          <span class="brand-text">COMPANY</span>
        </RouterLink>

        <!-- Mobile Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" 
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Menu Items -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <RouterLink class="nav-link" to="/">Trang Chủ</RouterLink>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/article">Blog</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/achievement">Thành Tựu</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/recruitment">Tuyển Dụng</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/map">
                <i class="bi bi-geo-alt-fill me-1"></i>Vị Trí
              </RouterLink>
            </li>
            <li v-if="isLoggedIn && userRole === 1" class="nav-item">
              <RouterLink class="nav-link" to="/user-infor">Thông Tin Khách Hàng</RouterLink>
            </li>
          </ul>

          <!-- Right-aligned content -->
          <div class="d-flex align-items-center">
            <!-- Social Icons -->
            <div class="social-icons me-3">
              <a href="https://facebook.com" target="_blank" class="social-icon me-2 icon-1">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" class="social-icon me-2 icon-2">
                <i class="fab fa-tiktok"></i>
              </a>
           </div>

            <!-- Auth Section -->
            <div class="auth-section">
              <a-button v-if="!isLoggedIn" type="primary" class="login-btn" @click="goToLogin">
                Đăng nhập
              </a-button>

              <div v-else class="d-flex align-items-center">
                <span class="user-info me-2">Hi, <strong>{{ userName }}</strong></span>
                <a-button type="primary" danger size="small" class="logout-btn" @click="logout">
                  <i class="fas fa-sign-out-alt me-1"></i>Đăng xuất
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "@/router";
import { Button as AButton } from "ant-design-vue";
import "@/assets/css/navbar.css"; 
import { apiService } from '@/services/apiService'; 

export default {
  components: { AButton },
  data() {
    return {
      userName: localStorage.getItem("name") || "",
      userRole: parseInt(localStorage.getItem("role_id")) || null,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    goToLogin() {
      router.push({ name: "login" });
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");

        // Ensure token exists before attempting to logout
        if (token) {
          // Call the apiService.logout() function
          await apiService.logout(token);

          // Clear local storage after a successful logout
          this.clearLocalStorage();

          // Redirect to login page
          router.push({ name: "login" });
        } else {
          // Handle case where token doesn't exist in localStorage
          this.clearLocalStorage();
          router.push({ name: "login" });
        }

      } catch (error) {
        console.error("Logout error:", error);

        // Handle error, possibly due to token expiration or invalid token
        if (error.response && error.response.status === 401) {
          this.clearLocalStorage();
          router.push({ name: "login" });
        }
      }
    },
    clearLocalStorage() {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("role_id");
      localStorage.removeItem("token");
      this.userName = "";
      this.userRole = null;
      this.isLoggedIn = false;
    },
    handleScroll() {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>