<template>
  <div class="container position-relative mt-5">
    <h2 v-if="isEdit">Edit article</h2>
    <h2 v-else>Add article</h2>
    
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" v-model="formData.name" id="name" required>
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
        <router-link to="/article-list" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "articleForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: [String, Number],
      default: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        image: null
      },
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/articles/'
    };
  },
  mounted() {
    if (this.isEdit) {
      this.fetchArticle();
    }
  },
  methods: {
    async fetchArticle() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/article/${this.articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.formData.name = response.data.name;
        this.formData.description = response.data.description;
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    handleImageChange(event) {
      this.formData.image = event.target.files[0]; // Lưu file vào formData.image
    },
    async submitForm() {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('description', this.formData.description);
    if (this.formData.image instanceof File) {
      formData.append('image', this.formData.image);
    }

  
  try {
    if (this.isEdit) {
      formData.append('_method', 'PUT');
      await axios.post(`http://127.0.0.1:8000/api/article/${this.articleId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post("http://127.0.0.1:8000/api/article", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
    this.$router.push('/article-list');
  } catch (error) {
    console.error("Error saving article:", error);
  }
}

  }
};
</script>