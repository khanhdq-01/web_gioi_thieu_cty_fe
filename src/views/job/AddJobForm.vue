<template>
  <div v-if="showForm" class="modal">
    <div class="modal-content">
      <h2>Thêm Công Việc Mới</h2>
      <form @submit.prevent="addJob">
        <label>Tiêu đề</label>
        <input v-model="job.title" type="text" required />

        <label>Mô tả</label>
        <textarea v-model="job.description" required></textarea>

        <label>Địa điểm</label>
        <input v-model="job.location" type="text" required />

        <label>Lương (VND)</label>
        <input v-model="job.salary" type="number" required />

        <button type="submit" class="btn btn-success">Thêm</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Hủy</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["showForm"],
  data() {
    return {
      job: {
        title: "",
        description: "",
        location: "",
        salary: "",
      },
    };
  },
  methods: {
  async addJob() {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        alert("Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục.");
        return;
      }

      await axios.post("http://127.0.0.1:8000/api/jobs", this.job, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      alert("Công việc đã được thêm thành công!");
      this.$emit("jobAdded"); // Cập nhật danh sách công việc
      this.$emit("close"); // Đóng form
    } catch (error) {
      console.error("Lỗi khi thêm công việc:", error);
      alert("Không thể thêm công việc! Vui lòng thử lại.");
    }
  },
},

};
</script>

<style>
/* Style cho form modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
</style>
