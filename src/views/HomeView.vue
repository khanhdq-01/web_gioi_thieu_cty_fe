<template>
  <div>
    <NavBar :name="userName" :role="roleId" />

<!-- About Us Section -->
      <section class="about-us">
        <div class="container">
          <div class="about-content">
            <h2>Welcome to Our Company</h2>
            <p>
              We are committed to delivering high-quality products and services to our customers. 
              With years of experience in the industry, we strive to innovate and provide the best solutions 
              tailored to your needs.
            </p>
            <p>
              Our team consists of passionate professionals dedicated to excellence and customer satisfaction. 
              We believe in transparency, integrity, and continuous improvement.
            </p>
          </div>
        </div>
      </section>


<!-- Best Selling Products Section -->
    <section class="best-selling-products text-center my-5">
      <h2 class="mb-4">Best Selling Products</h2>
      <div class="container">
        <div class="row justify-content-center">
          <div v-for="(product, index) in bestSellingProducts" :key="index" class="col-md-4 mb-4">
            <div class="card">
              <img :src="product.image ? url + product.image : require('@/assets/images/no-image.png')" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-warning">${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Hero Section -->
    <section class="hero d-flex align-items-center justify-content-center text-center">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to Our Restaurant</h1>
        <p class="hero-subtitle">Experience the best cuisine with a touch of elegance</p>
        <RouterLink to="/order">
          <button class="btn btn-warning mt-3 btn-lg">Book a Table</button>
        </RouterLink>
      </div>
    </section>

    <!-- Contact Section -->
    <footer class="text-center text-lg-start bg-body-tertiary text-muted">
      <!-- Section: Social media -->
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <!-- Left -->

        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Products
              </h6>
              <p>
                <a href="#!" class="text-reset">Angular</a>
              </p>
              <p>
                <a href="#!" class="text-reset">React</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Vue</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Laravel</a>
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <a href="#!" class="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Help</a>
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import axios from 'axios'

export default {
  components: { NavBar },
  data() {
    return {
      userName: '',
      roleId: '',
      items: [],
      bestSellingProducts: [],
      url: 'http://localhost/web_ban_hang/web_ban_hang_backend/storage/app/public/items/'
    }
  },
  mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    if (!this.userName || this.userName === '' || this.userName == null) {
      router.push({ name: 'login' });
    }
    if (this.roleId != 1) {
      router.push({ name: 'home' });
    }
    this.getItems();
    this.fetchBestSellingProducts();
  },
  methods: {
    getItems() {
      axios.get('http://127.0.0.1:8000/api/item', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        this.items = response.data.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.removeItem('role_id');
          router.push({ name: 'login' });
        }
        console.error(error);
        console.log('Lỗi khi đăng nhập');
      });
    },
    fetchBestSellingProducts() {
      axios.get('http://127.0.0.1:8000/api/top-dishes', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        this.bestSellingProducts = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>
.best-selling-products {
  width: 62%; /* Chiếm 2/3 màn hình */
  max-width: 900px; /* Giới hạn tối đa */
  margin: 0 auto; /* Căn giữa */
}

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

h2 {
  font-size: 28px;
  font-weight: bold;
}

.carousel-container {
  height: 50vh;
  overflow: hidden;
}

.carousel-img {
  height: 100%;
  object-fit: cover;
}

.hero {
  height: 50vh;
  background: url('@/assets/images/hero-background.jpg') no-repeat center center;
  background-size: cover;
  color: rgb(62, 55, 55);
  padding: 20px;
}

.hero {
  height: 30vh; /* Giảm chiều cao của phần hero */
  background: url('@/assets/images/hero-background.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 20px;
}

.hero-content {
  background: rgba(0, 0, 0, 0.5); /* Làm nền của nội dung hero tối hơn */
  padding: 20px;
  border-radius: 10px;
}

.hero-title {
  font-size: 2.5rem; /* Giảm kích thước phông chữ của tiêu đề */
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.2rem; /* Giảm kích thước phông chữ của phụ đề */
  margin-bottom: 20px;
}

.best-selling-products .card {
  height: 100%;
}

.best-selling-products .card-img-top {
  height: 200px;
  object-fit: cover;
}

.about-us {
  background: #f8f9fa;
  padding: 60px 20px;
  text-align: center;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-content h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.about-content p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

</style>