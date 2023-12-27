import React from "react";
// import axios from 'axios';
const CardProveedor = (props) => {
  const { titulo, titulo2, icono, subtitulo,subtitulo2 } = props;
  return (
    <div className="flex items-center justify-between bg-gray-100 p-5 rounded-xl mr-4 ml-4 shadow-md">
      <div>
        {/* Nombre categoria */}
        <h1 className="text-sm text-gray-700">{titulo}</h1>
        <h1 className="text-xs text-gray-700 font-medium">{titulo2}</h1>
        {/* Cantidad categoria */}
        <p className="text-black text-lg font-medium">{subtitulo}</p>
      </div>
      <div>
        {/* Utiliza el icono directamente como un componente */}
        {icono && (
          <div className="text-3xl bg-green-600 text-white p-2 box-content rounded-xl">
            {icono}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProveedor;
