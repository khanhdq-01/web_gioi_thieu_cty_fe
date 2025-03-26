<template>
  <div class="modal" v-if="job">
    <div class="modal-content">
      <h2>Cập Nhật Công Việc</h2>
      <form @submit.prevent="updateJob">
        <label>Tiêu đề</label>
        <input v-model="editedJob.title" type="text" required />

        <label>Mô tả</label>
        <textarea v-model="editedJob.description" required></textarea>

        <label>Địa điểm</label>
        <input v-model="editedJob.location" type="text" required />

        <label>Lương (VND)</label>
        <input v-model="editedJob.salary" type="number" required />

        <button type="submit" class="btn btn-success">Cập nhật</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Hủy</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    job: Object
  },
  data() {
    return {
      editedJob: {}
    };
  },
  watch: {
    job: {
      handler(newJob) {
        console.log("Dữ liệu job nhận được:", newJob);
        this.editedJob = newJob ? { ...newJob } : {};
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async updateJob() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://127.0.0.1:8000/api/jobs/${this.editedJob.id}`, this.editedJob, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Công việc đã được cập nhật!");
        this.$emit("jobUpdated");
        this.$emit("close");
      } catch (error) {
        console.error("Lỗi khi cập nhật công việc:", error);
        alert("Không thể cập nhật công việc! Vui lòng thử lại.");
      }
    }
  }
};
</script>
