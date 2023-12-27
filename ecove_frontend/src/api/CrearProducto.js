import axios from "axios";

const productosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/ecove/api/producto/",
});

export const createProducto = (formData, categoriaId) => {
  // En lugar de productosApi.post, usa productosApi.request para configurar el método POST
  return productosApi.request({
    url: `?categoria_id=${categoriaId}`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateProducto = (id, formData, categoriaId) => {
  return productosApi.put(`/${id}/?categoria_id=${categoriaId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProducto = (id) => productosApi.delete(`/${id}`);

export const getProducto = (id) => productosApi.get(`/${id}`);
