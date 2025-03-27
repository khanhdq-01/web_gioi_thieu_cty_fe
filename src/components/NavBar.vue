<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/logo.png" alt="Logo" class="logo me-2">
          <span>HOME</span>
        </RouterLink>

        <!-- Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <!-- Menu -->
          <ul class="navbar-nav mx-auto">
            <!-- <li class="nav-item">
              <RouterLink class="nav-link" to="/">🏠 Trang chủ</RouterLink>
            </li> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                🏠 Trang chủ
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><RouterLink class="dropdown-item" to="/">a</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/">b</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/">c</RouterLink></li>
              </ul>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/article">Blog</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/achievements">Thành tựu</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/recruitment">Tuyển dụng</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link bi bi-geo-alt-fill" to="/map" >Vị Trí</RouterLink>
            </li>
            <li v-if="isLoggedIn && userRole == 1" class="nav-item">
              <RouterLink class="dropdown-item" to="/user-infor">Thông tin khách hàng</RouterLink>
            </li>

          </ul>

          <!-- Social Links + User Info & Logout -->
          <div class="d-flex align-items-center">
            <a href="https://facebook.com" target="_blank" class="social-icon me-2">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" class="social-icon me-2">
              <i class="fab fa-tiktok"></i>
            </a>

            <!-- Nếu chưa đăng nhập, hiển thị nút "Đăng nhập" -->
            <a-button v-if="!isLoggedIn" type="primary" class="ms-3" @click="goToLogin">
              🔑 Đăng nhập
            </a-button>

            <!-- Nếu đã đăng nhập, hiển thị thông tin user và nút đăng xuất -->
            <div v-else class="d-flex align-items-center ms-3">
              <span class="user-info me-2">👋 Hi, <strong>{{ userName }}</strong></span>
              <a-button type="primary" danger size="small" @click="logout">🚪 Đăng xuất</a-button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { Button as AButton } from "ant-design-vue";

export default {
  components: { AButton },
  data() {
    return {
      userName: localStorage.getItem("name") || "",
      userRole: localStorage.getItem("role_id") || null,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    goToLogin() {
      router.push({ name: "login" });
    },
    logout() {
      axios
        .get("http://127.0.0.1:8000/api/auth/logout", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          this.clearLocalStorage();
          router.push({ name: "login" });
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            this.clearLocalStorage();
            router.push({ name: "login" });
          }
        });
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
  },
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  background-color: #ffffff !important;
  border-bottom: 2px solid #f1f1f1;
  transition: all 0.3s ease-in-out;
  padding: 10px 0;
}

.navbar-brand {
  font-size: 1.4rem;
  font-weight: bold;
  color: #007bff !important;
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(10deg);
}

/* Menu Item Styles */
.navbar-nav .nav-link {
  color: #333 !important;
  font-weight: 500;
  margin-right: 15px;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar-nav .nav-link:hover {
  color: #007bff !important;
  transform: scale(1.05);
}

/* Dropdown Menu */
.dropdown-menu {
  border-radius: 8px;
  overflow: hidden;
  min-width: 220px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 10px;
  transition: background 0.3s ease;
}

.dropdown-item:hover {
  background: #f1f1f1;
}

/* Social Icons */
.social-icon {
  font-size: 1.2rem;
  color: #007bff;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #0056b3;
}

/* User Info */
.user-info {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

/* Logout & Login Button */
.ant-btn-primary {
  background: #007bff;
  border-color: #007bff;
}

.ant-btn-primary:hover {
  background: #0056b3;
  border-color: #0056b3;
}

.ant-btn-danger {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.ant-btn-danger:hover {
  background: #d9363e;
  border-color: #d9363e;
}

/* Responsive */
@media (max-width: 991px) {
  .navbar-nav {
    text-align: center;
  }
  .navbar-collapse {
    padding-top: 10px;
  }
}
</style>
