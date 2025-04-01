<template>
    <div class="container position-relative mt-5">
      <h2>Company History Management</h2>
      <router-link to="/company-history-form/add" class="btn btn-primary mb-3">Add New company</router-link>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>year</th>
            <th>month</th>
            <th>event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companys" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.year }}</td>
            <td>{{ company.month }}</td>
            <td>{{ company.event }}</td>
            <td>
              <router-link :to="'/company-history-form/edit/' + company.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
              <button @click="deleteCompanyhistory(company.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mb-3">
          <router-link to="/achievement" class="btn btn-secondary ms-2">Back Home</router-link>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CompanyhistoryList",
    data() {
      return {
        companys: [],
      };
    },
    mounted() {
      this.fetchCompanys();
    },
    methods: {
      async fetchCompanys() {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/company-history", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.companys = response.data.data;
        } catch (error) {
          console.error("Error fetching companys:", error);
        }
      },

      async deleteCompanyhistory(id) {
        if (confirm("Are you sure you want to delete this about?")) {
          const token = localStorage.getItem("token");
          try {
            await axios.delete(`http://127.0.0.1:8000/api/company-history/${id}`, {
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