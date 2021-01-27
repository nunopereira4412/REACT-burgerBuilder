import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: "https://react-burger-builder-26adf-default-rtdb.firebaseio.com/"
}); 

export default axiosOrders;