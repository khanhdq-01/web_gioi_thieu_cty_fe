<template>
    <div>
      <NavBar :name="userName" :role="roleId" />
      <div class="container">
        <h2 class="my-5">Product List</h2>
  
        <a href="/product-add" class="btn btn-success mb-5">Add Product</a>
  
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedItems" :key="index">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>
                <img v-if="item.image" :src="url + item.image" class="object-fit-cover" style="width:100px; height:100px">
                <img v-else src="@/assets/images/no-image.png" class="object-fit-cover" style="width:100px; height:100px">
              </td>
              <td>
                <RouterLink :to="{ name: 'productUpdate', params: { productId: item.id } }">Edit</RouterLink> |
                <button @click="confirmDelete(item.id)" class="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal Xác nhận Xóa -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal-content">
            <h5>Xác nhận xóa</h5>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            <button @click="cancelDelete" class="btn btn-secondary">Hủy</button>
            <button @click="deleteItem" class="btn btn-danger">Xóa</button>
          </div>
        </div>
  
        <!-- Modal Thông báo Xóa Thành Công -->
        <div v-if="showSuccessModal" class="modal-overlay">
          <div class="modal-content">
            <p>Xóa sản phẩm thành công!</p>
          </div>
        </div>
  
        <!-- Pagination Controls -->
        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-outline-primary me-2" :disabled="currentPage === 1" @click="prevPage">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button class="btn btn-outline-primary ms-2" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
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
        items: [],
        url: 'http://localhost/web_order_food/be_order_food/storage/app/public/items/',
        currentPage: 1,
        itemsPerPage: 10,
        selectedItemId: null,
        showConfirmModal: false,
        showSuccessModal: false
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
      paginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
      }
    },
    mounted() {
      this.userName = localStorage.getItem('name')
      this.roleId = localStorage.getItem('role_id')
      if (!this.userName || this.userName == '' || this.userName == null) {
        router.push({ name: 'login' })
      }
      if (this.roleId != 4) {
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
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.removeItem('token')
              localStorage.removeItem('email')
              localStorage.removeItem('name')
              localStorage.removeItem('role_id')
  
              router.push({ name: 'login' })
            }
            console.log('Lỗi khi tải danh sách sản phẩm:', error);
          });
      },
  
      confirmDelete(id) {
        this.selectedItemId = id;
        this.showConfirmModal = true;
      },
  
      cancelDelete() {
        this.selectedItemId = null;
        this.showConfirmModal = false;
      },
  
      deleteItem() {
        if (!this.selectedItemId) return;
  
        axios.delete(`http://127.0.0.1:8000/api/item/${this.selectedItemId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(() => {
            this.items = this.items.filter(item => item.id !== this.selectedItemId);
            this.showConfirmModal = false;
            this.showSuccessModal = true;
  
            setTimeout(() => {
              this.showSuccessModal = false;
            }, 500);
          })
          .catch((error) => {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Không thể xóa sản phẩm, vui lòng thử lại!");
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
  
  <style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px; /* Giảm kích thước chiều rộng */
    max-width: 90%; /* Đảm bảo popup không vượt quá 90% chiều rộng màn hình */
  }
  </style>
  