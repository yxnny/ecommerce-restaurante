/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

const PropProducVende = (props) => {
  const [contador, setContador] = useState(0);

  const aumentarContador = () => {
    setContador(contador + 1);
  };

  const disminuirContador = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-42 relative">
        <img
          src={`${props.imagen}`}
          className="object-cover w-28 h-28 rounded-md"
          alt={props.titulo}
        />
        {props.cantidad && (
          <span className="absolute -top-0.5 right-0 text-white bg-primary py-0.5 px-[5px] box-content rounded-full text-[10px] font-bold">
            {props.cantidad}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-medium">{props.titulo}</h1>
        <h1 className="text-sm font-normal text-gray-600">{props.titulo2}</h1>
        <p className="text-sm text-justify">{props.descripcion}</p>
        <p className="text-lg font-medium">{props.precio}</p>
        {props.mostrarContador && ( // Mostrar botones solo si mostrarContador es verdadero
          <div className="flex items-center space-x-2 pb-2">
            <button
              className="bg-red-600 hover:bg-red-800 text-white p-1 rounded-full"
              onClick={disminuirContador}
            >
              <RiSubtractFill />
            </button>
            <p>{contador}</p>
            <button
              className="bg-green-600 hover:bg-green-800 text-white p-1 rounded-full"
              onClick={aumentarContador}
            >
              <RiAddFill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropProducVende;
