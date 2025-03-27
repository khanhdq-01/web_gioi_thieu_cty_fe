<template>
  <div class="achievement-page">
    <NavBar :name="userName" :role="roleId" />
    
    <div class="container py-5">
      <!-- Header Section -->

      <!-- Filter Controls -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Tìm kiếm thành tựu..." 
              v-model="searchQuery"
            >
          </div>
        </div>
        <div class="col-md-6">
          <select class="form-select" v-model="selectedCategory">
            <option value="">Tất cả danh mục</option>
            <option v-for="category in categories" :value="category" :key="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="row mb-5 g-4">
        <div class="col-md-4">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <h3 class="text-primary">{{ totalAchievements }}</h3>
              <p class="mb-0">Thành tựu</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <h3 class="text-success">{{ activeProjects }}</h3>
              <p class="mb-0">Dự án đang hoạt động</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <h3 class="text-warning">{{ yearsExperience }}+</h3>
              <p class="mb-0">Năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements List -->
      <div class="row g-4">
        <div 
          v-for="achievement in filteredAchievements" 
          :key="achievement.id" 
          class="col-md-6 col-lg-4"
        >
          <div class="card achievement-card h-100">
            <div class="card-img-top-container">
              <img 
                :src="achievement.image" 
                class="card-img-top" 
                :alt="achievement.title"
              >
              <span class="badge bg-primary position-absolute top-0 end-0 m-2">
                {{ achievement.category }}
              </span>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ achievement.title }}</h5>
              <p class="card-text text-muted">
                <small>
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ formatDate(achievement.date) }}
                </small>
              </p>
              <p class="card-text">{{ achievement.summary }}</p>
            </div>
            <div class="card-footer bg-transparent">
              <button 
                class="btn btn-outline-primary btn-sm"
                @click="viewDetail(achievement.id)"
              >
                Xem chi tiết
              </button>
              <button 
                v-if="roleId == 1" 
                class="btn btn-outline-secondary btn-sm ms-2"
                @click="editAchievement(achievement.id)"
              >
                Chỉnh sửa
              </button>
              <button 
                v-if="roleId == 1" 
                class="btn btn-outline-secondary btn-sm ms-2"
                @click="deleteAchievement(achievement.id)"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty State -->
      <div v-if="filteredAchievements.length === 0" class="text-center py-5">
        <i class="fas fa-trophy fa-4x text-muted mb-3"></i>
        <h4>Không tìm thấy thành tựu phù hợp</h4>
        <p class="text-muted">Hãy thử thay đổi tiêu chí tìm kiếm</p>
      </div>

      <!-- Thêm nút riêng biệt bên ngoài empty state -->
      <div class="text-center mb-4" v-if="roleId == 1">
        <button 
          class="btn btn-primary"
          @click="openAddModal"
        >
          <i class="fas fa-plus me-2"></i>Thêm thành tựu mới
        </button>
      </div>
    </div>
    <!--Form-->

    <AchievementForm
      v-if="showModal"
      :isEditing="isEditing"
      :form="form"
      @close="showModal = false"
      @submit="isEditing ? updateAchievement() : submitAchievement()"
      @file-upload="handleFileUpload"
    />

    <!---view detail-->
      <AchievementDetail 
        :show="showDetailModal"
        :achievement="selectedAchievement"
        @close="showDetailModal = false"
      />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AchievementDetail from "@/views/achievement/AchievementDetail.vue";
import AchievementForm from "@/views/achievement/AchievementForm.vue";
import axios from 'axios';

