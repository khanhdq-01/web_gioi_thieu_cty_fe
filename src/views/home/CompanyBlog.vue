<template>
  <section class="user-infos py-5">
    <div class="container">
      <h2 class="text-center mb-4" id="company">Giới thiệu công ty</h2>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="album-container d-flex flex-wrap justify-content-center">
            <div class="card company-card" v-for="company in companyProfile" :key="company.id">
              <img :src="getImageUrl(company.image)" alt="Company image" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ company.title }}</h5>
                  <p class="card-text">{{ company.content }}</p>

                  <button class="btn btn-primary btn-sm mt-2" @click="goToAddCompany">
                    Thêm Giới thiệu Công Ty
                  </button>

                  <button v-if="roleId == 1" @click="toggleEdit(company)" class="btn btn-warning btn-sm mx-2">
                    {{ editingCompanyId === company.id ? 'Đóng' : 'Cập nhật' }}
                  </button>
                  <button v-if="roleId == 1 && editingCompanyId !== company.id" @click="deleteCompanyProfile(company.id)" class="btn btn-danger btn-sm">
                    Xóa
                  </button>
                <!-- Form chỉnh sửa -->
                <div v-if="editingCompanyId === company.id" class="edit-form mt-3 p-3 bg-light rounded">
                  <div class="form-group">
                    <label>Tiêu đề</label>
                    <input v-model="editTitle" class="form-control mb-2">
                  </div>
                  <div class="form-group">
                    <label>Nội dung</label>
                    <textarea v-model="editContent" class="form-control mb-2" rows="5"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Ảnh mới (nếu cần thay đổi)</label>
                    <input type="file" @change="handleFileChange" class="form-control-file mb-2">
                  </div>
                  <button @click="saveEdit(company.id)" class="btn btn-success btn-sm">Lưu</button>
                  <button @click="editingCompanyId = null" class="btn btn-secondary btn-sm ml-2">Hủy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserInforView",
  data() {
    return {
      companyProfile: [],
      roleId: null,
      editingCompanyId: null,
      editTitle: "",
      editContent: "",
      editFile: null
    };
  },
  mounted() {
    this.roleId = localStorage.getItem('role_id');
    this.fetchCompanyProfile();
  },
  methods: {
    async fetchCompanyProfile() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/company-profile');
        this.companyProfile = response.data.data || response.data;
      } catch (error) {
        console.error('Error fetching company profiles:', error);
      }
    },
    goToAddCompany() {
    this.$router.push('/company-profile');
    },

    getImageUrl(path) {
      return path ? `http://127.0.0.1:8000/${path}` : 'default-image.jpg';
    },

    toggleEdit(company) {
      if (this.editingCompanyId === company.id) {
        this.editingCompanyId = null;
      } else {
        this.editingCompanyId = company.id;
        this.editTitle = company.title;
        this.editContent = company.content;
        this.editFile = null;
      }
    },

    handleFileChange(event) {
      this.editFile = event.target.files[0];
    },

    async saveEdit(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vui lòng đăng nhập để thực hiện thao tác");
          return;
        }

        const formData = new FormData();
        formData.append("_method", "PUT"); // Laravel hiểu đây là PUT
        formData.append("title", this.editTitle);
        formData.append("content", this.editContent);

        if (this.editFile) {
          formData.append("image_file", this.editFile);
        }

        const response = await axios.post(
          `http://127.0.0.1:8000/api/company-profile/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response từ server:", response.data);

        // Cập nhật UI
        const updatedData = response.data.data || {};
        const index = this.companyProfile.findIndex(c => c.id === id);
        if (index !== -1) {
          this.companyProfile[index] = {
            ...this.companyProfile[index],
            ...updatedData,
            image: updatedData.image_path || this.companyProfile[index].image,
          };
        }

        this.editingCompanyId = null;
        alert("Cập nhật thành công!");
        
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        alert(`Cập nhật thất bại: ${error.response?.data?.message || error.message}`);
      }
},


    async deleteCompanyProfile(id) {
      if (!confirm("Bạn chắc chắn muốn xóa?")) return;
      
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/company-profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        this.companyProfile = this.companyProfile.filter(company => company.id !== id);
        alert("Xóa thành công!");
      } catch (error) {
        console.error("Error deleting company profile:", error);
        alert("Xóa thất bại!");
      }
    },
  },
};
</script>

<style scoped>
/* Giữ nguyên phần style như cũ */
.album-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.company-card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.company-card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.card-body {
  text-align: center;
}

.btn-danger, .btn-warning, .btn-primary {
  margin-top: 10px;
}

.edit-form {
  border: 1px solid #ddd;
  margin-top: 10px;
}
</style>