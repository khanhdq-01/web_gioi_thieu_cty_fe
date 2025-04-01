<template>
  <div class="container mt-5">
    <h2>Quản lý công việc</h2>
    <router-link to="/jobs/add" class="btn btn-primary mb-3">Thêm công việc mới</router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Mô tả</th>
          <th>Địa điểm</th>
          <th>Mức lương (VND)</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jobItem in jobs" :key="jobItem.id">
          <td>{{ jobItem.id }}</td>
          <td>{{ jobItem.title }}</td>
          <td>{{ jobItem.description }}</td>
          <td>{{ jobItem.location }}</td>
          <td>{{ Number(jobItem.salary).toLocaleString() }}</td>
          <td>
            <router-link :to="'/jobs/edit/' + jobItem.id" class="btn btn-sm btn-warning me-2">Sửa</router-link>
            <button @click="deleteJob(jobItem.id)" class="btn btn-sm btn-danger">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mb-3">
      <router-link to="/recruitment" class="btn btn-secondary ms-2">Về trang chủ</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "jobList",
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.jobs = response.data;
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    },
    async deleteJob(id) {
      if (confirm("Bạn có chắc chắn muốn xoá công việc này?")) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchJobs(); // Refresh list
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      }
    }
  }
};
</script>