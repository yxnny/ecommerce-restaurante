import axios from "axios";

const metodoporcli = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/Metodo-por-owner/'
})

export const MetodoUsuarioRolCliente = (username) => metodoporcli.get(`/${username}`);

const metodopcli = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/api/metodop/'
})


export const getMetodoUsuarioRolClientes = () => metodopcli.get('/');

export const createmetodop = (data) => metodopcli.post('/',data);

export const updateMetodoRolClientes = (id, updateData) => metodopcli.put(`/${id}/`, updateData);

