import axios from "axios";

const TodasLasTiendasConProductosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/tiendasConProductos/',
});

// Elimina el parámetro sedId de la función
export const getAllTodasLasTiendasConProductos = () => TodasLasTiendasConProductosApi.get('/');
