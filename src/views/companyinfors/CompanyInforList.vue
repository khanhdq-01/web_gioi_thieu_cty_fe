<template>
    <div class="container position-relative mt-5">
      <h2>Company Infor Management</h2>
      <router-link to="/company-infor-form/add" class="btn btn-primary mb-3">Add New company</router-link>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên công ty</th>
            <th>Địa chỉ</th>
            <th>Giám đốc</th>
            <th>Ngày thành lập</th>
            <th>Nội dung kinh doanh</th>
            <th>Vốn đầu tư</th>
            <th>Tập đoàn mẹ</th>
            <th>Thành viên</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companys" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.company_name }}</td>
            <td>{{ company.address }}</td>
            <td>{{ company.director_name }}</td>
            <td>{{ company.founded_date }}</td>
            <td>{{ company.business_scope }}</td>
            <td>{{ company.capital }}</td>
            <td>{{ company.group_parent }}</td>
            <td>{{ company.employee_count }}</td>
            <td>
              <router-link :to="'/company-infor-form/edit/' + company.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
              <button @click="deleteCompanyInfor(company.id)" class="btn btn-sm btn-danger">Delete</button>
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
    name: "CompanyInforList",
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
          const response = await axios.get("http://127.0.0.1:8000/api/company-info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.companys = response.data.data;
        } catch (error) {
          console.error("Error fetching companys:", error);
        }
      },

      async deleteCompanyInfor(id) {
        if (confirm("Are you sure you want to delete this about?")) {
          const token = localStorage.getItem("token");
          try {
            await axios.delete(`http://127.0.0.1:8000/api/company-info/${id}`, {
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