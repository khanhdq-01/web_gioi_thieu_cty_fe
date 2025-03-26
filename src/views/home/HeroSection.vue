<template lang="">
    <section class="hero d-flex align-items-center justify-content-center text-center">
    `  <div class="hero-content">
        <h1 class="hero-title">Empowering Your Business</h1>
        <p class="hero-subtitle">Providing cutting-edge technology solutions</p>
        <RouterLink to="/article">
          <button class="btn btn-warning mt-3 btn-lg shadow-lg">Explore Our Projects</button>
        </RouterLink>
      </div>`
    </section>
</template>
<script>
export default {
    name: "HeroSection",
}
</script>
<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
              url('@/assets/images/helo.jpg') center/cover no-repeat;
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
</style>