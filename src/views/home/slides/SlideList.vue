<template>
    <div class="container mt-5">
      <h2>Slide Management</h2>
      <router-link to="/slides/add" class="btn btn-primary mb-3">Add New Slide</router-link>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slide in slides" :key="slide.id">
            <td>{{ slide.id }}</td>
            <td><img :src="url + slide.image_path" class="img-thumbnail" style="max-width: 100px;"></td>
            <td>{{ slide.title }}</td>
            <td>
              <router-link :to="'/slides/edit/' + slide.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
              <button @click="deleteSlide(slide.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mb-3">
          <router-link to="/" class="btn btn-secondary ms-2">Back Home</router-link>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SlideList",
    data() {
      return {
        slides: [],
        url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/slides/'
      };
    },
    mounted() {
      this.fetchSlides();
    },
    methods: {
      async fetchSlides() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/slide", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.slides = response.data.data;
        } catch (error) {
          console.error("Error fetching slides:", error);
        }
      },
      async deleteSlide(id) {
        if (confirm("Are you sure you want to delete this slide?")) {
          const token = localStorage.getItem("token");
          try {
            await axios.delete(`http://127.0.0.1:8000/api/slide/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.fetchSlides(); // Refresh the list
          } catch (error) {
            console.error("Error deleting slide:", error);
          }
        }
      }
    }
  };
  </script>