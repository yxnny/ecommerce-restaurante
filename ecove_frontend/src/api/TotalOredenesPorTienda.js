import axios from 'axios'

const OrdenesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/TotalOrden/'
})

export const getTotalOrdenesTienda = (tienda) => OrdenesApi.get(`/${tienda}/`);