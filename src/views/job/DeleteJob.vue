<template>
    <div>
      <div v-if="showForm" class="add-job-form">
        <label>Tiêu đề công việc:</label>
        <input v-model="newJob.title" type="text" placeholder="Nhập tiêu đề" />
  
        <label>Mô tả:</label>
        <textarea v-model="newJob.description" placeholder="Nhập mô tả"></textarea>
  
        <label>Địa điểm:</label>
        <input v-model="newJob.location" type="text" placeholder="Nhập địa điểm" />
  
        <label>Lương:</label>
        <input v-model="newJob.salary" type="number" placeholder="Nhập lương" />
  
        <button @click="submitNewJob">Lưu</button>
        <button @click="cancelAddJob" class="cancel-btn">Hủy</button>
      </div>
    </div>
  </template>
  
    
    <script>
    import axios from "axios";
    
    export default {
      data() {
        return {
          showForm: true,
          newJob: {
            title: '',
            description: '',
            location: '',
            salary: '',
            isLoggedIn: !!localStorage.getItem("token"),
          }
        };
      },
      methods: {
        submitNewJob() {
      axios.post(
          "http://127.0.0.1:8000/api/jobs",
          this.newJob,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
      .then(() => {
        alert("Thêm công việc thành công!");
        this.showForm = false;
        this.newJob = { title: '', description: '', location: '', salary: '' };
        this.$emit("job-added"); // Gửi sự kiện để component cha cập nhật danh sách
      })
      .catch(error => {
        console.error("Lỗi khi thêm công việc:", error);
      });
    },
    cancelAddJob() {
      this.$router.push("/recruitment");
    }
      }
    };
    </script>
    