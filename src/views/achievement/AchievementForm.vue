<template>
  <div class="container position-relative mt-5">
    <h2 v-if="isEdit">Edit achievement</h2>
    <h2 v-else>Add achievement</h2>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <!-- Title -->
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" v-model="formData.title" id="title" required maxlength="255">
    </div>

    <!-- Category -->
    <div class="mb-3">
      <label for="category" class="form-label">Category</label>
      <input type="text" class="form-control" v-model="formData.category" id="category" required maxlength="100">
    </div>

    <!-- Date -->
    <div class="mb-3">
      <label for="date" class="form-label">Date</label>
      <input type="date" class="form-control" v-model="formData.date" id="date" required>
    </div>

    <!-- Summary -->
    <div class="mb-3">
      <label for="summary" class="form-label">Summary</label>
      <textarea class="form-control" v-model="formData.summary" id="summary" rows="3" maxlength="500" required></textarea>
    </div>

    <!-- Description (optional) -->
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" v-model="formData.description" id="description" rows="3"></textarea>
    </div>

    <!-- Image -->
    <div class="mb-3">
      <label for="image" class="form-label">Image</label>
      <input type="file" class="form-control" @change="handleImageChange" id="image" accept="image/*" :required="!isEdit">
      <small v-if="isEdit" class="text-muted">Leave empty to keep current image</small>
    </div>

    <!-- Actions -->
    <div class="mb-3">
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Save' }}</button>
      <router-link to="/achievement-list" class="btn btn-secondary ms-2">Cancel</router-link>
    </div>
  </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "achievementForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    achievementId: {
      type: [String, Number],
      default: true
    }
  },
  data() {
    return {
      formData: {
      title: '',
      category: '',
      date: '',
      summary: '',
      description: '',
      image_path: null, // <-- lưu file ở đây
    },
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/achievements/'
    };
  },
  mounted() {
    if (this.isEdit) {
      this.fetchachievement();
    }
  },
  methods: {
    async fetchachievement() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/achievements/${this.achievementId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.formData.title = response.data.title;
        this.formData.category = response.data.category;
        this.formData.date = response.data.date;
        this.formData.summary = response.data.summary;
        this.formData.description = response.data.description || "";
      } catch (error) {
        console.error("Error fetching achievement:", error);
      }
    },
    handleImageChange(event) {
      this.formData.image_path = event.target.files[0]; // Lưu file vào formData.image
    },
    async submitForm() {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append('title', this.formData.title);
    formData.append('category', this.formData.category);
    formData.append('date', this.formData.date);
    formData.append('summary', this.formData.summary);
    formData.append('description', this.formData.description || '');

    if (this.formData.image_path instanceof File) {
      formData.append('image_path', this.formData.image_path);
    }

  
  try {
    if (this.isEdit) {
      formData.append('_method', 'PUT');
      await axios.post(`http://127.0.0.1:8000/api/achievements/${this.achievementId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post("http://127.0.0.1:8000/api/achievements", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
    this.$router.push('/achievement-list');
  } catch (error) {
    console.error("Error saving achievement:", error);
  }
}

  }
};
</script>