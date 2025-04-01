<template>
  <div>
    <NavBar :name="userName" :role="roleId" />

    <!-- HeaderSlide Section -->
    <HeaderSlide />

    <div class="d-flex justify-content-center mt-1 mb-1">
      <RouterLink to="/article">
        <button class="btn-dev">Explore Our Projects</button>
      </RouterLink>
    </div>

    <!-- About Us Section -->
    <AboutSection />

    <!-- Services Section -->
    <ServiceSection />

    <!-- Team Section -->
    <TeamSection />

    <!-- User Info Section -->
    <CompanyBlog />

    <CompanyInfo />
    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import AboutSection from "@/views/home/AboutSection.vue";
import ServiceSection from "@/views/home/ServiceSection.vue";
import TeamSection from "@/views/home/TeamSection.vue";
import CompanyBlog from "@/views/home/CompanyBlog.vue";
import ContactSection from "@/views/home/ContactSection.vue";
import Footer from "@/views/home/Footer.vue";
import HeaderSlide from '@/views/home/HeaderSlide.vue';
import CompanyInfo from '@/views/companyinfors/CompanyInforView.vue';
import "@/assets/css/home.css";

export default {
  components: { 
    NavBar,
    HeaderSlide,
    AboutSection,
    ServiceSection,
    TeamSection,
    ContactSection,
    CompanyBlog,
    CompanyInfo,
    Footer,
  },
  data() {
    return {
      userName: '',
      roleId: '',
    };
  },
};
</script>