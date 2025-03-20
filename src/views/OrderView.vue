<template lang="">
  <div>
    <NavBar :name="userName" :role="roleId" />
    <div class="container-fluid mt-5">
      <div class="row">
        <!-- Product List -->
        <div class="col-12">
          <div class="col-12 mb-3">
            <input type="text" v-model="keyword" class="form-control" placeholder="Search Here" @input="searchItem()" />
          </div>

          <hr />
          <!-- Product List Box -->
          <div class="col-12">
            <div class="row">
              <div v-for="item in paginatedItems" :key="item.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card">
                  <img class="card-img-top object-fit-cover" height="250px" :src="url + item.image" alt="Product Image">
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text text-warning">{{ item.price }} vnđ</p>
                    <p><button class="btn btn-primary" @click="addToCart(item)">Add to Cart</button></p>
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
      url: 'http://localhost/web_ban_hang/web_ban_hang_backend/storage/app/public/items/',
      cart: [], // Giỏ hàng
      currentPage: 1,
      itemsPerPage: 12
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
    if (!this.userName || this.userName === '' || this.userName == null) {
      router.push({ name: 'login' })
    }
    this.getItems()
  },
  methods: {
    getItems() {
      axios.get('http://127.0.0.1:8000/api/product', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          this.items = response.data.data
          this.filteredItems = this.items; // Initialize filteredItems with all items
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            localStorage.removeItem('role_id')
            router.push({ name: 'login' })
          }
          console.error(error);
        });
    },
    searchItem() {
      this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()))
      this.currentPage = 1; // Reset to the first page after search
    },
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
      alert(`${item.name} has been added to the cart.`);
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
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  background: #fff;
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}
</style>