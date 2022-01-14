import axios from "axios";

const clienteAxios = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "http://localhost:8000/",
  //baseURL: "https://backaws-api.perfecttimeink.info/",
});

export default clienteAxios;
