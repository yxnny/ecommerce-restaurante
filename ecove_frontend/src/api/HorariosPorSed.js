import axios from 'axios'

const horariosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/horariosPorSed/'
})

// para pedri los datos del api
export const getAllHorariosPorSed = (sed_id) => horariosApi.get(`/${sed_id}/`);



export const getHorario = (id) => horariosApi.get(`/${id}`);
