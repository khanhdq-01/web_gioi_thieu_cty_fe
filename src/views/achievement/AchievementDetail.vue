<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ achievement.title }}</h2>
        <p><strong>Danh mục:</strong> {{ achievement.category }}</p>
        <p><strong>Ngày:</strong> {{ formatDate(achievement.date) }}</p>
        <p><strong>Mô tả ngắn:</strong> {{ achievement.summary }}</p>
        <p><strong>Mô tả chi tiết:</strong> {{ achievement.description }}</p>
        <img v-if="achievement.image" :src="achievement.image" alt="Achievement Image" class="img-fluid"/>
        <button class="btn btn-secondary mt-3" @click="$emit('close')">
          Đóng
        </button>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: {
      show: Boolean,
      achievement: Object,
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
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
  