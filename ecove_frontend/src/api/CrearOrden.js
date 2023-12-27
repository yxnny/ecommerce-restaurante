import axios from "axios";

const cordenApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/crear_orden/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const createOrden = (ordenData) => cordenApi.post("/", ordenData);
