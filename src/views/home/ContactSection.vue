<template>
  <section class="contact-section py-5">
    <div class="container text-center">
      <div class="contact-heading text-center py-3">
      <h3>ームベト</h3>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <form @submit.prevent="submitForm" class="form-box">
            <input type="text" class="form-input" placeholder="Your Name" v-model="formData.name" required />
            <input type="email" class="form-input" placeholder="Your Email" v-model="formData.email" required />
            <input type="tel" class="form-input" placeholder="Your Phone" v-model="formData.phone" required />
            <textarea class="form-input" rows="5" placeholder="Your Message" v-model="formData.message" required></textarea>
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div v-if="showSuccessTooltip" class="center-tooltip">
      {{ successMessage }}
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import "@/assets/css/contact.css";

export default {
  name: "ContactSection",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
      successMessage: '',
      errorMessage: '',
      showSuccessTooltip: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/user-info', this.formData);
        this.successMessage = response.data.message || "Message sent successfully!";
        this.formData = { name: '', email: '', phone: '', message: '' };
        this.showSuccessTooltip = true;
        setTimeout(() => this.showSuccessTooltip = false, 2000);
      } catch (error) {
        this.successMessage = '';
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    }
  }
};
</script>