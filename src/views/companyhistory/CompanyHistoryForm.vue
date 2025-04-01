<template>
    <div class="container mt-5">
      <h2 v-if="isEdit">Edit company</h2>
      <h2 v-else>Add New company</h2>
      
      <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="company_name" class="form-label">Năm</label>
        <input type="text" class="form-control" v-model="formData.year" id="company_name" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Tháng</label>
        <input type="text" class="form-control" v-model="formData.month" id="address" required>
      </div>
      <div class="mb-3">
        <label for="director_name" class="form-label">Sự kiện</label>
        <input type="text" class="form-control" v-model="formData.event" id="director_name" required>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
        <router-link to="/company-history-list" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>

    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CompanyhistoryForm",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      companyhistoryId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        formData: {
          year: '',
          month: '',
          event: '',
        },
      };
    },
    mounted() {
      if (this.isEdit) {
        this.fetchcompany();
      }
    },
    methods: {
      async fetchcompany() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/company-history/${this.companyhistoryId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.formData.year = response.data.year;
          this.formData.month = response.data.month;
          this.formData.event = response.data.event;

        } catch (error) {
          console.error("Error fetching company:", error);
        }
      },
      handleImageChange(event) {
        this.formData.image_path = event.target.files[0];
      },
      async submitForm() {
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('year', this.formData.year);
        formData.append('month', this.formData.month);
        formData.append('event', this.formData.event);
 
        try {
          if (this.isEdit) {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/company-history/${this.companyhistoryId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            await axios.post("http://127.0.0.1:8000/api/company-history", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          }
          this.$router.push('/company-history-list');
        } catch (error) {
          console.error("Error saving company:", error);
        }
      }
    }
  };
  </script>