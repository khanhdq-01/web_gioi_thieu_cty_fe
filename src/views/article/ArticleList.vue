<template>
  <div class="container position-relative mt-5">
    <h2>Management</h2>
    <router-link to="/articles/add" class="btn btn-primary mb-3">Add New article</router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td><img :src="url + article.image" class="img-thumbnail" style="max-width: 100px;"></td>
          <td>{{ article.name }}</td>
          <td>{{ article.description }}</td>
          <td>
            <router-link :to="'/articles/edit/' + article.id" class="btn btn-sm btn-warning me-2">Edit</router-link>
            <button @click="deleteArticle(article.id)" class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mb-3">
        <router-link to="/article" class="btn btn-secondary ms-2">Back Home</router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "articleList",
  data() {
    return {
      articles: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/articles/'
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/article", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.articles = response.data.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    async deleteArticle(id) {
      if (confirm("Are you sure you want to delete this article?")) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://127.0.0.1:8000/api/article/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchArticles(); // Refresh the list
        } catch (error) {
          console.error("Error deleting article:", error);
        }
      }
    }
  }
};
</script>