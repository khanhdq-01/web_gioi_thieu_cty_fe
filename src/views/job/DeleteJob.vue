<template>
  <button @click="deleteJob" class="btn btn-danger">Xóa Công Việc</button>
</template>

<script>
import axios from "axios";

export default {
  props: {
    jobId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async deleteJob() {
      if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
        try {
          const token = localStorage.getItem("token"); // Lấy token từ localStorage
          await axios.delete(`http://127.0.0.1:8000/api/jobs/${this.jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.$emit("jobDeleted"); // Gửi sự kiện để cập nhật danh sách công việc
        } catch (error) {
          console.error("Lỗi khi xóa công việc:", error);
        }
      }
    },
  },
};
</script>
