import axios from "axios";

const API = axios.create({
    baseURL: "https://inkwell-backend-kotj.onrender.com/"
});

export default API;