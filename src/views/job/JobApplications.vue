<template>
  <div class="job-container-job">
    <h2 class="job-title-job">Danh sách ứng viên cho vị trí: {{ jobTitle }}</h2>

    <ul v-if="applications.length" class="job-list-job">
      <li v-for="app in applications" :key="app.id" class="job-card-job">
        <p><strong>Tên:</strong> {{ app.name }}</p>
        <p><strong>Email:</strong> {{ app.email }}</p>
        <p><strong>Điện thoại:</strong> {{ app.phone }}</p>
        <a
          :href="`http://127.0.0.1:8000/api/applications/${app.id}/download-cv`"
          target="_blank"
          class="job-download-btn-job"
        >
          Tải CV
        </a>
      </li>
    </ul>

    <p v-else class="job-empty-job">Không có ứng viên nào cho công việc này.</p>
  </div>

  <div class="job-footer-job">
    <router-link to="/recruitment" class="job-btn-secondary-job">Back Home</router-link>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import "@/assets/css/jobapplication.css";
  
  export default {
    props: ['jobId'],
    data() {
      return {
        applications: [],
        jobTitle: ''
      };
    },
    mounted() {
      this.fetchApplications();
    },
    methods: {
      async fetchApplications() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/applications',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
          // Lọc ứng viên theo job_id
          this.applications = response.data.filter(app => app.job_id == this.jobId);
  
          // Lấy tên công việc (từ quan hệ "job" trong ứng viên)
          if (this.applications.length > 0) {
            this.jobTitle = this.applications[0].job?.title || '';
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách ứng viên:", error);
        }
      }
    }
  };
  </script>
  