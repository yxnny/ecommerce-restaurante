import React, { useState } from "react";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";

const CalificacionEstrellas = () => {
    const [calificacion, setCalificacion] = useState(0);
  
    const handleClick = (valor) => {
      if (calificacion === valor) {
        // Si el usuario hace clic en la estrella que ya estaba seleccionada, la deselecciona.
        setCalificacion(0);
      } else {
        setCalificacion(valor);
      }
    };
  
    return (
      <div>
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            key={valor}
            onClick={() => handleClick(valor)}
            className="text-xl pt-1.5"
          >
            {calificacion >= valor ? (
              <RiStarSFill className="text-yellow-400" />
            ) : (
              <RiStarSLine />
            )}
          </button>
        ))}
      </div>
    );
  };
  
  export default CalificacionEstrellas;
  