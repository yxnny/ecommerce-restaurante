import React, { useState, useEffect } from "react";
import BarraTiendaCliente from "../../components/Cliente/BarraTiendaCliente";
import MyModal from "../../components/Cliente/Modaladdcarrito";
import { getAllTodasLasTiendasConProductos } from "../../api/TodasLasTiendasConProductos";
const BodyClienteProd = () => {
  const [tiendas, setTiendas] = useState([]);

  const loadTiendas = async () => {
    try {
      const res = await getAllTodasLasTiendasConProductos();
      // Filtrar solo tiendas activas
      const tiendasActivas = res.data.filter(
        (tienda) => tienda.tienda.owner.includes('@')  // Comprobamos si 'owner' es un correo electrónico
      );
      setTiendas(tiendasActivas);
    } catch (error) {
      // Manejar errores
    }
  };

  useEffect(() => {
    loadTiendas();
  }, []);

  return (
    <div className="">
      <div
        id="barra categoria"
        className="flex items-center justify-between w-full px-4  xl:h-[9vh]  border-y border-gray-100"
      >
        <div className=" p-2 ">
          <h1 className="xl:text-xl">
            Mejores Resultados a tu búsqueda: "{"Vegano"}"
          </h1>
        </div>
      </div>
      <div id="info Tienda" className="p-4">
        {tiendas &&
          tiendas.map((tienda) => (
            <div key={tienda.tienda.sed_id}>
              <div className="mt-2">
                <BarraTiendaCliente img={tienda.tienda.sed_logo} />
              </div>
              {tienda.productos && (
                <div className="flex p-2 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
                  {tienda.productos.map((producto) => (
                    <MyModal
                      idProducto={producto.pro_id}
                      key={producto.pro_id}
                      tienda={producto.sed_id}
                      imgProduct={producto.pro_foto}
                      nombreProduct={producto.pro_nombre}
                      descripcion={producto.pro_especificacion}
                      tipoProducto={producto.pro_tipo}
                      precioProduct={producto.pro_precio}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default BodyClienteProd;
