<template>
  <div>
    <NavBar :name="userName" :role="roleId" />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: { 
    NavBar
  },
  data() {
    return {
      userName: '',
      roleId: '',
    };
  },
};
</script>