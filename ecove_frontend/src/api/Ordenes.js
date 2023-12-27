import axios from 'axios'

const OrdenesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/ordenes_sede/'
})

export const getOdenes = (tienda) => OrdenesApi.get(`/${tienda}/`);




// Configuración para detalles de usuario
const DetallesUsuarioApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/detalles-usuario/',
  });


export const getDetallesUsuario = (username) => DetallesUsuarioApi.get(`/${username}/`);
