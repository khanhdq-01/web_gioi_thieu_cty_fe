<template lang="">
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container-fluid mt-5">
      <div class="row">
        <!-- item list -->
        <div class="col-12 col-sm-8 mb-3">
          <div class="col-12">
            <input type="text" v-model="keyword" class="form-control" placeholder="Search Here" @input="searchItem()" />
          </div>

          <hr />
          <!--item list box-->
          <div class="col-12 ">
            <div class="row">
              <div v-for="item in paginatedItems" :key="item.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card">
                  <img class="card-img-top object-fit-cover" height="250px" :src="url + item.image" alt="Card image cap">
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">{{ item.price }}</p>
                    <p><button class="btn btn-success" @click="orderItem(item.id)">Order</button></p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination Controls -->
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-outline-primary btn-sm me-2" :disabled="currentPage === 1" @click="prevPage">Back</button>
              <span class="small">Page {{ currentPage }} of {{ totalPages }}</span>
              <button class="btn btn-outline-primary btn-sm ms-2" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
            </div>
          </div>
        </div>
        <!-- ordered item -->
        <div class="col-12 col-sm-4 mb-3 order-box">
          <h2>Order List</h2>
          <div class="mb-5">
            <div class="mb-3">
              <label class="customerName" id="form-label">Customer Name</label>
              <input type="text" class="form-control" id="customerName" v-model="customerName">
            </div>
            <div class="mb-3">
              <label class="tableNo" id="form-label">table No.</label>
              <input type="text" class="form-control" id="tableNo" v-model="tableNo">
            </div>
          </div>
          <hr>
          <div class="item-box">
            <div v-for="order in orders" :key="order.id" class="mb-3">
              <div class="d-flex justify-content-between">
                <span>{{ order.name }} (x{{ order.qty }})</span>
                <span>{{ order.price }} vnđ</span>
              </div>
              <div>
                <span style="font-size: 18px" class="text-muted"> xx vnđ</span>
                <div>
                  <button class="btn btn-sm btn-outline-info me-2" @click="decreaseItemQty(order)">-</button>
                  <button class="btn btn-sm btn-outline-success me-2" @click="increaseItemQty(order)">+</button>
                  <button class="btn btn-sm btn-outline-danger" @click="deleteItem(order)">delete</button>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
          <hr>
          <div class="total-box">
            <div class="d-flex justify-content-between">
              <span>total</span>
              <span>{{ total }} vnđ</span>
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-success form-control" :disabled="processing" @click="submitOrder()">{{ processing ? 'Processing Order' : 'submit' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="popup">
          <div class="popup-content success">
            <p>Đã xóa đơn hàng thành công!</p>
          </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import router from '@/router';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      userName: '',
      roleId: '',
      items: [],
      keyword: '',
      filteredItems: [],
      url: 'http://localhost/web_order_food/be_order_food/storage/app/public/items/',
      orders: [],
      total: 0,
      customerName: '',
      tableNo: '',
      processing: false,
      currentPage: 1,
      itemsPerPage: 12,
      showSuccessPopup: false
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    }
  },
  mounted() {
    this.userName = localStorage.getItem('name')
    this.roleId = localStorage.getItem('role_id')
    if (!this.userName || this.userName == '' || this.userName == null) {
      router.push({ name: 'login' })
    }
    if (this.roleId != 4 && this.roleId != 1) {
      router.push({ name: 'home' })
    }
    this.getItems()
  },
  methods: {
    getItems() {
      axios.get('http://127.0.0.1:8000/api/item', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          this.items = response.data.data
          this.filteredItems = this.items; // Initialize filteredItems with all items
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
    searchItem() {
      this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()))
      this.currentPage = 1; // Reset to the first page after search
    },
    orderItem(id) {
      let item = this.filteredItems.filter(item => item.id == id)[0]
      let orderItem = Object.assign({}, item)
      orderItem.eachPrice = item.price

      let indexOfArrayItem = this.orders.map(e => e.id).indexOf(orderItem.id)

      if (indexOfArrayItem != -1) {
        this.orders[indexOfArrayItem].qty++

        this.orders[indexOfArrayItem].price = this.orders[indexOfArrayItem].eachPrice * this.orders[indexOfArrayItem].qty
      }
      else {
        orderItem.qty = 1
        this.orders.push(orderItem)
      }

      let orderPrice = this.orders.map(order => order.price)
      let priceTotal = 0

      orderPrice.forEach(price => {
        priceTotal += price
      })
      this.total = priceTotal
    },
    decreaseItemQty(item) {
      if (item.qty <= 1) {
        return
      }
      let indexOfArrayItem = this.orders.map(e => e.id).indexOf(item.id)
      this.orders[indexOfArrayItem].qty--
      this.orders[indexOfArrayItem].price = this.orders[indexOfArrayItem].eachPrice * this.orders[indexOfArrayItem].qty

      let orderPrice = this.orders.map(order => order.price)
      let priceTotal = 0
      orderPrice.forEach(price => {
        priceTotal += price
      })
      this.total = priceTotal
    },
    increaseItemQty(item) {
      let indexOfArrayItem = this.orders.map(e => e.id).indexOf(item.id)
      this.orders[indexOfArrayItem].qty++
      this.orders[indexOfArrayItem].price = this.orders[indexOfArrayItem].eachPrice * this.orders[indexOfArrayItem].qty

      let orderPrice = this.orders.map(order => order.price)
      let priceTotal = 0
      orderPrice.forEach(price => {
        priceTotal += price
      })
      this.total = priceTotal
    },
    deleteItem(item) {
      let indexOfArrayItem = this.orders.map(e => e.id).indexOf(item.id)
      this.orders.splice(indexOfArrayItem, 1)

      let orderPrice = this.orders.map(order => order.price)
      let priceTotal = 0
      orderPrice.forEach(price => {
        priceTotal += price
      })
      this.total = priceTotal
    },
    submitOrder() {
      if (this.customerName == '' || this.tableNo == '') {
        alert('customer name and table no cannot empty')
        return;
      }

      let item = this.orders.map(item => {
        return {
          id: item.id,
          qty: item.qty
        }
      })
      console.log(item)
      // let itemId = this.orders.map(item => item.id)
      this.processing = true

      axios.post('http://127.0.0.1:8000/api/order', {
        'customer_name': this.customerName,
        'table_no': this.tableNo,
        'items': item
      },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          console.log(response)
          this.showSuccessPopup = true
          setTimeout(() => {
            this.showSuccessPopup = false
          }, 500)
          this.orders = []
          this.customerName = ''
          this.tableNo = ''
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
        })
        .finally(() => {
          this.processing = false
        })
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

<style>
.order-box {
  border-left: solid 1px #ccc;
}
.item-box {
  font-size: 24px;
}
.total-box {
  font-size: 26px;
  font-weight: bold;
}
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
</style>