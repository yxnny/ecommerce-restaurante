import axios from "axios";

// Cambia el nombre de la función y la variable
const ProductosConTotalOrdeneSedsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/ProductosConTotalOrdenes/",
});

export const getProductosConTotalOrdenes = (sedId) => ProductosConTotalOrdeneSedsApi.get(`/${sedId}`);
