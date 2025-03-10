<template lang="">
    <div>
      <NavBar :name="userName" :role="roleId" />
      <div class="container mt-5">
        <div class="mb-3 w-50">
          <label for="month" class="form-label">Month:</label>
          <select class="form-control" id="month" v-model="month" @change="getReport()">
            <option value="">Choose Month Period</option>
            <option v-for="month in months" :value="month.value">
              {{ month.name }}
            </option>
          </select>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-sm-4">
              <div class="box">
                <label>Order Count</label>
                <label>{{ data.orderCount }}</label>
              </div>
            </div>
            <div class="col-12 col-sm-4">
              <div class="box">
                <label>Min Payment</label>
                <label>{{ data.minPayment }} vnd</label>
              </div>
            </div>
            <div class="col-12 col-sm-4">
              <div class="box">
                <label>Max Payment</label>
                <label>{{ data.maxPayment }} vnd</label>
              </div>
            </div>
          </div>
        </div>
  
        <hr class="my-5">
        <div class="col-12 mt-5">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Table No</th>
                <th scope="col">Order Date</th>
                <th scope="col">Time</th>
                <th scope="col">Total</th>
                <th scope="col">Waitress</th>
                <th scope="col">Cashier</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in paginatedOrders" :key="index">
                <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                <td>{{ order.customer_name }}</td>
                <td>{{ order.table_no }}</td>
                <td>{{ order.order_date }}</td>
                <td>{{ order.order_time }}</td>
                <td>{{ order.total }} vnd</td>
                <td>{{ order.waitress ? order.waitress.name : '-' }}</td>
                <td>{{ order.cashier ? order.cashier.name : '-' }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination Controls -->
          <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">Back</button>
              <span class="small">Page {{ currentPage }} of {{ totalPages }}</span>
              <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import router from '@/router'
  import axios from 'axios'
  
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        userName: '',
        roleId: '',
        months: [
          { value: 1, name: 'January' },
          { value: 2, name: 'February' },
          { value: 3, name: 'March' },
          { value: 4, name: 'April' },
          { value: 5, name: 'May' },
          { value: 6, name: 'June' },
          { value: 7, name: 'July' },
          { value: 8, name: 'August' },
          { value: 9, name: 'September' },
          { value: 10, name: 'October' },
          { value: 11, name: 'November' },
          { value: 12, name: 'December' },
        ],
        month: '',
        data: {
          orderCount: 0,
          minPayment: 0,
          maxPayment: 0,
          orders: []
        },
        currentPage: 1,
        itemsPerPage: 10
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.data.orders.length / this.itemsPerPage);
      },
      paginatedOrders() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.data.orders.slice(start, end);
      }
    },
    mounted() {
      this.userName = localStorage.getItem('name')
      this.roleId = localStorage.getItem('role_id')
  
      if (!this.userName || this.userName == '' || this.userName == null) {
        router.push({ name: 'login' })
      }
    },
    methods: {
      getReport() {
        axios.get('http://127.0.0.1:8000/api/order-report?month=' + this.month, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then((response) => {
            console.log(response.data)
            this.data = response.data.data
          })
          .catch(function (error) {
            if (error.response.status == 401) {
              localStorage.removeItem('token')
              localStorage.removeItem('email')
              localStorage.removeItem('name')
              localStorage.removeItem('role_id')
  
              router.push({ name: 'login' })
            }
            console.log(error);
            console.log('lỗi khi đăng nhập');
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
      }
    }
  }
  </script>
  
  <style scoped>
  .box {
    border: solid 1px;
    border-radius: 4px;
    padding: 30px;
    font-size: 24px;
  }
  
  .box label {
    display: block;
  }
  </style>