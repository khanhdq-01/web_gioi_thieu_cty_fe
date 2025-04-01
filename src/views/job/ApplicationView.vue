<template>
    <div class="container">
      <h2>Ứng tuyển vị trí: {{ job?.title }}</h2>
  
      <form @submit.prevent="submitApplication">
        <div>
          <label>Họ tên:</label>
          <input v-model="form.name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input v-model="form.phone" required />
        </div>
        <div>
          <label>Upload CV:</label>
          <input type="file" @change="handleFileUpload" required />
        </div>
        <button type="submit">Gửi đơn</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['jobId'],
    data() {
      return {
        job: null,
        form: {
          name: '',
          email: '',
          phone: '',
          cv: null
        }
      };
    },
    mounted() {
      this.fetchJob();
    },
    methods: {
      async fetchJob() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${this.jobId}`);
          this.job = response.data;
        } catch (error) {
          console.error("Không lấy được thông tin công việc:", error);
        }
      },
      handleFileUpload(event) {
        this.form.cv = event.target.files[0];
      },
      async submitApplication() {
        const formData = new FormData();
        formData.append('job_id', this.jobId);
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        formData.append('phone', this.form.phone);
        formData.append('cv', this.form.cv);
  
        try {
          await axios.post('http://127.0.0.1:8000/api/applications', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Gửi đơn ứng tuyển thành công!');
          this.$router.push('/');
        } catch (error) {
          console.error('Lỗi gửi đơn:', error);
          alert('Có lỗi xảy ra khi gửi đơn.');
        }
      }
    }
  };
  </script>
  