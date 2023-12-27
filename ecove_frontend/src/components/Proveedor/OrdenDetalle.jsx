import React, { useState } from "react";
import { RiUserLocationLine, RiUser3Line } from "react-icons/ri";

const OrdenDetalle = (props) => {
  const {
    orderNumber,
    usuNombre,
    productos,
    direccion,
    totalCalculado,
    descripcionOrden,
    orderDate,
    telCliente,
  } = props;
  let idCounter  = 1; // Inicializa el contador de productos

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium mb-2">Detalle de la Orden</h1>
      <p className="mb-4 text-sm">
        Aquí verás nuevas órdenes de tus clientes. Acéptalas para confirmar que
        las prepararás.
      </p>
      <div className="border border-gray-200 p-4 rounded-lg">
        <div className="mb-4">
          <div className="rounded-lg mb-4 flex justify-between items-center">
            <div>
              <h1 className="text-base font-semibold mb-2">
                Orden Recibida
              </h1>
              <p className="text-xs text-gray-500">{orderDate}</p>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <RiUser3Line className="w-12 h-12 object-cover rounded-lg" />
              </div>
              <div className="text-xs text-gray-500">
                <p className="text-sm font-bold">{usuNombre}</p>
                <h1>Información de Contacto</h1>
                <p>{telCliente}</p>
              </div>
            </div>
          </div>
          <hr className="my-2 border-gray-300 mb-4" />
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <h1 className="text-xs text-gray-500 mb-2">
                  Dirección de entrega
                </h1>
                <div className="flex items-center">
                  <RiUserLocationLine className="text-xl mr-1" />
                  <p className="text-xs flex-1 font-bold">{direccion}</p>
                </div>
                <p className="text-xs flex-1 font-medium text-gray-500">
                  {descripcionOrden}
                </p>
              </div>
              <div className="mb-2">
                <h1 className="text-xs text-gray-500">
                  Método de pago seleccionado
                </h1>
                <p className="text-xs font-bold">Tarjeta</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-300 mb-2" />
        <div className="">
          <h1 className="text-base font-semibold mb-2">Productos</h1>
          <div className="border border-gray-300 p-2 mb-2">
            {productos &&
              productos.map((producto, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <div>
                    {producto.pro_foto && (
                      <img
                        src={producto.pro_foto}
                        alt={producto.nombre}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-lg font-semibold hover:text-green-900">
                      {producto.nombre}
                    </p>
                    <p className="text-xs text-gray-500 font-bold">
                      Cantidad: {producto.cantidad}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-green-800 mb-1">
                      Valor Unitario
                    </h2>
                    <p className="text-sm font-semibold text-green-800">
                      + $ {producto.precio}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t border-gray-300 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold text-green-800">
                Total: ${totalCalculado}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenDetalle;
