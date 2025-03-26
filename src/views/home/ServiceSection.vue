<template>
  <section class="services py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Our Services</h2>
      <div class="position-relative">
        <button class="scroll-btn left" @click="scrollLeft">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="overflow-hidden">
          <div class="row flex-nowrap service-list">
            <div class="col-md-4 px-2" v-for="(service, index) in services" :key="index">
              <div class="card service-card h-100">
                <div class="card-body text-center">
                  <i :class="service.icon + ' service-icon'"></i>
                  <h5 class="card-title">{{ service.title }}</h5>
                  <p class="card-text">{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="scroll-btn right" @click="scrollRight">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "ServiceSection",
  data() {
    return {
      services: [
        { title: "Web Development", icon: "fas fa-laptop-code", description: "We create responsive and user-friendly websites tailored to your business needs." },
        { title: "Mobile Apps", icon: "fas fa-mobile-alt", description: "Develop high-performance mobile applications for iOS and Android platforms." },
        { title: "Digital Marketing", icon: "fas fa-chart-line", description: "Boost your online presence with our effective digital marketing strategies." },
        { title: "SEO Optimization", icon: "fas fa-search", description: "Improve your website ranking with our SEO services." },
        { title: "Graphic Design", icon: "fas fa-paint-brush", description: "Enhance your brand identity with creative design solutions." },
      ],
    };
  },
  methods: {
    scrollLeft() {
      this.$el.querySelector(".service-list").scrollBy({ left: -350, behavior: "smooth" });
    },
    scrollRight() {
      this.$el.querySelector(".service-list").scrollBy({ left: 350, behavior: "smooth" });
    },
  },
};
</script>


<style scoped>
.service-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Ẩn scrollbar trên Firefox */
}

.service-list::-webkit-scrollbar {
  display: none; /* Ẩn scrollbar trên Chrome/Safari */
}

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

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  font-size: 1.2rem;
}

.scroll-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.scroll-btn.left {
  left: -15px;
}

.scroll-btn.right {
  right: -15px;
}

</style>