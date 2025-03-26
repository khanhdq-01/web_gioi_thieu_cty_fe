<template>
    <div class="modal fade show" tabindex="-1" role="dialog" style="display: block; background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ mode === 'add' ? 'Thêm Thành Tựu Mới' : 'Chỉnh Sửa Thành Tựu' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <!-- Title Input -->
              <div class="mb-3">
                <label for="achievementTitle" class="form-label">Tiêu đề</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="achievementTitle" 
                  v-model="formData.title"
                  required
                >
              </div>
  
              <!-- Category Select -->
              <div class="mb-3">
                <label for="achievementCategory" class="form-label">Danh mục</label>
                <select 
                  class="form-select" 
                  id="achievementCategory" 
                  v-model="formData.category"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  <option v-for="category in categories" :value="category" :key="category">
                    {{ category }}
                  </option>
                </select>
              </div>
  
              <!-- Date Input -->
              <div class="mb-3">
                <label for="achievementDate" class="form-label">Ngày đạt được</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="achievementDate" 
                  v-model="formData.date"
                  required
                >
              </div>
  
              <!-- Image Upload -->
              <div class="mb-3">
                <label for="achievementImage" class="form-label">Hình ảnh</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="achievementImage" 
                  accept="image/*"
                  @change="handleImageUpload"
                >
                <div v-if="imagePreview" class="mt-2">
                  <img :src="imagePreview" class="img-thumbnail" style="max-height: 150px;">
                </div>
                <div v-else-if="formData.image" class="mt-2">
                  <p class="text-muted">Ảnh hiện tại:</p>
                  <img :src="formData.image" class="img-thumbnail" style="max-height: 150px;">
                </div>
              </div>
  
              <!-- Summary Input -->
              <div class="mb-3">
                <label for="achievementSummary" class="form-label">Mô tả ngắn</label>
                <textarea 
                  class="form-control" 
                  id="achievementSummary" 
                  rows="3"
                  v-model="formData.summary"
                  required
                ></textarea>
              </div>
  
              <!-- Description Input -->
              <div class="mb-3">
                <label for="achievementDescription" class="form-label">Nội dung chi tiết</label>
                <textarea 
                  class="form-control" 
                  id="achievementDescription" 
                  rows="5"
                  v-model="formData.description"
                ></textarea>
              </div>
  
              <!-- Status Toggle -->
              <div class="mb-3 form-check form-switch">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="achievementStatus" 
                  v-model="formData.isFeatured"
                >
                <label class="form-check-label" for="achievementStatus">Nổi bật</label>
              </div>
  
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" @click="closeModal">
                  Hủy bỏ
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ mode === 'add' ? 'Thêm mới' : 'Cập nhật' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AchievementModal',
    props: {
      achievement: {
        type: Object,
        default: () => ({})
      },
      mode: {
        type: String,
        default: 'add', // 'add' or 'edit'
        validator: value => ['add', 'edit'].includes(value)
      }
    },
    data() {
      return {
        formData: {
          title: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          summary: '',
          description: '',
          image: '',
          isFeatured: false
        },
        imageFile: null,
        imagePreview: null,
        categories: [
          'Giải thưởng',
          'Dự án',
          'Nghiên cứu',
          'Hội thảo',
          'Đào tạo',
          'Cộng đồng'
        ]
      };
    },
    created() {
      if (this.mode === 'edit' && this.achievement) {
        this.formData = { ...this.achievement };
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imagePreview = URL.createObjectURL(file);
        }
      },
      
      async handleSubmit() {
        try {
          const formData = new FormData();
          
          // Append all form data
          Object.keys(this.formData).forEach(key => {
            formData.append(key, this.formData[key]);
          });
          
          // Append image file if exists
          if (this.imageFile) {
            formData.append('image_file', this.imageFile);
          }
          
          this.$emit('save', formData);
          this.closeModal();
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    },
    watch: {
      achievement(newVal) {
        if (newVal && this.mode === 'edit') {
          this.formData = { ...newVal };
          this.imagePreview = null;
          this.imageFile = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    z-index: 1050;
  }
  
  .modal-content {
    border: none;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    border-bottom: 1px solid #eee;
    padding: 1.5rem;
  }
  
  .modal-title {
    font-weight: 600;
    color: #2c3e50;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .btn-close {
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
  }
  </style>