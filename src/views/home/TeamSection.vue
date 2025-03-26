<template lang="">
    <section class="team py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Team</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/h.jpg" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">QUOC KHANH</h5>
                <p class="card-text">CEO & Founder</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/e.jfif" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">John Doe</h5>
                <p class="card-text">CEO</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card team-card">
              <img src="@/assets/images/P.jfif" alt="Placeholder Image" />
              <div class="card-body">
                <h5 class="card-title">PHUONG</h5>
                <p class="card-text">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
export default {
    name: "TeamSection",
}
</script>
<style scoped>
    .team {
  background-color: #f8f9fa;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.team-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;
}

.team-card:hover {
  transform: scale(1.05);
}

.team-card img {
  width: 100%;
  height: 350px; /* Giữ kích thước ảnh đồng đều */
  object-fit: cover; /* Đảm bảo ảnh không bị méo hoặc tràn */
  border-radius: 10px 10px 0 0;
}

.card-body {
  padding: 15px;
  background: #fff;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 5px;
}

.card-text {
  font-size: 1rem;
  color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .team-card img {
    height: 250px; /* Giảm chiều cao ảnh trên màn hình nhỏ */
  }
}

</style>