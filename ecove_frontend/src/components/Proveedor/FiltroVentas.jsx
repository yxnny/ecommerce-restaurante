import React, { useState } from "react";
// import axios from 'axios';
const FiltroVentas = ({ onFiltroSeleccionado, titulo }) => {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("este-mes");

  const handleFiltroChange = (event) => {
    const nuevoFiltro = event.target.value;
    setFiltroSeleccionado(nuevoFiltro);
    onFiltroSeleccionado(nuevoFiltro); // Llama a una función para manejar el filtro seleccionado
  };

  return (
    <div>
      <div className="flex items-center space-x-2 ">
        <div className="text-sm font-medium">{titulo}</div>
        <select
          className="w-42 py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
          value={filtroSeleccionado}
          onChange={handleFiltroChange}
        >
          <option value="este-mes">Este Mes</option>
          <option value="ultimos-7-dias">Últimos 7 Días</option>
          <option value="mes-anterior">Mes Anterior</option>
        </select>
      </div>
    </div>
  );
};

export default FiltroVentas;
