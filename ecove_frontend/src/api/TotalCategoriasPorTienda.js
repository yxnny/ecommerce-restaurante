import axios from "axios";

const categoriasTotalTiendaApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/ecove/TotalCategoriaPorSed/'
});

export const getTotalCategoriasTienda = (sedId) => categoriasTotalTiendaApi.get(`/${sedId}`);
