<template>
  <header v-if="$route.name !== 'login'">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <!-- Logo -->
        <RouterLink class="navbar-brand fw-bold text-warning" to="/">🛍️ MyShop</RouterLink>

        <!-- Toggle Menu (Mobile) -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Menu -->
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">
                <i class="fas fa-home"></i> Home
              </RouterLink>
            </li>
            <li v-if="role == 3 || role == 1" class="nav-item">
              <RouterLink class="nav-link" to="/order">
                <i class="fas fa-shopping-cart"></i> Order
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/order-list">
                <i class="fas fa-list"></i> Order List
              </RouterLink>
            </li>
            <li v-if="role == 1" class="nav-item">
              <RouterLink class="nav-link" to="/order-report">
                <i class="fas fa-chart-line"></i> Order Report
              </RouterLink>
            </li>
            <li v-if="role == 1" class="nav-item">
              <RouterLink class="nav-link" to="/product">
                <i class="fas fa-box"></i> Product
              </RouterLink>
            </li>
          </ul>

          <!-- User Info & Logout -->
          <div class="d-flex align-items-center">
            <span class="text-light me-3">
              👋 Hi, <strong>{{ name }}</strong>
            </span>
            <a-button type="primary" danger size="small" @click="logout">
              🚪 Logout
            </a-button>
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => {
          this.clearLocalStorage();
          router.push({ name: 'login' });
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            console.log('Token hết hạn, chuyển hướng về trang đăng nhập');
            this.clearLocalStorage();
            router.push({ name: 'login' });
          } else {
            console.log('Lỗi khác khi đăng xuất');
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
/* Navbar */
.navbar {
  background-color: #1f1f1f !important;
}

/* Màu chữ menu */
.navbar-dark .navbar-nav .nav-link {
  color: #ffffff;
  font-weight: 500;
  padding: 10px 15px;
  transition: all 0.3s ease-in-out;
}

/* Hiệu ứng hover */
.navbar-dark .navbar-nav .nav-link:hover {
  color: #f39c12;
  transform: scale(1.1);
}

/* Hiệu ứng active */
.navbar-dark .navbar-nav .router-link-exact-active {
  color: #f39c12 !important;
  font-weight: bold;
}

/* Nút Logout */
.ant-btn-primary {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.ant-btn-primary:hover {
  background: #d9363e;
  border-color: #d9363e;
}

/* Chữ "Hi, name" */
.text-light {
  font-weight: 600;
  font-size: 14px;
}
</style>
