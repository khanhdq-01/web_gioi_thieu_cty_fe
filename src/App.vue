<script>
import FuturisticFooter from './views/Footer.vue'; // giữ nguyên đường dẫn nếu bạn đặt tại views

export default {
  components: {
    FuturisticFooter
  },
  watch: {
    '$route.name'(newRoute) {
      document.body.classList.toggle('home-page', newRoute === 'home');
    }
  },
  mounted() {
    document.body.classList.toggle('home-page', this.$route.name === 'home');
  }
}
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <RouterView class="flex-grow-1" />
    <FuturisticFooter />
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Đảm bảo chiều cao luôn là chiều cao cửa sổ */
}

.flex-grow-1 {
  flex-grow: 1; /* Làm cho phần nội dung có thể tự động chiếm không gian còn lại */
}

</style>
