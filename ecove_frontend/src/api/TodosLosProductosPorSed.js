import axios from "axios";

// Cambia el nombre de la función y la variable
const TodosLosProductosPorSedApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/productosPorSed/",
});

export const getTotalProductosPorSed = (sedId) => TodosLosProductosPorSedApi.get(`/${sedId}`);
