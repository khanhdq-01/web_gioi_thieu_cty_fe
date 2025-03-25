<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container">
      <h2 class="my-5 text-center">Danh sách sản phẩm</h2>

      <!-- Nút thêm sản phẩm -->
      <RouterLink to="/article-add" class="btn btn-success mb-4">Thêm sản phẩm</RouterLink>

      <!-- Bảng danh sách sản phẩm -->
      <table class="table table-striped">
        <thead>   
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="item.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }} vnđ</td>
            <td>
              <img
                v-if="item.image"
                :src="url + item.image"
                class="object-fit-cover"
                style="width:100px; height:100px"
                alt="Article Image"
              />
              <img
                v-else
                src="@/assets/images/no-image.png"
                class="object-fit-cover"
                style="width:100px; height:100px"
                alt="No Image"
              />
            </td>
            <td>
              <RouterLink
                :to="{ name: 'articleUpdate', params: { articleId: item.id } }"
                class="btn btn-primary btn-sm me-2"
              >
                Sửa
              </RouterLink>
              <button
                @click="confirmDelete(item.id)"
                class="btn btn-danger btn-sm"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Xác nhận Xóa -->
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal-content">
          <h5>Xác nhận xóa</h5>
          <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
          <button @click="cancelDelete" class="btn btn-secondary me-2">Hủy</button>
          <button @click="deleteItem" class="btn btn-danger">Xóa</button>
        </div>
      </div>

      <!-- Modal Thông báo Xóa Thành Công -->
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="modal-content">
          <p>Xóa sản phẩm thành công!</p>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="d-flex justify-content-center mt-4">
        <button
          class="btn btn-outline-primary me-2"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="btn btn-outline-primary ms-2"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Tiếp
        </button>
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
      items: [],
      url: "http://localhost/web_gioi_thieu_cty/company_web_laravel/storage/app/public/items",
      currentPage: 1,
      itemsPerPage: 10,
      selectedItemId: null,
      showConfirmModal: false,
      showSuccessModal: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");
    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    this.getItems();
  },
  methods: {
    getItems() {
      axios
        .get("http://127.0.0.1:8000/api/article", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            router.push({ name: "login" });
          }
          console.error("Lỗi khi tải danh sách sản phẩm:", error);
        });
    },

    confirmDelete(id) {
      this.selectedItemId = id;
      this.showConfirmModal = true;
    },

    cancelDelete() {
      this.selectedItemId = null;
      this.showConfirmModal = false;
    },

    deleteItem() {
      if (!this.selectedItemId) return;

      axios
        .delete(`http://127.0.0.1:8000/api/article/${this.selectedItemId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.items = this.items.filter((item) => item.id !== this.selectedItemId);
          this.showConfirmModal = false;
          this.showSuccessModal = true;

          setTimeout(() => {
            this.showSuccessModal = false;
          }, 1000);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
          alert("Không thể xóa sản phẩm, vui lòng thử lại!");
        });
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  max-width: 90%;
}

.table th,
.table td {
  vertical-align: middle;
}

.object-fit-cover {
  object-fit: cover;
}
</style>