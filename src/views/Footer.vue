<template>
<footer class="futuristic-footer text-white">
    <div class="footer-bg-shape"></div>
    <div class="container position-relative z-10 text-center py-5">
      <h5 class="footer-brand fw-bold">EXTREME VIETNAM CO., LTD.</h5>
      <p>31st Floor, Keangnam Hanoi Landmark 72, Lot E6, Pham Hung Street, Me Tri Ward, Nam Tu Liem District, Ha Noi</p>

      <div class="footer-contact mt-3">
        <p><i class="fas fa-phone-alt me-2"></i>+84(0) 2473 051 525 &nbsp;&nbsp;
          <i class="fas fa-fax me-2"></i>+84(0) 2473 051 526 &nbsp;&nbsp;
          <i class="fas fa-envelope me-2"></i>contact@extremevn.com.vn</p>
        <p>7:50〜16:50（土曜、日曜、祝日休業）</p>
      </div>
    </div>

    <div class="footer-bottom text-center py-3 mt-4 border-top border-light">
      ©2025 Extreme Vietnam. All rights reserved.
    </div>

    <div class="scroll-top-btn">
      <i class="fas fa-arrow-up"></i>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FuturisticFooter", // 👈 tên mới
};

</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.futuristic-footer {
  margin-top: auto; /* Footer sẽ tự động di chuyển xuống cuối */
  position: relative;
  background: linear-gradient(135deg, #e78a96, #cf7c60, #fde1c4);
  overflow: hidden;
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

.footer-bg-shape {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  clip-path: polygon(0 0, 100% 5%, 100% 30%, 0% 20%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 10;
}

.footer-brand {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.footer-contact i {
  color: #fff;
}

.footer-bottom {
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  color: #f0f0f0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 30px;
  width: 45px;
  height: 45px;
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  z-index: 999;
}

.scroll-top-btn:hover {
  background: white;
  color: #c56e51;
}

.scroll-top-btn i {
  color: white;
  transition: 0.3s;
}

.scroll-top-btn:hover i {
  color: #ce5831;
}

</style>
