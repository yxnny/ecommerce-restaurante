import axios from "axios";

const clienteApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/api/login/",
});

export const validateUsuario = (credenciales) => clienteApi.post("", { username: credenciales.username, password: credenciales.password });



