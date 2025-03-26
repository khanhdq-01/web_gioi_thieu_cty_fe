<template lang="">
    <section class="contact py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Contact Us</h2>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Your Name" v-model="formData.name" required />
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Your Email" v-model="formData.email" required />
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control" placeholder="Your Phone" v-model="formData.phone" required />
              </div>
              <div class="mb-3">
                <textarea class="form-control" rows="5" placeholder="Your Message" v-model="formData.message" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
            <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import axios from 'axios';

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
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/user-info', this.formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.successMessage = response.data.message;
        this.errorMessage = '';
        this.formData = { name: '', email: '', phone: '', message: '' }; // Reset form
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
        this.successMessage = '';
      }
    },
  },
};
</script>
<style scoped>
    
</style>