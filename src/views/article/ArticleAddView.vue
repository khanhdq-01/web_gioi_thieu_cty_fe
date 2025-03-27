<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <div class="col-12 col-lg-6 mx-auto">
        <h3 class="mb-4 text-center">Thêm bài viết mới</h3>
        <form @submit.prevent="createArticle">
          <div class="mb-3">
            <label for="name" class="form-label">Tên sản phẩm</label>
            <input
              type="text"
              class="form-control"
              v-model="name"
              id="name"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Mô tả sản phẩm</label>
            <textarea
              class="form-control"
              v-model="description"
              id="description"
              placeholder="Nhập mô tả sản phẩm"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Hình ảnh</label>
            <input
              type="file"
              class="form-control"
              @change="imageChanged"
              id="image"
              accept="image/*"
            />
          </div>
          <div class="mb-3">
            <button class="btn btn-success form-control" type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userName: "",
      roleId: "",
      name: "",
      description: "",
      file: null,
    };
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");
    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    if (this.roleId != 1) {
      router.push({ name: "home" });
    }
  },
  methods: {
    createArticle() {
      if (this.name === "" || this.description === "" ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      if (this.file) {
        formData.append("image_file", this.file);
      }

      axios
        .post("http://127.0.0.1:8000/api/article", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("Thêm sản phẩm thành công!");
          router.push({ name: "article" });
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            console.error("Lỗi xác thực:", error.response.data.errors);
            alert("Dữ liệu không hợp lệ: " + JSON.stringify(error.response.data.errors));
          } else if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            router.push({ name: "login" });
          } else {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert("Không thể thêm sản phẩm, vui lòng thử lại!");
          }
        });
    },
    imageChanged(e) {
      this.file = e.target.files[0];
    },
  },
};
</script>
  
  <style scoped>
  .container {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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