<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <!-- Upload Section -->
    <section class="upload py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Upload giới thiêu công ty</h2>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề</label>
                <input type="text" class="form-control" id="title" placeholder="Nhập tiêu đề" v-model="formData.title" required />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Nội dung</label>
                <textarea class="form-control" id="content" rows="3" placeholder="Nhập nội dung" v-model="formData.content" required>
                </textarea>
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">Ảnh công ty</label>
                <input type="file" class="form-control" id="image" accept="image/*" @change="handleFileChange" required />
                <div v-if="previewImage" class="mt-3">
                  <img :src="previewImage" alt="Preview" class="img-thumbnail" style="max-width: 200px; max-height: 200px;">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Đang xử lý...' : 'Lưu thông tin' }}</button>
              <button @click="navigateAndScroll">Cancle</button>
            </form>
            <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar.vue';
    import axios from 'axios';
    
    export default {
      components: { NavBar },
      data() {
        return {
          userName: '',
          roleId: '',
          formData: {
            title: '',
            content: '',
            image: null, // Thay đổi từ string sang null để lưu file
          },
          previewImage: null,
          successMessage: '',
          errorMessage: '',
          isSubmitting: false,
        };
      },
      mounted() {
        this.checkAuth();
      },
      methods: {
        checkAuth() {
          this.userName = localStorage.getItem('name');
          this.roleId = localStorage.getItem('role_id');
          
          if (!this.userName) {
            this.$router.push({ name: 'login' });
            return;
          }
          
          if (this.roleId != 1) {
            this.$router.push({ name: 'home' });
          }
        },
        
        handleFileChange(event) {
          const file = event.target.files[0];
          if (file) {
            // Tạo preview ảnh
            this.previewImage = URL.createObjectURL(file);
            this.formData.image = file;
          }
        },
        
        async submitForm() {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.errorMessage = 'Vui lòng đăng nhập lại';
          this.$router.push({ name: 'login' });
          return;
        }
  
        // Kiểm tra có file ảnh không
        if (!this.formData.image) {
          throw new Error('Vui lòng chọn ảnh');
        }
  
        const formData = new FormData();
        formData.append('title', this.formData.title);
        formData.append('content', this.formData.content);
        formData.append('image', this.formData.image);
  
        // Thêm console.log để debug
        console.log('Dữ liệu gửi đi:', {
          title: this.formData.title,
          content: this.formData.content,
          image: this.formData.image.name
        });
  
        const response = await axios.post(
          'http://127.0.0.1:8000/api/company-profile', 
          formData, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            timeout: 10000 // 10 giây timeout
          }
        );
  
        console.log('Phản hồi từ API:', response.data);
  
        // Kiểm tra response theo cấu trúc thực tế của API
        if (response.data && (response.data.success || response.data.id)) {
          this.successMessage = response.data.message || 'Thêm thông tin thành công!';
          this.resetForm();
          //chuyen den id la company o trang home
          this.$router.push("/").then(() => { 
            this.$nextTick(() => {
              const section = document.getElementById("company");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            });
          });
  
        } else {
          throw new Error(response.data.message || 'Phản hồi API không hợp lệ');
        }
      } catch (error) {
        console.error('Chi tiết lỗi:', {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        });
        
        if (error.code === 'ECONNABORTED') {
          this.errorMessage = 'Request timeout, vui lòng thử lại';
        } else {
          this.errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Có lỗi xảy ra, vui lòng thử lại.';
        }
      } finally {
        this.isSubmitting = false;
      }
    },
        resetForm() {
          this.formData = {
            title: '',
            content: '',
            image: null
          };
          this.previewImage = null;
          document.getElementById('image').value = '';
        },
        navigateAndScroll() {
          this.$router.push("/").then(() => {
            this.$nextTick(() => {
              const section = document.getElementById("company");
              if (section) {
                section.scrollIntoView({ behavior: "instant", block: "start" }); // Không hiệu ứng
              }
            });
          });
        }
      },
    };
</script>
<style scoped>
  .upload {
    min-height: calc(100vh - 56px);
    display: flex;
    align-items: center;
  }
  
  .container {
    max-width: 800px;
  }
  
  .form-control {
    margin-bottom: 1rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    padding: 0.5rem 1.5rem;
  }
  
  .btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  
  .btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  .text-success {
    font-weight: bold;
  }
  
  .text-danger {
    font-weight: bold;
  }
  
  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .img-thumbnail {
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    padding: 0.25rem;
    background-color: #fff;
  }
</style>