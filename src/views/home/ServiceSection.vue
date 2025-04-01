<template>
  <section class="services py-5 bg-light">
    <div class="container-services">
      <div class="service-heading text-center py-3">
      <h3>について</h3>
      </div>
      <div class="position-relative">
        <button class="scroll-btn left" @click="scrollLeft">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div
          class="row flex-nowrap service-list"
          ref="serviceList"
        >
          <div
            class="col-md-4 col-sm-6 px-2"
            v-for="(service, index) in repeatedServices"
            :key="index"
          >
            <div class="card service-card h-100 shadow-sm border-light rounded">
              <div class="card-body text-center p-4">
                <i :class="service.icon + ' service-icon mb-3'"></i>
                <h5 class="card-title h4 font-weight-bold text-dark">{{ service.title }}</h5>
                <p class="card-text text-muted">{{ service.description }}</p>
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
import "@/assets/css/service.css";
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
  computed: {
    repeatedServices() {
      return [...this.services, ...this.services]; // nhân đôi để scroll mượt hơn
    }
  },
  methods: {
    scrollByOneCard(direction = "right") {
      const list = this.$refs.serviceList;
      const card = list.querySelector(".service-card");

      if (!card) return;

      const cardWidth = card.offsetWidth + 16; // thêm khoảng cách padding/margin

      const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
      const maxScroll = list.scrollWidth / 2; // vì lặp lại

      list.scrollBy({ left: scrollAmount, behavior: "smooth" });

      setTimeout(() => {
        if (direction === "right" && list.scrollLeft >= maxScroll) {
          list.scrollLeft = 0;
        } else if (direction === "left" && list.scrollLeft <= 0) {
          list.scrollLeft = maxScroll;
        }
      }, 400);
    },
    scrollLeft() {
      this.scrollByOneCard("left");
    },
    scrollRight() {
      this.scrollByOneCard("right");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.serviceList.scrollLeft = 0;
    });
  }
};



</script>



