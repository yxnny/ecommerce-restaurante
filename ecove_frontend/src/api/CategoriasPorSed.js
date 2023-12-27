import axios from "axios";

const categoriasPorSedApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/categoriaPorSed/",
});

export const getAllCategoriasPorSed = (sedId) => categoriasPorSedApi.get(`/${sedId}/`);
