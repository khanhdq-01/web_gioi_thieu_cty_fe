<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>{{ isEditing ? "Chỉnh sửa Thành Tựu" : "Thêm Thành Tựu" }}</h2>
        <form @submit.prevent="handleSubmit">
          <label>Tiêu đề:</label>
          <input type="text" v-model="form.title" required />
  
          <label>Danh mục:</label>
          <input type="text" v-model="form.category" list="categories" required />
          <datalist id="categories">
            <option v-for="item in categories" :key="item" :value="item"></option>
          </datalist>
  
          <label>Ngày:</label>
          <input type="date" v-model="form.date" required />
  
          <label>Mô tả ngắn:</label>
          <textarea v-model="form.summary" required></textarea>
  
          <label>Mô tả chi tiết:</label>
          <textarea v-model="form.description"></textarea>
  
          <label>Ảnh:</label>
          <input type="file" @change="handleFileUpload" />
  
          <label>
            <input type="checkbox" v-model="form.is_featured" />
            Đánh dấu là nổi bật
          </label>
  
          <button type="submit" class="btn btn-success">
            {{ isEditing ? "Lưu chỉnh sửa" : "Thêm mới" }}
          </button>
          <button type="button" @click="$emit('close')">Hủy</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          category: "",
        },
        categories: [
            'Giải thưởng',
            'Dự án',
            'Nghiên cứu',
            'Hội thảo',
            'Đào tạo',
            'Cộng đồng'
          ],
      };
    },
    props: {
      isEditing: Boolean,
      form: Object,
    },
    methods: {
      handleSubmit() {
        this.$emit("submit", this.form);
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.$emit("file-upload", file);
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS cho modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
  }
  </style>
  