<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <div class="col-12 col-lg-6 mx-auto">
        <h3 class="mb-4 text-center">Cập nhật sản phẩm</h3>
        <form @submit.prevent="updateArticle">
          <div class="mb-3">
            <label for="name" class="form-label">Tên sản phẩm</label>
            <input
              type="text"
              class="form-control"
              v-model="item.name"
              id="name"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Mô tả sản phẩm</label>
            <textarea
              class="form-control"
              v-model="item.description"
              id="description"
              placeholder="Nhập mô tả sản phẩm"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="current-image" class="form-label">Hình ảnh hiện tại</label>
            <div>
              <img
                v-if="item.image"
                :src="url + item.image"
                class="object-fit-cover"
                style="width:100px; height:100px"
                alt="Current Article Image"
              />
              <img
                v-else
                src="@/assets/images/no-image.png"
                class="object-fit-cover"
                style="width:100px; height:100px"
                alt="No Image"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Hình ảnh mới</label>
            <input
              type="file"
              class="form-control"
              @change="imageChanged"
              id="image"
              accept="image/*"
            />
          </div>
          <div class="mb-3 d-flex gap-2">
            <button class="btn btn-success flex-grow-1" type="submit">Lưu</button>
            <button class="btn btn-secondary flex-grow-1" type="button" @click="cancelUpdate">Hủy</button>
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
      url: "http://localhost/web_gioi_thieu_cty/company_web_laravel/storage/app/public/items",
      articleId: "",
      item: {
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      },
      file: null,
    };
  },
  mounted() {
    this.articleId = this.$route.params.articleId;
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    if (this.roleId != 1) {
      router.push({ name: "home" });
    }

    this.showItem();
  },
  methods: {
    showItem() {
      axios
        .get(`http://127.0.0.1:8000/api/article/${this.articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.item = response.data.data;
        })
        .catch((error) => {
          console.error("Lỗi khi tải sản phẩm:", error);
          alert("Không thể tải thông tin sản phẩm, vui lòng thử lại!");
        });
    },
    updateArticle() {
      if (!this.item.name || !this.item.description || !this.item.price || !this.item.stock) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      let formData = new FormData();
      formData.append("name", this.item.name);
      formData.append("description", this.item.description);
      formData.append("price", this.item.price);
      formData.append("stock", this.item.stock);
      if (this.file) {
        formData.append("image_file", this.file);
      }
      formData.append("_method", "PATCH");

      axios
        .post(`http://127.0.0.1:8000/api/article/${this.articleId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("Cập nhật sản phẩm thành công!");
          router.push({ name: "article" });
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật sản phẩm:", error);
          alert("Không thể cập nhật sản phẩm, vui lòng thử lại!");
        });
    },
    imageChanged(e) {
      this.file = e.target.files[0];
    },
    cancelUpdate() {
      router.go(-1);
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

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.object-fit-cover {
  object-fit: cover;
}
</style>
