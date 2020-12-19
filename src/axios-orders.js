import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-24eb0-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;