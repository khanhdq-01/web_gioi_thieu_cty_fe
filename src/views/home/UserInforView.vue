<template lang="">
    <section class="user-infos py-5">
      <div class="container">
        <h2 class="text-center mb-5">Giới thiệu công ty</h2>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>title</th>
                  <th>content</th>
                  <th>image</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="company in companyProfile" :key="company.id">
                  <td>{{ company.title }}</td>
                  <td>{{ company.content }}</td>
                  <td><img :src="company.image" alt="Company image" style="max-width: 100px;"></td>
                  <td> 
                    <button @click="deleteCompanyProfile(company.id)" class="btn btn-danger btn-sm">
                        Xóa
                    </button>
                </td>
                </tr>
              </tbody>
            </table>
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
    };
  },
  mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    if (!this.userName || this.userName === '' || this.userName == null) {
      this.$router.push({ name: 'login' });
    }
    if (this.roleId != 1) {
      this.$router.push({ name: 'home' });
    }
    this.fetchCompanyProfile();
  },
  methods: {
    async fetchCompanyProfile() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/company-profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    // Thay đổi logic kiểm tra phản hồi
    if (response.data && Array.isArray(response.data)) {
      this.companyProfile = response.data; // Nếu API trả về trực tiếp mảng
    } else if (response.data && response.data.data) {
      this.companyProfile = response.data.data; // Nếu API trả về qua trường data
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error('Error fetching company profiles:', error);
  }
},

async deleteCompanyProfile(id) {
  if (!confirm("Bạn chắc chắn muốn xóa?")) return;
  
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    await axios.delete(`http://127.0.0.1:8000/api/company-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    this.companyProfile = this.companyProfile.filter(company => company.id !== id);
    alert("Xóa thành công!");
  } catch (error) {
    console.error("Error deleting company profile:", error);
    alert(`Xóa thất bại! ${error.message}`);
  }
}
  },
};
</script>
<style scoped>
    
</style>