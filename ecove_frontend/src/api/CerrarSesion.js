import axios from "axios";

const cerrarSesionApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/api/logout/",
});

export const cerrarSesion = (token) => cerrarSesionApi.get(`/?token=${token}`);
