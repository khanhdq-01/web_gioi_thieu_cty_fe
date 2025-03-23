<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <div class="row">
        <!-- Search Bar -->
        <div class="col-12 mb-4">
          <input
            type="text"
            v-model="keyword"
            class="form-control search-bar"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            @input="searchItem()"
          />
        </div>

        <!-- Product List -->
        <div class="col-12">
          <div v-if="paginatedItems.length > 0" class="row">
            <div
              v-for="item in paginatedItems"
              :key="item.id"
              class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div class="card product-card">
                <img
                  class="card-img-top"
                  :src="url + item.image"
                  alt="Product Image"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text text-danger fw-bold">{{ item.price }} VNĐ</p>

                  <!-- Button Group -->
                  <div class="button-group mt-2">
                    <button class="btn btn-primary btn-sm" @click="addToCartAndRedirect(item)">
                      🛒 Thêm vào giỏ hàng
                    </button>
                    <RouterLink
                      :to="{ name: 'orderDetail', params: { orderId: item.id } }"
                      class="btn btn-info btn-sm"
                    >
                      📜 Xem chi tiết
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center mt-5">
            <p>😞 Không tìm thấy sản phẩm nào.</p>
          </div>

          <!-- Pagination Controls -->
          <div class="d-flex justify-content-center mt-4" v-if="totalPages > 1">
            <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">
              ⬅ Trước
            </button>
            <span class="pagination-info">Trang {{ currentPage }} / {{ totalPages }}</span>
            <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">
              Tiếp ➡
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
import router from "@/router";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userName: "",
      roleId: "",
      items: [],
      keyword: "",
      filteredItems: [],
      url: "http://localhost/web_ban_hang/web_ban_hang_backend/storage/app/public/items/",
      currentPage: 1,
      itemsPerPage: 12,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");
    if (!this.userName) {
      router.push({ name: "login" });
    }
    this.getItems();
  },
  methods: {
    getItems() {
      axios
        .get("http://127.0.0.1:8000/api/product", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
          this.filteredItems = this.items;
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            localStorage.clear();
            router.push({ name: "login" });
          }
          console.error(error);
        });
    },
    searchItem() {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
      this.currentPage = 1;
    },
    addToCartAndRedirect(item) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
        router.push({ name: "login" });
        return;
      }

      axios
        .post(
          "http://127.0.0.1:8000/api/cart",
          { product_id: item.id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert(`${item.name} đã được thêm vào giỏ hàng.`);
          router.push({ name: "cart" });
        })
        .catch((error) => {
          console.error(error);
          alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
        });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
/* Search Bar */
.search-bar {
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Product Card */
.product-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.card-img-top {
  height: 220px;
  object-fit: cover;
}

.card-body {
  background: #fff;
  padding: 15px;
}

/* Button Group */
.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}

.button-group .btn {
  flex: 1;
}

/* Buttons */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #117a8b;
  border-color: #0f6674;
}

/* Pagination */
.pagination-info {
  font-size: 1rem;
  font-weight: bold;
}
</style>
