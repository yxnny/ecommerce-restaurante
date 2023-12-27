import axios from "axios";

const productosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/api/",
});

export const getAllProductos = (categoryId) => {
  // Utiliza la URL de la categoría específica junto con /productos/
  return productosApi.get(`/categoria/${categoryId}/productos/`);
};
