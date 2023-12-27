import axios from "axios";

const clienteApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/clientes/'
})

// para pedri los datos del api
export const getAllUsuarioRolClientes = () => clienteApi.get('/');
