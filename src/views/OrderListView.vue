<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <h2 class="text-center mt-3">Danh sách đơn hàng</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="6" class="text-center">Không có đơn hàng nào.</td>
          </tr>
          <tr v-for="(order, index) in paginatedOrders" :key="order.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td>{{ order.customer?.name || 'N/A' }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.total.toLocaleString() }} vnđ</td>
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">Trước</button>
        <span class="small">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">Tiếp</button>
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
      orders: [], // Danh sách đơn hàng
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 10, // Số lượng đơn hàng trên mỗi trang
      showConfirmPopup: false, // Hiển thị popup xác nhận xóa
      showSuccessPopup: false, // Hiển thị popup thông báo xóa thành công
      selectedOrderId: null, // ID đơn hàng được chọn để xóa
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.orders.slice(start, end);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
    this.getOrders();
  },
  methods: {
    getOrders() {
  axios
    .get("http://127.0.0.1:8000/api/order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      this.orders = response.data.data || [];
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("role_id");
        router.push({ name: "login" });
      }
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
.popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  color: white;
  width: 300px;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: black;
}

.popup-content.success {
  background: #28a745;
  color: white;
}

.table {
  font-size: 0.9rem;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>