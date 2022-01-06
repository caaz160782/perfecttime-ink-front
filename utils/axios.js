import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'http://localhost:8008/'
})

export default clienteAxios;