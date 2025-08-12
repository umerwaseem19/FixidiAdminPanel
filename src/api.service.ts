import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080'; // replace with your actual backend URL
const API_BASE_URL = '/Fixidi/'; // replace with your actual backend URL

const apiService = {
  addUser: async (userData:any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // You can add other methods like getUsers, deleteUser, etc.
};

export default apiService;