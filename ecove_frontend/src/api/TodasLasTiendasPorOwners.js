import axios from "axios";

// Cambia el nombre de la función y la variable
const TiendasPorOwnerApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/tiendas-por-owner/",
});

export const getAllTiendasPorOwnerApi = (username) => TiendasPorOwnerApi.get(`/${username}/`);