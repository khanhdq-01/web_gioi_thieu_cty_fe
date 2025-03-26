<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
  </div>
  <div>
    <h2>Danh sách tuyển dụng</h2>

    <!-- Hiển thị form thêm công việc nếu roleId === 1 -->
    <RouterLink v-if="roleId == 1" to="/add-job" class="btn btn-primary">
  Thêm Công Việc
    </RouterLink>

    <ul v-if="jobs.length">
      <li v-for="job in jobs" :key="job.id">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p>{{ job.location }}</p>
        <p> {{ job.salary }} VND</p>


        <button @click="toggleApplyForm(job.id)">
          {{ showApplyForm === job.id ? "Hủy" : "Ứng tuyển" }}
        </button>
        <RouterLink v-if="roleId == 1" to="/change-job" class="btn">
        Sửa Công Việc
        </RouterLink>
        <RouterLink v-if="roleId == 1" to="/delete-job" class="btn">
        Xóa Công Việc
        </RouterLink>

        <div v-if="showApplyForm === job.id" class="apply-form">
          <label>Họ và tên:</label>
          <input v-model="applyForm.name" type="text" placeholder="Nhập họ tên" />

          <label>Email:</label>
          <input v-model="applyForm.email" type="email" placeholder="Nhập email" />

          <label>Số điện thoại:</label>
          <input v-model="applyForm.phone" type="text" placeholder="Nhập số điện thoại" />

          <label>CV (PDF, DOC, DOCX, max 2MB):</label>
          <input type="file" @change="handleFileUpload" accept=".pdf,.doc,.docx" />

          <button @click="submitApplication(job.id)">Nộp đơn</button>
        </div>
      </li>
    </ul>
    <p v-else>Không có công việc nào.</p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from "axios";

export default {
  components: { NavBar},
  data() {
    return {
      userName: '',
      roleId :'',
      props: ['name', 'role'],
      jobs: [],
      showApplyForm: null,
      applyForm: {
        name: '',
        email: '',
        phone: '',
        cv: null
      }
    };
  },
  mounted() {
    this.userName = localStorage.getItem('name')
    this.roleId = localStorage.getItem('role_id')
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

    toggleApplyForm(jobId) {
      this.showApplyForm = this.showApplyForm === jobId ? null : jobId;
    },

    handleFileUpload(event) {
      this.applyForm.cv = event.target.files[0];
    },

    async submitApplication(jobId) {
      if (!this.applyForm.name || !this.applyForm.email || !this.applyForm.phone || !this.applyForm.cv) {
        alert("Vui lòng điền đầy đủ thông tin và tải lên CV.");
        return;
      }

      let formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("name", this.applyForm.name);
      formData.append("email", this.applyForm.email);
      formData.append("phone", this.applyForm.phone);
      formData.append("cv", this.applyForm.cv);

      try {
        await axios.post("http://127.0.0.1:8000/api/applications", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Nộp đơn thành công!");
        this.showApplyForm = null;
        this.applyForm = { name: '', email: '', phone: '', cv: null };
      } catch (error) {
        console.error("Lỗi khi nộp đơn:", error);
      }
    }
  }
};
</script>
