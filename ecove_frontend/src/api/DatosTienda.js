
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/ecove/";

const DatosTiendaApi = axios.create({
  baseURL: baseURL + "crearTienda/",
});

export const createTienda = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await DatosTiendaApi.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });

    return { sed_id: response.data.sed_id, ...response.data };
  } catch (error) {
    throw error;
  }
};

export const updateDatosTienda = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(baseURL + `tienda/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la tienda con id ${id}:`, error.response);
    throw error;
  }
};

export const getTienda = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(baseURL + `tienda/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la tienda con id ${id}:`, error.response);
    throw error;
  }
};

