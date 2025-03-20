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
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in paginatedOrders" :key="order.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td>{{ order.customer_name }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.total }} vnđ</td>
            <td>{{ order.status }}</td>
            <td>
              <RouterLink :to="{ name: 'orderDetail', params: { orderId: order.id } }" class="btn btn-info btn-sm">
                Xem chi tiết
              </RouterLink>
              <button class="btn btn-danger btn-sm ms-2" @click="confirmDelete(order.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">Trước</button>
        <span class="small">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">Tiếp</button>
      </div>

      <!-- Popup xác nhận xóa -->
      <div v-if="showConfirmPopup" class="popup">
        <div class="popup-content">
          <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>
          <button class="btn btn-danger" @click="deleteOrder">Xóa</button>
          <button class="btn btn-secondary" @click="showConfirmPopup = false">Hủy</button>
        </div>
      </div>

      <!-- Popup thông báo xóa thành công -->
      <div v-if="showSuccessPopup" class="popup">
        <div class="popup-content success">
          <p>Đã xóa đơn hàng thành công!</p>
        </div>
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
      orders: [],
      currentPage: 1,
      itemsPerPage: 10,
      showConfirmPopup: false,
      showSuccessPopup: false,
      selectedOrderId: null,
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
          this.orders = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");

            router.push({ name: "login" });
          }
          console.error(error);
        });
    },
    confirmDelete(orderId) {
      this.selectedOrderId = orderId;
      this.showConfirmPopup = true;
    },
    deleteOrder() {
      if (!this.selectedOrderId) return;

      axios
        .delete(`http://127.0.0.1:8000/api/orders/${this.selectedOrderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.orders = this.orders.filter((order) => order.id !== this.selectedOrderId);
          this.showConfirmPopup = false;
          this.showSuccessPopup = true;

          setTimeout(() => {
            this.showSuccessPopup = false;
          }, 1000);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa đơn hàng:", error);
          this.showConfirmPopup = false;
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