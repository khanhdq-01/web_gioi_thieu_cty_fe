<template>
  <div class="container mt-5">
    <h2>Management</h2>
    <router-link to="/achievement/add" class="btn btn-primary mb-3">Add New achievement</router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Summary</th>
          <th>Description</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="achievement in achievements" :key="achievement.id">
          <td>{{ achievement.id }}</td>
          <td>{{ achievement.title }}</td>
          <td>{{ achievement.category }}</td>
          <td>{{ achievement.date }}</td>
          <td>{{ achievement.summary }}</td>
          <td>{{ achievement.description }}</td>
          <td><img :src="url + achievement.image_path" class="img-thumbnail" style="max-width: 100px;"></td>
          <td>
            <router-link :to="'/achievement/edit/' + achievement.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
            <button @click="deleteachievement(achievement.id)" class="btn btn-sm btn-danger">Delete</button>
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
  name: "achievementList",
  data() {
    return {
      achievements: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/'
    };
  },
  mounted() {
    this.fetchachievements();
  },
  methods: {
    async fetchachievements() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/achievements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("achievements fetched:", response.data.data);
        this.achievements = response.data.data;
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    },
    async deleteachievement(id) {
      if (confirm("Are you sure you want to delete this achievement?")) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://127.0.0.1:8000/api/achievements/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchachievements(); // Refresh the list
        } catch (error) {
          console.error("Error deleting achievement:", error);
        }
      }
    }
  }
};
</script>