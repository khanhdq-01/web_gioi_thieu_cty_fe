<template>
    <div class="container mt-5">
      <h2 v-if="isEdit">Edit about</h2>
      <h2 v-else>Add New about</h2>
      
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <textarea  type="text" class="form-control" v-model="formData.title" id="title" required></textarea>
        </div>
        
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="file" class="form-control" @change="handleImageChange" id="image" :required="!isEdit">
          <small v-if="isEdit" class="text-muted">Leave empty to keep current image</small>
        </div>
        
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
          <router-link to="/about-list" class="btn btn-secondary ms-2">Cancel</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AboutForm",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      aboutId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        formData: {
          title: '',
          image_path: null
        },
        url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/abouts/'
      };
    },
    mounted() {
      if (this.isEdit) {
        this.fetchAbout();
      }
    },
    methods: {
      async fetchAbout() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/about/${this.aboutId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.formData.title = response.data.title;
        } catch (error) {
          console.error("Error fetching about:", error);
        }
      },
      handleImageChange(event) {
        this.formData.image_path = event.target.files[0];
      },
      async submitForm() {
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('title', this.formData.title);
        if (this.formData.image_path instanceof File) {
          formData.append('image_path', this.formData.image_path);
        }
        
        try {
          if (this.isEdit) {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/about/${this.aboutId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            await axios.post("http://127.0.0.1:8000/api/about", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          }
          this.$router.push('/about-list');
        } catch (error) {
          console.error("Error saving about:", error);
        }
      }
    }
  };
  </script>