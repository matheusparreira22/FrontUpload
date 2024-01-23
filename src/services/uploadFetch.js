import axios from "axios"

const apiUrl = 'http://localhost:3001/'
axios.defaults.crossDomain = true;

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: apiUrl
})

export default api