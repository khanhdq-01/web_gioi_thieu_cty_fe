<template>
    <div class="container">
      <div class="row vh-100 justify-content-center align-items-center login-container">
        <div class="col-md-4">
          <div class="card mt-5 shadow">
            <div class="card-body">
              <h3 class="card-title">Đăng nhập</h3>
              <form @submit.prevent>
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control" id="email" name="email" required />
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="form-label">Mật khẩu</label>
                  <input type="password" v-model="password" class="form-control" id="password" name="password" required />
                </div>
                <button @click="login()" class="btn btn-primary btn-block form-control">Đăng nhập</button>
              </form>
              <div class="text-center mt-3">
                <a href="#">Quên mật khẩu?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { apiService } from '@/services/apiService';
  import router from '@/router';
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const response = await apiService.login(this.email, this.password);
  
          console.log(response);
          localStorage.setItem('email', response.data.data.email);
          localStorage.setItem('name', response.data.data.name);
          localStorage.setItem('role_id', response.data.data.role_id);
          localStorage.setItem('token', response.data.data.token);
          
          // Redirect to home after successful login
          router.push({ name: 'home' });
        } catch (error) {
          console.error(error);
          console.log('Lỗi khi đăng nhập');
        }
      },
    },
    mounted() {
      this.userName = localStorage.getItem('name');
      console.log("🔹 Giá trị userName:", this.userName);
      
      if (this.userName && this.userName !== "null" && this.userName.trim() !== '') {
        router.push({ name: 'home' });
      }
    },
  };
  </script>
  