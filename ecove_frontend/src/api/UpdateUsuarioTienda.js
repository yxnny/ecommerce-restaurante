// ruta que para buscar el usuario por el username y editarlo
import axios from "axios";
const updateUsuarioApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/editarUsuarios/'
})
export const updateUsuario = (id, usuario) => updateUsuarioApi.put(`/${id}/`, usuario);
