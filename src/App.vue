<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  watch: {
    '$route.name'(newRoute) {
      document.body.classList.toggle('home-page', newRoute === 'home');
    }
  },
  mounted() {
    // Áp dụng ngay khi tải lần đầu
    document.body.classList.toggle('home-page', this.$route.name === 'home');
  }
}
</script>
<template>
<RouterView />
</template>

<style scoped>
</style>
