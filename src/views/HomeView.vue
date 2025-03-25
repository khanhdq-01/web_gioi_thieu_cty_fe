<template>
  <div>
    <NavBar :name="userName" :role="roleId" />

    <!-- Hero Section -->
    <section class="hero d-flex align-items-center justify-content-center text-center">
  <div class="hero-content">
    <h1 class="hero-title">Empowering Your Business</h1>
    <p class="hero-subtitle">Providing cutting-edge technology solutions</p>
    <RouterLink to="/article">
      <button class="btn btn-warning mt-3 btn-lg shadow-lg">Explore Our Projects</button>
    </RouterLink>
  </div>
</section>
<section class="services py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-5">Our Services</h2>
    <div class="row">
      <div class="col-md-4" v-for="(service, index) in services" :key="index">
        <div class="card service-card text-center p-4">
          <div class="card-body">
            <i :class="service.icon + ' service-icon'"></i>
            <h5 class="card-title mt-3">{{ service.title }}</h5>
            <p class="card-text">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- About Us Section -->
    <section class="about-us py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="@/assets/images/no-image.png" alt="Placeholder Image" />
          </div>
          <div class="col-md-6">
            <h2 class="about-title">About Us</h2>
            <p class="about-text">
              We are a leading company in the industry, dedicated to providing innovative solutions and exceptional
              services to our clients. With years of experience and a team of passionate professionals, we strive to
              deliver excellence in every project we undertake.
            </p>
            <p class="about-text">
              Our mission is to empower businesses with cutting-edge technology and creative strategies that drive growth
              and success. We believe in building long-term relationships with our clients based on trust, transparency,
              and mutual respect.
            </p>
            <button class="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Our Services</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card service-card">
              <div class="card-body">
                <i class="fas fa-laptop-code service-icon"></i>
                <h5 class="card-title">Web Development</h5>
                <p class="card-text">
                  We create responsive and user-friendly websites tailored to your business needs.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card service-card">
              <div class="card-body">
                <i class="fas fa-mobile-alt service-icon"></i>
                <h5 class="card-title">Mobile Apps</h5>
                <p class="card-text">
                  Develop high-performance mobile applications for iOS and Android platforms.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card service-card">
              <div class="card-body">
                <i class="fas fa-chart-line service-icon"></i>
                <h5 class="card-title">Digital Marketing</h5>
                <p class="card-text">
                  Boost your online presence with our effective digital marketing strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Team</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/no-image.png" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">John Doe</h5>
                <p class="card-text">CEO & Founder</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/no-image.png" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">Jane Smith</h5>
                <p class="card-text">CTO</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/no-image.png" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">Mike Johnson</h5>
                <p class="card-text">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Contact Us</h2>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Your Name" v-model="formData.name" required />
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Your Email" v-model="formData.email" required />
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control" placeholder="Your Phone" v-model="formData.phone" required />
              </div>
              <div class="mb-3">
                <textarea class="form-control" rows="5" placeholder="Your Message" v-model="formData.message" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
            <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="user-infos py-5">
      <div class="container">
        <h2 class="text-center mb-5">Giới thiệu công ty</h2>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>title</th>
                  <th>content</th>
                  <th>image</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="company in companyProfile" :key="company.id">
                  <td>{{ company.title }}</td>
                  <td>{{ company.content }}</td>
                  <td><img :src="company.image" alt="Company image" style="max-width: 100px;"></td>
                  <td> 
                    <button @click="deleteCompanyProfile(company.id)" class="btn btn-danger btn-sm">
                        Xóa
                    </button>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
 <!-- add dữ liệu công ty Section -->
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-dark text-white">
      <div class="container p-4">
        <div class="row">
          <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase">Our Company</h5>
            <p>
              We are dedicated to delivering innovative solutions and exceptional services to our clients. Join us on
              this journey of growth and success.
            </p>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Quick Links</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#!" class="text-white">Home</a>
              </li>
              <li>
                <a href="#!" class="text-white">About Us</a>
              </li>
              <li>
                <a href="#!" class="text-white">Services</a>
              </li>
              <li>
                <a href="#!" class="text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Contact</h5>
            <ul class="list-unstyled">
              <li>
                <i class="fas fa-map-marker-alt"></i> 123 Main Street, New York, NY 10012
              </li>
              <li>
                <i class="fas fa-phone"></i> +1 234 567 890
              </li>
              <li>
                <i class="fas fa-envelope"></i> info@example.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 Copyright:
        <a class="text-white" href="#">YourCompany.com</a>
      </div>
    </footer>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
  components: { NavBar },
  data() {
    return {
      userName: '',
      services: [
        { title: "Web Development", description: "Modern and responsive web applications.", icon: "fas fa-laptop-code" },
        { title: "Mobile Apps", description: "Build native & cross-platform apps.", icon: "fas fa-mobile-alt" },
        { title: "Digital Marketing", description: "Grow your online presence.", icon: "fas fa-chart-line" }
      ],
      roleId: '',
      formData: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
      companyProfile: [],
      successMessage: '',
      errorMessage: '',
    };
  },
  mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    if (!this.userName || this.userName === '' || this.userName == null) {
      this.$router.push({ name: 'login' });
    }
    if (this.roleId != 1) {
      this.$router.push({ name: 'home' });
    }
    this.fetchCompanyProfile();
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/user-info', this.formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.successMessage = response.data.message;
        this.errorMessage = '';
        this.formData = { name: '', email: '', phone: '', message: '' }; // Reset form
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
        this.successMessage = '';
      }
    },
    async fetchCompanyProfile() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/company-profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Full API response:", response); // Kiểm tra toàn bộ phản hồi
    console.log("Response data:", response.data); // Kiểm tra cấu trúc data
    
    // Thay đổi logic kiểm tra phản hồi
    if (response.data && Array.isArray(response.data)) {
      this.companyProfile = response.data; // Nếu API trả về trực tiếp mảng
    } else if (response.data && response.data.data) {
      this.companyProfile = response.data.data; // Nếu API trả về qua trường data
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error('Error fetching company profiles:', error);
    alert("Không thể tải dữ liệu. Vui lòng thử lại!");
  }
},

async deleteCompanyProfile(id) {
  if (!confirm("Bạn chắc chắn muốn xóa?")) return;
  
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    await axios.delete(`http://127.0.0.1:8000/api/company-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    this.companyProfile = this.companyProfile.filter(company => company.id !== id);
    alert("Xóa thành công!");
  } catch (error) {
    console.error("Error deleting company profile:", error);
    alert(`Xóa thất bại! ${error.message}`);
  }
}
  },
};
</script>
<style scoped>
/* Hero section */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
              url('@/assets/images/hero-bg.jpg') center/cover no-repeat;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  animation: fadeIn 1.5s ease-in-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-top: 10px;
  opacity: 0.9;
}

/* About section */
.about-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

/* Button Custom */
.btn-warning {
  transition: all 0.3s ease-in-out;
}

.btn-warning:hover {
  background-color: #ff8800;
  color: white;
  transform: scale(1.05);
}

/* Service Section */
.service-card {
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  color: #007bff;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>