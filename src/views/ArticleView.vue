<template>
  <div>
    <NavBar :name="userName" />
    <div class="container mt-5">
      <div class="row">
        <!-- Search Bar -->
        <div class="col-12 mb-4">
          <input
            type="text"
            v-model="keyword"
            class="form-control search-bar"
            placeholder="🔍 Tìm kiếm bài viết"
            @input="searchItem"
          />
        </div>

        <!-- Article List -->
        <div class="col-12">
          <div v-if="paginatedItems.length > 0" class="row">
            <div
              v-for="item in paginatedItems"
              :key="item.id"
              class="col-12 mb-4"
            >
              <div class="card article-card">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      class="img-fluid rounded-start"
                      :src="url + item.image"
                      alt="Article Image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ item.name }}</h5>
                      <p class="card-text">{{ item.description }}</p>
                      <RouterLink
                        :to="{ name: 'articleDetail', params: { articleId: item.id } }"
                        class="btn btn-primary"
                      >
                        📜 Xem chi tiết
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center mt-5">
            <p>😞 Không tìm thấy bài viết nào.</p>
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

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userName: localStorage.getItem("name") || "", // Lấy thông tin người dùng nếu có
      items: [],
      keyword: "",
      filteredItems: [],
      url: "http://localhost/web_gioi_thieu_cty/company_web_laravel/storage/app/public/items",
      currentPage: 1,
      itemsPerPage: 5, 
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
    this.getItems();
  },
  methods: {
    getItems() {
      let headers = {};
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      axios
        .get("http://127.0.0.1:8000/api/article", { headers })
        .then((response) => {
          this.items = response.data.data;
          this.filteredItems = this.items;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchItem() {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
      this.currentPage = 1;
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

/* Article Card */
.article-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin-bottom: 20px;
}

.article-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Pagination */
.pagination-info {
  font-size: 1rem;
  font-weight: bold;
}
</style>
