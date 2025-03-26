<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
  </div>
  <div>
    <h2>Danh sách tuyển dụng</h2>

    <!-- Nút mở form thêm công việc -->
    <button v-if="roleId == 1" class="btn btn-primary" @click="showAddForm = true">
      Thêm Công Việc
    </button>

    <ul v-if="jobs.length">
      <li v-for="job in jobs" :key="job.id">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p>{{ job.location }}</p>
        <p>{{ job.salary }} VND</p>

        <button v-if="roleId == 1" @click="editJob(job)">Cập nhật công việc</button>
        <DeleteJob v-if="roleId == 1" :jobId="job.id" @jobDeleted="fetchJobs" />
      </li>
    </ul>

    <p v-else>Không có công việc nào.</p>

    <!-- Form thêm công việc -->
    <AddJobForm v-if="showAddForm" :showForm="showAddForm" @jobAdded="fetchJobs" @close="showAddForm = false" />

    <!-- Form cập nhật công việc -->
    <EditJobForm v-if="showEditForm" :job="selectedJob" @jobUpdated="fetchJobs" @close="showEditForm = false" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AddJobForm from '@/views/job/AddJobForm.vue';
import EditJobForm from '@/views/job/EditJobForm.vue';
import DeleteJob from '@/views/job/DeleteJob.vue';
import axios from "axios";

export default {
  components: { NavBar, AddJobForm, EditJobForm, DeleteJob },
  data() {
    return {
      userName: '',
      roleId: '',
      jobs: [],
      showAddForm: false,
      showEditForm: false,
      selectedJob: null
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

    editJob(job) {
      this.selectedJob = { ...job };
      this.showEditForm = true;
    }
  }
};
</script>
