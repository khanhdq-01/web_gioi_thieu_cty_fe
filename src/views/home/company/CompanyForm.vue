<template>
    <div class="container mt-5">
      <h2 v-if="isEdit">Edit company</h2>
      <h2 v-else>Add New company</h2>
      
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" v-model="formData.title" id="title" required>
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <input type="text" class="form-control" v-model="formData.content" id="content" required>
        </div>
        
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="file" class="form-control" @change="handleImageChange" id="image" :required="!isEdit">
          <small v-if="isEdit" class="text-muted">Leave empty to keep current image</small>
        </div>
        
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
          <router-link to="/company-profile-list" class="btn btn-secondary ms-2">Cancel</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CompanyForm",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      companyId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        formData: {
          title: '',
          content: '',
          image_path: null
        },
        url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/company-profiles/'
      };
    },
    mounted() {
      if (this.isEdit) {
        this.fetchCompany();
      }
    },
    methods: {
      async fetchCompany() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/company-profile/${this.companyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.formData.title = response.data.title;
          this.formData.content = response.data.content;
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
        formData.append('title', this.formData.title);
        formData.append('content', this.formData.content);
        if (this.formData.image_path instanceof File) {
          formData.append('image_path', this.formData.image_path);
        }
        
        try {
          if (this.isEdit) {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/company-profile/${this.companyId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            await axios.post("http://127.0.0.1:8000/api/company-profile", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          }
          this.$router.push('/company-profile-list');
        } catch (error) {
          console.error("Error saving company:", error);
        }
      }
    }
  };
  </script>