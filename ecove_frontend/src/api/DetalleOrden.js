import axios from 'axios'

const detalleOrdenPorIdOrdenApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/detalle_orden/'
})

export const getDetallesOrden = (orderId) => detalleOrdenPorIdOrdenApi.get(`/${orderId}`);
