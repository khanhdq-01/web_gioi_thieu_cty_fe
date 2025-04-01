<template>
  <NavBar :name="userName" />

  <section class="hero-details" v-if="achievementData">
    <div class="achievement-details">
      <h3>Chi tiết bài viết</h3>
    </div>

    <div class="achievement-item-details">
      <div class="achievement-image-details" v-if="achievementData.image_path">
        <img :src="url + achievementData.image_path" class="achievement-image" />
      </div>
      <div class="achievement-text-details">
        <h5 class="achievement-tilte-detail">{{ achievementData.title }}</h5>
        <p class="achievement-category-detail">{{ achievementData.category }}</p>
        <p class="achievement-date-detail">{{ achievementData.date }}</p>
        <p class="achievement-date-detail">{{ achievementData.summany }}</p>
        <p class="achievement-description-detail">{{ achievementData.description }}</p>
      </div>
    </div>

    <div class="mb-3">
      <router-link to="/achievement" class="btn btn-secondary ms-2">Quay lại</router-link>
    </div>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      achievementData: null, // ban đầu là null
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/',
      userName: localStorage.getItem('name') || '',
    };
  },
  mounted() {
    this.fetchachievementData();
  },
  methods: {
    async fetchachievementData() {
      const token = localStorage.getItem("token");
      const achievementId = this.$route.params.achievementId;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/achievements/${achievementId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.achievementData = response.data;
        console.log("achievement fetched:", this.achievementData);
      } catch (error) {
        console.error("Error fetching achievement data:", error);
      }
    },
  },
};
</script>
<style scoped>
/* achievement-details.css */
.hero-details {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e0e7ff 100%); /* Light tech gradient */
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: #1a1a1a;
}

/* Subtle Particle Background */
.hero-details::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(125, 211, 252, 0.1) 2px, transparent 2px);
  background-size: 30px 30px;
  animation: float 15s infinite linear;
  opacity: 0.2;
  z-index: 0;
}

@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-30px); }
}

/* Title Section */


.achievement-details h3 {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(45deg, #7dd3fc, #c6c6c6, #7dd3fc);
  background-size: 200%;
  -webkit-background-clip: text;
  justify-self: center;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 15px rgba(125, 211, 252, 0.5);
  animation: gradientShift 4s ease-in-out infinite, fadeInGlow 1s ease-out;
}

/* Neon Underline */
.achievement-details h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #7dd3fc, #f9a8d4, transparent);
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(125, 211, 252, 0.5);
  animation: glowPulse 2s infinite ease-in-out;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeInGlow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 15px rgba(125, 211, 252, 0.5); }
  50% { box-shadow: 0 0 25px rgba(125, 211, 252, 0.8); }
}

/* Content Section */
.achievement-item-details {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95); /* Glassmorphism */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(125, 211, 252, 0.3);
  padding: 2rem;
  animation: floatIn 1s ease-out;
  position: relative;
  z-index: 1;
}

/* Image Section */
.achievement-image-details {
  flex: 1;
  max-width: 50%;
  overflow: hidden;
  border-radius: 15px;
  transition: transform 0.5s ease;
}

.achievement-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.achievement-image-details:hover .achievement-image {
  transform: scale(1.1);
}

/* Text Section */
.achievement-text-details {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.achievement-tilte-detail {
  font-size: 2rem;
  font-weight: 700;
  color: #7dd3fc;
  text-shadow: 0 0 8px rgba(125, 211, 252, 0.3);
  animation: fadeInText 1.2s ease-out;
}

.achievement-category-detail {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f9a8d4;
  background: rgba(249, 168, 212, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 12px;
  display: inline-block;
  animation: fadeInText 1.4s ease-out;
}

.achievement-date-detail {
  font-size: 1.1rem;
  font-style: italic;
  color: #555;
  animation: fadeInText 1.6s ease-out;
}

.achievement-description-detail {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  animation: fadeInText 1.8s ease-out;
}

/* Back Button */
.btn-secondary {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #7dd3fc);
  color: #1a1a1a;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  animation: fadeInText 2s ease-out;
}

.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(125, 211, 252, 0.7);
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn-secondary:hover::before {
  width: 200px;
  height: 200px;
}

/* Animations */
@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-details {
    padding: 2rem 1rem;
  }

  .achievement-details h3 {
    font-size: 2.5rem;
  }

  .achievement-details h3::after {
    width: 150px;
  }

  .achievement-item-details {
    flex-direction: column;
    padding: 1.5rem;
  }

  .achievement-image-details {
    max-width: 100%;
    height: 300px;
  }

  .achievement-text-details {
    padding: 0;
  }

  .achievement-tilte-detail {
    font-size: 1.8rem;
  }

  .achievement-category-detail {
    font-size: 1.1rem;
  }

  .achievement-date-detail {
    font-size: 1rem;
  }

  .achievement-description-detail {
    font-size: 0.95rem;
  }

  .btn-secondary {
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .achievement-details h3 {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .achievement-details h3::after {
    width: 120px;
  }

  .achievement-item-details {
    padding: 1rem;
  }

  .achievement-image-details {
    height: 250px;
  }

  .achievement-tilte-detail {
    font-size: 1.6rem;
  }

  .achievement-category-detail {
    font-size: 1rem;
  }

  .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>  