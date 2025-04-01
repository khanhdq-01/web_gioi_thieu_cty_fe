<template>
    <NavBar :name="userName" :role="roleId" />
    <div class="map-container">
      <input v-model="searchQuery" placeholder="Nhập địa điểm..." @keyup.enter="searchLocation" class="search-box" />
      <div id="map" ref="map" class="map"></div>
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
        map: null,
        marker: null,
        searchQuery: "",
        geocoder: null,
      };
    },
    mounted() {
      this.loadGoogleMaps();
    },
    methods: {
      loadGoogleMaps() {
        if (!window.google) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = this.initMap;
          document.head.appendChild(script);
        } else {
          this.initMap();
        }
      },
      initMap() {
        this.map = new google.maps.Map(this.$refs.map, {
          center: { lat: 10.7769, lng: 106.7009 }, // Tọa độ mặc định: TP.HCM
          zoom: 13,
        });
        this.geocoder = new google.maps.Geocoder();
      },
      searchLocation() {
        if (!this.searchQuery) return;
        this.geocoder.geocode({ address: this.searchQuery }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            this.map.setCenter(location);
            this.map.setZoom(15);
            if (this.marker) this.marker.setMap(null);
            this.marker = new google.maps.Marker({
              position: location,
              map: this.map,
            });
          } else {
            alert("Không tìm thấy địa điểm! Vui lòng thử lại.");
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .search-box {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .map {
    width: 100%;
    height: 100%;
  }
  </style>
  