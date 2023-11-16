import axios from 'axios';

export default axios.create({
    baseURL: 'http://20.226.103.168:5001',
    //baseURL: 'http://localhost:5001',
});
