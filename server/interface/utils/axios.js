import axios from 'axios'

axios.defaults.withCredentials = true
const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {}
})

export default instance
