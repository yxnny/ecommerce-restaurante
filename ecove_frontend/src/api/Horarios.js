import axios from 'axios'

const horariosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/ecove/api/horario/'
})

// trae todos los horarios
export const createHorario = (horario) => horariosApi.post('/', horario);

export const updateHorario = (id, horario) => horariosApi.put(`/${id}/`, horario);

// export const deleteHorario = (id) => horariosApi.delete(`/${id}`);


