import axios from "axios";

const TodasLasTiendasApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/tiendasRegistradas/'
})

// para pedri los datos del api
export const getAllTodasLasTiendas = () => TodasLasTiendasApi.get('/');

