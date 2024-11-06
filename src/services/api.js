import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "X-User-Id": JSON.parse(localStorage.getItem("user"))?.user_id,
    }
})

export default api