import axios from "axios";

const productosTotalTiendaApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/ecove/TotalProductosPorSed/'
});

export const getTotalProductosTienda = (sedId) => productosTotalTiendaApi.get(`/${sedId}`);
