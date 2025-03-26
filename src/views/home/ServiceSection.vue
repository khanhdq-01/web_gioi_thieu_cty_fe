<template lang="">
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
</template>
<script>
export default {
    name :"ServiceSection"
}
</script>
<style scoped>
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
</style>