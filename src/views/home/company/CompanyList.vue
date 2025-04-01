<template>
    <div class="container mt-5">
      <h2>Company Management</h2>
      <router-link to="/companys/add" class="btn btn-primary mb-3">Add New company</router-link>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companys" :key="company.id">
            <td>{{ company.id }}</td>
            <td><img :src="url + company.image_path" class="img-thumbnail" style="max-width: 100px;"></td>
            <td>{{ company.title }}</td>
            <td>{{ company.content }}</td>
            <td>
              <router-link :to="'/companys/edit/' + company.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
              <button @click="deleteCompany(company.id)" class="btn btn-sm btn-danger">Delete</button>
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
    name: "CompanyList",
    data() {
      return {
        companys: [],
        url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/company-profiles/'
      };
    },
    mounted() {
      this.fetchCompanys();
    },
    methods: {
      async fetchCompanys() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/company-profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.companys = response.data.data;
        } catch (error) {
          console.error("Error fetching companys:", error);
        }
      },
      async deleteCompany(id) {
        if (confirm("Are you sure you want to delete this about?")) {
          const token = localStorage.getItem("token");
          try {
            await axios.delete(`http://127.0.0.1:8000/api/company-profile/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.fetchCompanys(); // Refresh the list
          } catch (error) {
            console.error("Error deleting about:", error);
          }
        }
      }
  
    }
  };
  </script>