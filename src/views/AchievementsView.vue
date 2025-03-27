<template>
  <div class="achievement-page">
    <NavBar :name="userName" :role="roleId" />
    
    <div class="container py-5">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold text-primary">Thành Tựu & Hoạt Động Công Nghệ</h1>
        <p class="lead">Những dấu ấn nổi bật và đóng góp cho cộng đồng công nghệ</p>
      </div>

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
                @click="editAchievement(achievement)"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <AchievementModal
        v-if="showModal"
        :achievement="selectedAchievement"
        :mode="modalMode"
        @close="showModal = false"
        @save="handleSave"
      />

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

      <!-- Pagination -->
      <nav v-if="totalPages > 1" class="mt-5">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Trước</button>
          </li>
          <li 
            v-for="page in totalPages" 
            :key="page" 
            class="page-item" 
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Sau</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AchievementModal from '@/views/AchievementModal.vue';
import axios from 'axios';

export default {
  name: 'AchievementPage',
  components: { 
    NavBar,
    AchievementModal
  },
  data() {
    return {
      userName: '',
      roleId: '',
      achievements: [],
      searchQuery: '',
      selectedCategory: '',
      currentPage: 1,
      itemsPerPage: 6,
      showModal: false,
      selectedAchievement: null,
      modalMode: 'add',
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
      }
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
    }
  },
  async mounted() {
    this.userName = localStorage.getItem('name');
    this.roleId = localStorage.getItem('role_id');
    await this.fetchAchievements();
  },
  methods: {
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
    viewDetail(id) {
      this.$router.push(`/achievements/${id}`);
    },
    editAchievement(achievement) {
      this.selectedAchievement = { ...achievement };
      this.modalMode = 'edit';
      this.showModal = true;
    },
    openAddModal() {
      this.selectedAchievement = {
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        summary: '',
        description: '',
        image: ''
      };
      this.modalMode = 'add';
      this.showModal = true;
    },
    async handleSave(achievementData) {
      try {
        const url = `http://127.0.0.1:8000/api/achievements${this.modalMode === 'edit' ? '/' + achievementData.id : ''}`;
        const method = this.modalMode === 'add' ? 'post' : 'put';
        await axios({
          method,
          url,
          data: achievementData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        this.showModal = false;
        await this.fetchAchievements();
      } catch (error) {
        console.error('Error saving achievement:', error);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
};
</script>


<style scoped>
.achievement-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.stat-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.achievement-card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-img-top-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img-top {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.achievement-card:hover .card-img-top {
  transform: scale(1.05);
}

.badge {
  font-size: 0.8rem;
  padding: 5px 10px;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-link {
  color: #0d6efd;
}

.empty-state {
  background-color: white;
  border-radius: 10px;
  padding: 3rem;
}
</style>