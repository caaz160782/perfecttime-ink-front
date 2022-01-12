import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:8000/",
  //baseURL: "https://backaws-api.perfecttimeink.info/",
});

export default clienteAxios;
