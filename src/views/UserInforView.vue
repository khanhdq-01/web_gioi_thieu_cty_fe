<template>
    <div>
      <NavBar :name="userName" :role="roleId" />
      <div>

    <!-- Hiển thị danh sách thông tin người dùng -->
    <section class="user-infos py-5">
      <div class="container-user-infos">
        <h3 class="text-center mb-5">User Information</h3>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userInfos" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ user.message }}</td>
                  <td> 
                    <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">
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
    </div>
    </div>
  </template>
    
    <script>
    import NavBar from "@/components/NavBar.vue";
    import axios from "axios";
    
    export default {
      components: {
        NavBar
      },
      data() {
        return {
          userName: '',
          roleId: '',
          userInfos: [],
        };
      },
      mounted() {
        this.userName = localStorage.getItem('name');
        this.roleId = localStorage.getItem('role_id');
        if (!this.userName) {
          this.$router.push({ name: 'login' });
        }
        if (this.roleId != 1) {
          this.$router.push({ name: 'home' });
        }
        this.fetchUserInfos();
      },
      methods: {
        async fetchUserInfos() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/user-info', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            this.userInfos = response.data.data;
          } catch (error) {
            console.error('Lỗi khi lấy thông tin:', error);
          }
        },
    
        async deleteUser(id) {
          if (!confirm("Bạn chắc chắn muốn xóa?")) return;
          
          try {
            await axios.delete(`http://127.0.0.1:8000/api/user-info/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            this.userInfos = this.userInfos.filter(user => user.id !== id);
            alert("Xóa thành công!");
          } catch (error) {
            console.error("Lỗi khi xóa:", error);
            alert("Xóa thất bại!");
          }
        }
      }
    };
    </script>
    
    <style scoped>
    .container-user-infos {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      flex: 1; /* Đẩy footer xuống cuối */
    }
    .user-infos {
  display: flex;
  flex-direction: column;
  min-height: 70vh; /* Đảm bảo chiều cao tối thiểu là toàn màn hình */
}
    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      
    }
    
    .form-label {
      font-weight: bold;
    }
    
    .btn-success {
      background-color: #28a745;
      border-color: #28a745;
    }
    
    .btn-success:hover {
      background-color: #218838;
      border-color: #1e7e34;
    }
    </style>