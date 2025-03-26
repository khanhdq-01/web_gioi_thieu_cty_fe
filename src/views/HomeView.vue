<template>
  <div>
    <NavBar :name="userName" :role="roleId" />

    <!-- Hero Section -->
    <HeroSection />
    <!-- About Us Section -->
    <AboutSection />

    <!-- Services Section -->
    <ServiceSection />

    <!-- Team Section -->
    <TeamSection />

    <!-- User Info Section -->
    <CompanyBlog />
  
    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import HeroSection from "@/views/home/HeroSection.vue";
import AboutSection from "@/views/home/AboutSection.vue";
import ServiceSection from "@/views/home/ServiceSection.vue";
import TeamSection from "@/views/home/TeamSection.vue";
import CompanyBlog from "@/views/home/CompanyBlog.vue";
import ContactSection from "@/views/home/ContactSection.vue";
import Footer from "@/views/home/Footer.vue";

export default {
  components: { 
    NavBar,
    HeroSection,
    AboutSection,
    ServiceSection,
    TeamSection,
    ContactSection,
    CompanyBlog,
    Footer
  },
  data() {
    return {
      userName: '',
      roleId: '',
    };
  },
};
</script>