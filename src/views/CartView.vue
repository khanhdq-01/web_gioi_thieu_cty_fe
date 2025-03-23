<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <h1 class="text-center">🛒 Giỏ hàng của bạn</h1>
      <div v-if="cart.length > 0" class="shadow-lg p-4 rounded bg-white">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td>
                <img
                  :src="url + item.image"
                  alt="Product Image"
                  class="img-thumbnail"
                  style="width: 80px; height: 80px; object-fit: cover;"
                />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }} vnđ</td>
              <td>
                <span class="badge bg-primary fs-6">{{ item.quantity }}</span>
              </td>
              <td class="text-danger fw-bold">{{ item.price * item.quantity }} vnđ</td>
              <td>
                <button class="btn btn-danger btn-sm d-flex align-items-center" @click="removeFromCart(item.id)">
                  <span class="material-icons me-1">delete</span> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end mt-3">
          <h4 class="fw-bold text-danger">Tổng cộng: {{ totalPrice }} vnđ</h4>
          <button class="btn btn-success btn-lg mt-2 d-flex align-items-center" @click="checkout">
            <span class="material-icons me-2">shopping_cart</span> Thanh toán
          </button>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="fs-5 text-muted">Giỏ hàng của bạn đang trống.</p>
        <RouterLink to="/" class="btn btn-primary">Tiếp tục mua sắm</RouterLink>
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
      cart: [], // Khởi tạo cart là một mảng rỗng
      url: "http://localhost/web_ban_hang/web_ban_hang_backend/storage/app/public/items/",
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");
    this.getCart();
  },
  methods: {
    getCart() {
      axios
        .get("http://127.0.0.1:8000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Giỏ hàng:", response.data.data);
          this.cart = response.data.data || []; // Đảm bảo cart luôn là một mảng
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        });
    },
    removeFromCart(productId) {
      axios
        .delete(`http://127.0.0.1:8000/api/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.cart = this.cart.filter((item) => item.id !== productId);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
        });
    },
    checkout() {
      axios
        .post("http://127.0.0.1:8000/api/cart/place-order", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Thanh toán thành công! Đơn hàng của bạn đã được tạo.");
          router.push("/order-list"); // Chuyển hướng sang danh sách đơn hàng
        })
        .catch((error) => {
          console.error("Lỗi khi thanh toán:", error);
          alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
}

h1 {
  color: #1976D2; /* Màu xanh Material Design */
  font-weight: bold;
}

.table thead {
  background-color: #1976D2;
  color: white;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}

.img-thumbnail {
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
}

.img-thumbnail:hover {
  transform: scale(1.1);
}

.btn-danger, .btn-success {
  border-radius: 25px;
  font-weight: bold;
  padding: 8px 16px;
}

.btn-danger {
  background-color: #d32f2f;
}

.btn-danger:hover {
  background-color: #b71c1c;
}

.btn-success {
  background-color: #388E3C;
}

.btn-success:hover {
  background-color: #2E7D32;
}

.text-end h4 {
  color: #D32F2F;
  font-weight: bold;
}

</style>