import axios from 'axios';

// Create an Axios instance to handle the API base URL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  },
});

// Define API functions
export const apiService = {
    login(email, password) {
        return apiClient.post('/auth/login', {
          email,
          password,
        });
      },

      logout(token) {
        return apiClient.get("/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },

    submitCompanyProfile(formData) {
        return apiClient.post('/company-profile', formData, {
          timeout: 10000 // 10 seconds timeout
        });
      },
};
