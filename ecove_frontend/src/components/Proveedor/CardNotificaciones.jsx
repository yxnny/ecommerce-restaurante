import React from "react";
// import axios from 'axios';
const CardNotificaciones = ({
  icono,
  nombreUsuario,
  fecha,
  calificacion,
  nombrePlato,
  gustar,
}) => {
  return (
    <div className="flex items-center mb-4 border p-1 rounded-md">
      {icono && <div className="mr-2 flex-shrink-0">{icono}</div>}

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">{nombreUsuario}</h1>
          <p className="text-xs text-gray-500">{fecha}</p>
        </div>
        <div>
          {calificacion && (
            <div>
              <p className="font-medium text-sm text-gray-500">
                Le dio {calificacion} estrellas a {" "}
                <span className="text-gray-500 font-normal">{nombrePlato}</span>
              </p>
            </div>
          )}
        </div>
        <div>
          {gustar && (
            <div>
              <p className="font-medium text-sm text-gray-500">
                Le gusta tu restaurante {" "}
                <span className="text-gray-500 font-normal">{gustar}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardNotificaciones;
