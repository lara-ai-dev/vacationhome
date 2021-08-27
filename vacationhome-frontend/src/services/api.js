import axios from 'axios'

const HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8080'

const api = axios.create({
    baseURL: `${HOST}/api`,
})

export default api
