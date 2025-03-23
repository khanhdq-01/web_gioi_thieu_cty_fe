<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <div class="row">
        <!-- Product Image -->
        <div class="col-md-6">
          <img
            :src="url + product.image"
            alt="Product Image"
            class="img-fluid rounded"
          />
        </div>

        <!-- Product Details -->
        <div class="col-md-6">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-price text-warning">Giá: {{ product.price }} vnđ</p>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-stock">
            <strong>Tồn kho:</strong> {{ product.stock }}
          </p>

          <!-- Add to Cart Button -->
<!-- Sửa nút Thêm vào giỏ hàng -->
        <button
          class="btn btn-primary btn-lg mt-3"
          @click="addToCartAndRedirect(product)"
        >
          Thêm vào giỏ hàng
        </button>
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
      product: {}, // Thông tin chi tiết sản phẩm
      url: "http://localhost/web_ban_hang/web_ban_hang_backend/storage/app/public/items/", // Đường dẫn hình ảnh
    };
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    this.getProduct();
  },
  methods: {
    // Lấy thông tin chi tiết sản phẩm từ API
    getProduct() {
      axios
        .get(`http://127.0.0.1:8000/api/product/${this.$route.params.orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.product = response.data.data;
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
    addToCartAndRedirect(product) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
    router.push({ name: "login" });
    return;
  }

  // Kiểm tra nếu product không tồn tại hoặc không có id
  if (!product || !product.id) {
    alert("Không thể thêm sản phẩm vào giỏ hàng. Dữ liệu sản phẩm không hợp lệ.");
    return;
  }

  axios
    .post(
      "http://127.0.0.1:8000/api/cart", // API thêm sản phẩm vào giỏ hàng
      {
        product_id: product.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      alert(`${product.name} đã được thêm vào giỏ hàng.`);
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
.product-title {
  font-size: 2rem;
  font-weight: bold;
}

.product-price {
  font-size: 1.5rem;
}

.product-description {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.product-stock {
  font-size: 1rem;
  margin-top: 1rem;
}

.img-fluid {
  max-height: 400px;
  object-fit: cover;
}
</style>