<template>
    <div class="container position-relative mt-5">
      <h2 v-if="isEdit">Edit company</h2>
      <h2 v-else>Add New company</h2>
      
      <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="company_name" class="form-label">Tên công ty</label>
        <input type="text" class="form-control" v-model="formData.company_name" id="company_name" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <input type="text" class="form-control" v-model="formData.address" id="address" required>
      </div>
      <div class="mb-3">
        <label for="director_name" class="form-label">Giám đốc</label>
        <input type="text" class="form-control" v-model="formData.director_name" id="director_name" required>
      </div>
      <div class="mb-3">
        <label for="founded_date" class="form-label">Ngày thành lập</label>
        <input type="date" class="form-control" v-model="formData.founded_date" id="founded_date" required>
      </div>
      <div class="mb-3">
        <label for="business_scope" class="form-label">Nội dung kinh doanh</label>
        <input type="text" class="form-control" v-model="formData.business_scope" id="business_scope" required>
      </div>
      <div class="mb-3">
        <label for="capital" class="form-label">Vốn đầu tư</label>
        <input type="text" class="form-control" v-model="formData.capital" id="capital" required>
      </div>
      <div class="mb-3">
        <label for="group_parent" class="form-label">Tập đoàn mẹ</label>
        <input type="text" class="form-control" v-model="formData.group_parent" id="group_parent" required>
      </div>
      <div class="mb-3">
        <label for="employee_count" class="form-label">Thành viên</label>
        <input type="text" class="form-control" v-model="formData.employee_count" id="employee_count" required>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
        <router-link to="/company-infor-list" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>

    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CompanyInforForm",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      companyInforId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        formData: {
          company_name: '',
          address: '',
          director_name: '',
          founded_date: '',
          business_scope: '',
          capital: '',
          group_parent: '',
          employee_count: '',
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
          const response = await axios.get(`http://127.0.0.1:8000/api/company-info/${this.companyInforId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.formData.company_name = response.data.company_name;
          this.formData.address = response.data.address;
          this.formData.director_name = response.data.director_name;
          this.formData.founded_date = response.data.founded_date;
          this.formData.business_scope = response.data.business_scope;
          this.formData.capital = response.data.capital;
          this.formData.group_parent = response.data.group_parent;
          this.formData.employee_count = response.data.employee_count;

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
        formData.append('company_name', this.formData.company_name);
        formData.append('address', this.formData.address);
        formData.append('director_name', this.formData.director_name);
        formData.append('founded_date', this.formData.founded_date);
        formData.append('business_scope', this.formData.business_scope);
        formData.append('capital', this.formData.capital);
        formData.append('group_parent', this.formData.group_parent);
        formData.append('employee_count', this.formData.employee_count);
 
        try {
          if (this.isEdit) {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/company-info/${this.companyInforId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            await axios.post("http://127.0.0.1:8000/api/company-info", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
          }
          this.$router.push('/company-infor-list');
        } catch (error) {
          console.error("Error saving company:", error);
        }
      }
    }
  };
  </script>