<template>
  <div class="container mt-5">
    <h2 v-if="isEdit">Edit job</h2>
    <h2 v-else>Add job</h2>
    
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Tiêu đề</label>
        <input type="text" class="form-control" v-model="formData.title" id="title" required>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <input type="text" class="form-control" v-model="formData.description" id="description" required>
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Địa điểm</label>
        <input type="text" class="form-control" v-model="formData.location" id="location" required>
      </div>

      <div class="mb-3">
        <label for="salary" class="form-label">Mức lương (VND)</label>
        <input type="number" class="form-control" v-model="formData.salary" id="salary" required>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu' }}</button>
        <router-link to="/job-list" class="btn btn-secondary ms-2">Hủy</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "jobForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    jobId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        location: '',
        salary: '',
      }
    };
  },
  mounted() {
    if (this.isEdit && this.jobId) {
      this.fetchjob();
    }
  },
  methods: {
    async fetchjob() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${this.jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        this.formData.title = data.title;
        this.formData.description = data.description;
        this.formData.location = data.location;
        this.formData.salary = data.salary;

      } catch (error) {
        console.error("Error fetching job:", error);
      }
    },
    handleImageChange(event) {
      this.formData.image = event.target.files[0];
    },
    async submitForm() {
      const token = localStorage.getItem("token");
      let formData = new FormData();

      formData.append('title', this.formData.title);
      formData.append('description', this.formData.description);
      formData.append('location', this.formData.location);
      formData.append('salary', this.formData.salary);

      try {
        if (this.isEdit) {
          formData.append('_method', 'PUT');
          await axios.post(`http://127.0.0.1:8000/api/jobs/${this.jobId}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          await axios.post("http://127.0.0.1:8000/api/jobs", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        this.$router.push('/job-list');
      } catch (error) {
        console.error("Error saving job:", error);
      }
    }
  }
};
</script>
