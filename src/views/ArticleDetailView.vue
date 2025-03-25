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

          <!-- Add to Cart Button -->
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
      article: {}, // Thông tin chi tiết sản phẩm
      url: "http://localhost/web_gioi_thieu_cty/company_web_laravel/storage/app/public/items", // Đường dẫn hình ảnh
    };
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    this.getArticle();
  },
  methods: {
    // Lấy thông tin chi tiết sản phẩm từ API
    getArticle() {
      axios
        .get(`http://127.0.0.1:8000/api/article/${this.$route.params.articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.article = response.data.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            router.push({ name: "login" });
          }
          console.error(error);
        });
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCartAndRedirect(article) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
    router.push({ name: "login" });
    return;
  }

  // Kiểm tra nếu article không tồn tại hoặc không có id
  if (!article || !article.id) {
    alert("Bài viết. Dữ liệu sản phẩm không hợp lệ.");
    return;
  }

  axios
    .post(
      "http://127.0.0.1:8000/api/cart", // API thêm sản phẩm vào giỏ hàng
      {
        article_id: article.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      alert(`${article.name} đã được thêm vào giỏ hàng.`);
      router.push({ name: "cart" }); // Chuyển hướng đến trang giỏ hàng
    })
    .catch((error) => {
      if (error.response) {
        console.error("Lỗi từ API:", error.response.data);
        alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
      } else {
        console.error("Lỗi không xác định:", error);
        alert("Đã xảy ra lỗi. Vui lòng kiểm tra kết nối mạng.");
      }
    });
}
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