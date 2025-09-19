import axios from 'axios';


//const API_BASE_URL = 'http://localhost:8083/'; // replace with your actual backend URL
const API_BASE_URL = '/'; // replace with your actual backend URL

const apiService = {
  addUser: async (userData:any) => {
/*     const dispatch = useDispatch();

dispatch(showLoader());
 */
    try {
      const response = await axios.post(`${API_BASE_URL}api/v1/users`, userData);
      return response.data;
    } catch (error) {
      alert('Error adding user...');
      throw error;
    }
  /*   finally {
  dispatch(hideLoader());
} */
  },

  // You can add other methods like getUsers, deleteUser, etc.
};


export default apiService;

