import React from "react";
// import axios from 'axios';
const TablaPagosProv = ({ columnasPagos, datosPago }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-primary">
          <tr>
            {columnasPagos.map((columnasPago, index) => (
              <th
                className="border text-left text-white uppercase text-sm px-2"
                key={index}
              >
                {columnasPago}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datosPago.map((fila, index) => (
            <tr key={index}>
              {columnasPagos.map((columnasPago, columnIndex) => (
                <td className="border px-2 py-1 text-sm" key={columnIndex}>
                  {fila[columnasPago]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPagosProv;
