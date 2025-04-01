<template>
    <NavBar :name="userName" :role="roleId" />
    <section class="job-section">
      <div class="job-heading  text-center">
        <h3>ア会社です。</h3>
      </div>
        <div>
          <ul class="job-list" v-if="jobs.length">
            <li v-for="job in jobs" :key="job.id" class="job-card">
              <h3>{{ job.title }}</h3>
              <p>{{ job.description }}</p>
              <p>Địa điểm: {{ job.location }}</p>
              <p>Mức lương: {{ job.salary }} VND</p>
              <!-- Ứng tuyển button cho user -->
              <div>
                <button
                  class="btn btn-success"
                  @click="applyToJob(job.id)"
                >
                  Ứng tuyển
                </button>
              </div>
            </li>
          </ul>
          <p v-else class="text-muted">Không có công việc nào.</p>
        </div>
        <router-link
        v-if="isLoggedIn && userRole === 1"
        to="/job-list"
        class="btn btn-primary"
      >
        Manage jobs
      </router-link>
      </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ApplicationView from '@/views/job/ApplicationView.vue';
import axios from 'axios';
import "@/assets/css/recruiment.css";

export default {
  components: {
    NavBar,
    ApplicationView
  },
  data() {
    return {
      userName: '',
      roleId: '',
      jobs: [],
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/jobs");
        this.jobs = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    },
    applyToJob(jobId) {
      this.$router.push({ name: 'application', params: { jobId } });
    },
  }
};
</script>