export default {
  name: 'AchievementPage',
  components: { 
    NavBar,
    AchievementDetail,
    AchievementForm
  },
  data() {
    return {
      userName: '',
      isSubmitting: false, // Tránh gọi API nhiều lần
      roleId: '',
      selectedAchievement: {},
      showDetailModal: false,
      achievements: [],
      searchQuery: '',
      selectedCategory: '',
      currentPage: 1,
      itemsPerPage: 6,
      showModal: false,
      categories: [
        'Giải thưởng',
        'Dự án',
        'Nghiên cứu',
        'Hội thảo',
        'Đào tạo',
        'Cộng đồng'
      ],
      stats: {
        total: 0,
        activeProjects: 0,
        yearsExperience: 0
      },
      form: {
        title: '',
        category: '',
        date: '',
        summary: '',
        description: '',
        image_file: null,
        is_featured: false,
      },
    };
  },
  computed: {
    filteredAchievements() {
      let filtered = this.achievements;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.summary.toLowerCase().includes(query)
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(item => item.category === this.selectedCategory);
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(start, start + this.itemsPerPage);
    },
    totalAchievements() {
      return this.achievements.length;
    },
    activeProjects() {
      return this.achievements.filter(a => a.status === 'active').length;
    },
    yearsExperience() {
      if (!this.achievements.length) return 0;
      const oldest = Math.min(...this.achievements.map(a => new Date(a.date).getFullYear()));
      return new Date().getFullYear() - oldest;
    },
    totalPages() {
      return Math.ceil(this.achievements.length / this.itemsPerPage);
    },
  },
  async mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    await this.fetchAchievements();
  },
  methods: {
    openAddModal() {
        this.form = {
          id: null,
          title: '',
          category: '',
          date: '',
          summary: '',
          description: '',
          image_file: null,
          is_featured: false,
        };
        this.isEditing = false;
        this.showModal = true;
      },
    handleFileUpload(event) {
      this.form.image_file = event.target.files[0];
    },
    async submitAchievement() {
      if (this.isSubmitting) return; // Nếu đang gửi, bỏ qua
    this.isSubmitting = true;
      try {
        let formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('category', this.form.category);
        formData.append('date', this.form.date);
        formData.append('summary', this.form.summary);
        formData.append('description', this.form.description);
        formData.append('is_featured', this.form.is_featured ? 1 : 0);
        if (this.form.image_file) {
          formData.append('image_file', this.form.image_file);
        }

        const response = await axios.post('http://127.0.0.1:8000/api/achievements', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.fetchAchievements();
        this.showModal = false;
        this.resetForm();

      } catch (error) {
        console.error('Lỗi khi thêm thành tựu:', error.response?.data || error);
      
      }  finally {
      this.isSubmitting = false; 
    }
    },
    resetForm() {
      this.form = {
        title: '',
        category: '',
        date: '',
        summary: '',
        description: '',
        image_file: null,
        is_featured: false,
      };
    },
    async fetchAchievements() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/achievements');
        this.achievements = response.data;
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    async editAchievement(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/achievements/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.form = { ...response.data }; // Đổ dữ liệu vào form
        this.isEditing = true; // Đặt chế độ chỉnh sửa
        this.showModal = true;
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thành tựu:', error.response?.data || error);
      }
    },
    async updateAchievement() {
      try {
        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', this.form.title);
        formData.append('category', this.form.category);
        formData.append('date', this.form.date);
        formData.append('summary', this.form.summary);
        formData.append('description', this.form.description);
        formData.append('is_featured', this.form.is_featured ? 1 : 0);
        if (this.form.image_file) {
          formData.append('image_file', this.form.image_file);
        }

        const response = await axios.post(`http://127.0.0.1:8000/api/achievements/${this.form.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert(response.data.message);

        const index = this.achievements.findIndex(a => a.id === this.form.id);
        if (index !== -1) {
          this.achievements[index] = response.data.data;
        }

        this.showModal = false;
        this.isEditing = false; // Đặt lại chế độ về thêm mới
        this.resetForm();
      } catch (error) {
        console.error('Lỗi khi cập nhật thành tựu:', error.response?.data || error);
      }
    },
    async deleteAchievement(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa thành tựu này?")) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/achievements/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
      });
      
      // Cập nhật danh sách sau khi xóa
      this.achievements = this.achievements.filter(a => a.id !== id);

      alert("Xóa thành tựu thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa thành tựu:", error.response?.data || error);
      alert("Không thể xóa thành tựu. Vui lòng thử lại.");
    }
    },
    async viewDetail(id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/achievements/${id}`);
      this.selectedAchievement = response.data;
      this.showDetailModal = true; // Hiển thị modal chi tiết
    } catch (error) {
      console.error("Lỗi khi lấy thông tin thành tựu:", error.response?.data || error);
      alert("Không thể tải dữ liệu, vui lòng thử lại!");
    }
  }
  }
};
</script>