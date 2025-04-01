<template>
  <section>
    <div class="member text-center py-5 bg-light">
      <div class="member-heading text-center py-3">
      <h3>高品質なサ</h3>
    </div>
    <div class="member-list-container">
      <div v-for="(member, index) in memberData" :key="member.id" class="member-item">
        <div class="member-image-container">
          <img v-if="member.image_path" :src="url + member.image_path" class="member-image" />
        </div>
        <div class="member-text-container">
          <h5 class="member-title">{{ member.name }}</h5>
          <h5 class="member-title">{{ member.position }}</h5>
          <h5 class="member-title">{{ member.description }}</h5>
        </div>
      </div>
    </div>

    <router-link
      v-if="isLoggedIn && userRole === 1"
      to="/member-list"
      class="btn btn-outline-primary position-absolute end-0 bottom-0 m-3"
      style="position: absolute; bottom: 20px; right: 20px;"
    >
      Manage members
    </router-link>
  </div>
  </section>
</template>

<script>
import axios from "axios"
import "@/assets/css/memberhome.css";

export default {
  name: "TeamSection",
  data() {
    return {
      memberData: [],
      url: 'http://localhost/web_company/web_gioi_thieu_cty_be/storage/app/public/members/',
      isLoggedIn: !!localStorage.getItem("token"),
      userRole: parseInt(localStorage.getItem("role_id")) || null,
    };
  },
  mounted() {
    this.fetchMemberData();
  },
  methods: {
    async fetchMemberData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/member", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.memberData = response.data.data;
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    },
  },
};
</script>

