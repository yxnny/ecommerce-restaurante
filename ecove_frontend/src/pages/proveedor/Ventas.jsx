import React, { useState } from "react";
import CardProveedor from "../../components/Proveedor/CardProveedor";
import TablaPagosProv from "../../components/Proveedor/TablaPagosProv";
import FiltroVentas from "../../components/Proveedor/FiltroVentas";
import {
  RiFileList3Line,
  RiUserLine,
  RiCoinsLine,
  RiHandCoinLine,
} from "react-icons/ri";
const ventas = () => {
  const [filtroActual, setFiltroActual] = useState("");
  const columnasPagos = [
    "Id",
    "Orden",
    "Cliente",
    "Fecha",
    "Producto",
    "Cantidad",
    "Metodo",
    "Total",
    "Ganancia",
  ];
  const datosPago = [
    {
      Id: 1,
      Orden: "#1",
      Cliente: "Nombre User",
      Fecha: "3/26/2022",
      Producto: "Nombre Producto",
      Cantidad: 2,
      Metodo: "Tarjeta",
      Total: "200.000",
      Ganancia: "155.000",
    },
  ];
  const handleFiltroSeleccionado = (filtro) => {
    //  lógica para filtrar los datos según el filtro seleccionado
    setFiltroActual(filtro);
  };
  return (
    <>
      <div className=" bg-white">
        <div className="ml-4 pt-4 flex justify-between	pr-4">
          <h1 className="text-2xl font-medium">Ventas</h1>
          <div>
            <FiltroVentas
              titulo={"Periodo:"}
              onFiltroSeleccionado={handleFiltroSeleccionado}
            />
          </div>
        </div>
        {/* Contenido */}
        <div className=" p-4 ">
          <div>
            {/* columnas */}
            <div className="rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 ">
              <CardProveedor
                titulo="Ingresos total"
                subtitulo={"Total: " + "200.000"}
                icono={<RiCoinsLine />}
              />
              <CardProveedor
                // se le cobra el 25% por cada venta de un producto
                titulo="Ganancia"
                subtitulo={" $ 155.000"}
                icono={<RiHandCoinLine />}
              />
              <CardProveedor
                titulo="Cantidad usuarios que compraron"
                subtitulo={"25"}
                icono={<RiUserLine />}
              />
              <CardProveedor
                titulo="Ordenes Realizadas"
                subtitulo={"25"}
                icono={<RiFileList3Line />}
              />
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="mb-4">
            <h1 className="text-lg font-medium mb-1">Ultimas ventas</h1>
            <p className="text-justify text-sm">
              Aquí puedes ver tus ventas más recientes, incluyendo los ingresos
              totales, ganancias, cantidad de usuarios que compraron y el número
              de órdenes para este mes, el mes pasado y hace 7 días.
            </p>
          </div>
          <div>
            <TablaPagosProv
              columnasPagos={columnasPagos}
              datosPago={datosPago}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ventas;
