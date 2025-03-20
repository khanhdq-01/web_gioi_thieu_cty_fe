<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container mt-5">
      <h3 class="mb-4 text-center">Báo cáo đơn hàng</h3>

      <!-- Bộ lọc tháng -->
      <div class="mb-3 w-50 mx-auto">
        <label for="month" class="form-label">Chọn tháng:</label>
        <select class="form-control" id="month" v-model="month" @change="getReport">
          <option value="">Chọn khoảng thời gian</option>
          <option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.name }}
          </option>
        </select>
      </div>

      <!-- Thống kê tổng quan -->
      <div class="row text-center mt-4">
        <div class="col-12 col-sm-4">
          <div class="box">
            <label>Số lượng đơn hàng</label>
            <label class="text-primary">{{ data.orderCount }}</label>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="box">
            <label>Thanh toán thấp nhất</label>
            <label class="text-success">{{ data.minPayment }} vnđ</label>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="box">
            <label>Thanh toán cao nhất</label>
            <label class="text-danger">{{ data.maxPayment }} vnđ</label>
          </div>
        </div>
      </div>

      <!-- Danh sách đơn hàng -->
      <hr class="my-5">
      <div class="col-12 mt-5">
        <h5 class="mb-3">Danh sách đơn hàng</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên khách hàng</th>
              <th>Bàn số</th>
              <th>Ngày đặt</th>
              <th>Thời gian</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedOrders.length === 0">
              <td colspan="6" class="text-center">Không có đơn hàng nào trong tháng này.</td>
            </tr>
            <tr v-for="(order, index) in paginatedOrders" :key="index">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ order.customer_name }}</td>
              <td>{{ order.table_no }}</td>
              <td>{{ order.order_date }}</td>
              <td>{{ order.order_time }}</td>
              <td>{{ order.total }} vnđ</td>
            </tr>
          </tbody>
        </table>

        <!-- Điều hướng phân trang -->
        <div class="d-flex justify-content-center mt-3">
          <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">Trước</button>
          <span class="small">Trang {{ currentPage }} / {{ totalPages }}</span>
          <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">Tiếp</button>
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
      months: [
        { value: 1, name: "Tháng 1" },
        { value: 2, name: "Tháng 2" },
        { value: 3, name: "Tháng 3" },
        { value: 4, name: "Tháng 4" },
        { value: 5, name: "Tháng 5" },
        { value: 6, name: "Tháng 6" },
        { value: 7, name: "Tháng 7" },
        { value: 8, name: "Tháng 8" },
        { value: 9, name: "Tháng 9" },
        { value: 10, name: "Tháng 10" },
        { value: 11, name: "Tháng 11" },
        { value: 12, name: "Tháng 12" },
      ],
      month: "",
      data: {
        orderCount: 0,
        minPayment: 0,
        maxPayment: 0,
        orders: [],
      },
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      if (!Array.isArray(this.data.orders)) {
        return 0; // Trả về 0 nếu không phải là mảng
      }
      return Math.ceil(this.data.orders.length / this.itemsPerPage);
    },
    paginatedOrders() {
      if (!Array.isArray(this.data.orders)) {
        return [];
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.orders.slice(start, end);
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName || this.userName === "" || this.userName == null) {
      router.push({ name: "login" });
    }
  },
  methods: {
    getReport() {
      if (!this.month) {
        alert("Vui lòng chọn tháng để xem báo cáo!");
        return;
      }

      axios
        .get(`http://127.0.0.1:8000/api/order-report?month=${this.month}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.data) {
            this.data = response.data.data;
          } else {
            this.data.orders = [];
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            router.push({ name: "login" });
          }
          console.error("Lỗi khi tải báo cáo:", error);
          alert("Không thể tải báo cáo, vui lòng thử lại!");
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
.box {
  border: solid 1px #ccc;
  border-radius: 8px;
  padding: 20px;
  font-size: 1.2rem;
  background-color: #f8f9fa;
  margin-bottom: 20px;
}

.box label {
  display: block;
  font-weight: bold;
}

.text-primary {
  color: #007bff;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}
</style>