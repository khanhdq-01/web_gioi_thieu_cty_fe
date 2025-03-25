<template>
  <header v-if="$route.name !== 'login'">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/logo.png" alt="Logo" class="logo me-2">
          <span>My Website</span>
        </RouterLink>

        <!-- Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Menu -->
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">🏠 Trang chủ</RouterLink>
            </li>
            <li v-if="role == 1" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                📝 Quản lý nội dung
              </a>
              <ul class="dropdown-menu">
                <li><RouterLink class="dropdown-item" to="/article">📄 Các bài viết</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/company-profile">🏢 Giới thiệu công ty</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/achievements">🏆 Thành tựu</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/recruitment">👨‍💼 Tuyển dụng</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/article-list">📋 Quản lý bài viết</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/user-infor">👤 Thông tin khách hàng</RouterLink></li>
              </ul>
            </li>
          </ul>

          <!-- User Info & Logout -->
          <div class="d-flex align-items-center">
            <span class="user-info me-3">👋 Hi, <strong>{{ name }}</strong></span>
            <a-button type="primary" danger size="small" @click="logout">🚪 Đăng xuất</a-button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import { Button as AButton } from 'ant-design-vue';

export default {
  components: { AButton },
  props: ['name', 'role'],
  methods: {
    logout() {
      axios
        .get('http://127.0.0.1:8000/api/auth/logout', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
          this.clearLocalStorage();
          router.push({ name: 'login' });
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            this.clearLocalStorage();
            router.push({ name: 'login' });
          }
        });
    },
    clearLocalStorage() {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('role_id');
      localStorage.removeItem('token');
    }
  }
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  background-color: #ffffff !important;
  border-bottom: 2px solid #f1f1f1;
  transition: all 0.3s ease-in-out;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff !important;
  display: flex;
  align-items: center;
}

.navbar-toggler {
  border: none;
  outline: none;
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

.navbar-nav .router-link-exact-active {
  color: #007bff !important;
  font-weight: bold;
}

/* Dropdown Menu */
.dropdown-menu {
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.dropdown-item:hover {
  background-color: #007bff;
  color: #fff !important;
  transform: translateX(5px);
}

/* User Info */
.user-info {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

/* Logout Button */
.ant-btn-primary {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.ant-btn-primary:hover {
  background: #d9363e;
  border-color: #d9363e;
}
</style>
