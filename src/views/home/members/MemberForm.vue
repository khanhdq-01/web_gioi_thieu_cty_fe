<template>
    <div class="container mt-5">
      <h2 v-if="isEdit">Edit member</h2>
      <h2 v-else>Add New member</h2>
      
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="formData.name" id="name" required>
        </div>
        <div class="mb-3">
          <label for="position" class="form-label">Position</label>
          <input type="text" class="form-control" v-model="formData.position" id="position" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" v-model="formData.description" id="description" required>
        </div>
        
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="file" class="form-control" @change="handleImageChange" id="image" :required="!isEdit">
          <small v-if="isEdit" class="text-muted">Leave empty to keep current image</small>
        </div>
        
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
          <router-link to="/member-list" class="btn btn-secondary ms-2">Cancel</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "MemberForm",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      memberId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        formData: {
          name: '',
          position: '',
          description: '',
          image_path: null
        },
        url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/members/'
      };
    },
    mounted() {
      if (this.isEdit) {
        this.fetchMember();
      }
    },
    methods: {
      async fetchMember() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/member/${this.memberId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.formData.name = response.data.name;
          this.formData.position = response.data.position;
          this.formData.description = response.data.description;
        } catch (error) {
          console.error("Error fetching member:", error);
        }
      },
      handleImageChange(event) {
        this.formData.image_path = event.target.files[0];
      },
      async submitForm() {
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('position', this.formData.position);
        formData.append('description', this.formData.description);
        if (this.formData.image_path instanceof File) {
          formData.append('image_path', this.formData.image_path);
        }
        
        try {
          if (this.isEdit) {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/member/${this.memberId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            await axios.post("http://127.0.0.1:8000/api/member", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          }
          this.$router.push('/member-list');
        } catch (error) {
          console.error("Error saving member:", error);
        }
      }
    }
  };
  </script>