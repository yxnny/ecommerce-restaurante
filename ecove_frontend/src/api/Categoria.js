import axios from "axios";

const categoriasApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/ecove/api/categoria/'
});

export const getCategoria = (id) => categoriasApi.get(`/${id}`);

// Asegúrate de incluir sed_id en el objeto categoria que pasas a estas funciones
export const createCategoria = (categoria) => categoriasApi.post("/", categoria);
export const updateCategoria = (id, categoria) => categoriasApi.put(`/${id}/`, categoria);

export const deleteCategoria = (id) => categoriasApi.delete(`/${id}`);
