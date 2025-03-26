<template lang="">
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
</template>
<script>
export default {
    name: "AboutSection",
}
</script>
<style scoped>
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
</style>