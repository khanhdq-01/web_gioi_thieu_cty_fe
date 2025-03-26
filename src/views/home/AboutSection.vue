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
            <img src="@/assets/images/4.webp" alt="Placeholder Image" class="img-fluid about-img" />

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
.about-title {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  text-align: center; /* Căn giữa tiêu đề */
  margin-bottom: 15px;
  word-wrap: break-word; /* Đảm bảo văn bản không bị tràn */
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  text-align: justify;
  word-wrap: break-word;
}

.btn-primary {
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 8px;
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease-in-out;
  display: block;
  width: fit-content;
  margin: 20px auto 0; /* Canh giữa nút "Learn More" */
}

.btn-primary:hover {
  background-color: #0056b3;
}

.about-us .container {
  max-width: 1200px; /* Giới hạn chiều rộng container để tránh bị tràn */
}

.about-us .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.col-md-6 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Sắp xếp theo cột */
  text-align: center;
}

.about-img {
  width: 100%;
  max-width: 450px;
  height: auto;
  max-height: 350px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
}

.about-img:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .about-title {
    font-size: 1.8rem;
  }
  .about-text {
    font-size: 1rem;
  }
  .about-us .row {
    flex-direction: column;
  }
  .col-md-6 {
    width: 100%;
  }
}


</style>