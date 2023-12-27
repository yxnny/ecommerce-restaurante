import axios from "axios";


const clientPutDeleteApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/editarUsuariosCliente/'
})

export const updateUsuarioRolClientes = (username, updateData) => clientPutDeleteApi.put(`/${username}/`, updateData);