import axios from "axios";

const api = axios.create({
    baseURL: "https://meus-gastos-server.herokuapp.com",
    withCredentials: true,
});

export default api;