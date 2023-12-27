import axios from "axios";

const desactivarCuentaApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/desactivar-usuario/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const desactivarCuenta = (username) => desactivarCuentaApi.post(`/${username}/`);
