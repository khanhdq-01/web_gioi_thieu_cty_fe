<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <div class="row">
        <!-- Article Image -->
        <div class="col-md-6">
          <img
            :src="url + article.image"
            alt="Article Image"
            class="img-fluid rounded"
          />
        </div>
        <!-- Article Details -->
        <div class="col-md-6">
          <h1 class="article-title">{{ article.name }}</h1>
          <p class="article-description">{{ article.description }}</p>
          <button class="btn btn-secondary flex-grow-1" type="button" @click="cancel">Hủy</button>
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
      userName: localStorage.getItem("name") || "", // Không bắt buộc phải có user
      roleId: localStorage.getItem("role_id") || "",
      article: {}, // Thông tin chi tiết sản phẩm
      url: "http://localhost/web_gioi_thieu_cty/company_web_laravel/storage/app/public/items", // Đường dẫn hình ảnh
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios
        .get(`http://127.0.0.1:8000/api/article/${this.$route.params.articleId}`)
        .then((response) => {
          this.article = response.data.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy bài viết:", error);
        });
    },
    addToCartAndRedirect(article) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
        router.push({ name: "login" });
        return;
      }
      axios
        .post(
          "http://127.0.0.1:8000/api/cart",
          {
            article_id: article.id,
            quantity: 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert(`${article.name} đã được thêm vào giỏ hàng.`);
          router.push({ name: "cart" });
        })
        .catch((error) => {
          console.error("Lỗi khi thêm vào giỏ hàng:", error);
          alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
        });
      },
    cancel() {
      router.push({ name: "article" });
    },
  },
};
</script>


<style scoped>
.article-title {
  font-size: 2rem;
  font-weight: bold;
}

.article-price {
  font-size: 1.5rem;
}

.article-description {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.article-stock {
  font-size: 1rem;
  margin-top: 1rem;
}

.img-fluid {
  max-height: 400px;
  object-fit: cover;
}
</style>