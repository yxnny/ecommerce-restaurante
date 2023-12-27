import React from "react";
import TablaPagosProv from "../../components/Proveedor/TablaPagosProv";
import CardProveedor from "../../components/Proveedor/CardProveedor";
import {
  RiFileList3Line,
  RiCloseFill,
  RiCheckFill,
  RiCoinsLine,
  RiBox3Line,
  RiHandCoinLine,
} from "react-icons/ri";
const Pagos = () => {
  const columnas = ["Imagen", "Nombre", "Cantidad de Ventas"]; // Define las columnas

  const topSellingProducts = [
    // datos de los productos más vendidos
    {
      Nombre: "Producto 1",
      "Cantidad de Ventas": 50,
      Imagen:
        "https://images.pexels.com/photos/6659552/pexels-photo-6659552.jpeg?",
    },
    {
      Nombre: "Producto 2",
      "Cantidad de Ventas": 45,
      Imagen:
        "https://images.pexels.com/photos/6659552/pexels-photo-6659552.jpeg?",
    },
  ];
  const columnasPagos = ["Cliente", "Metodo", "Total Ingreso"];
  const datosPago = [
    {
      Cliente: 3,
      Metodo: "Tarjeta",
      "Total Ingreso": "200.000",
    },
    {
      Cliente: 30,
      Metodo: "Efectivo",
      "Total Ingreso": "500.000",
    },
  ];
  return (
    <>
      <div className=" bg-white">
        <div>
          <h1 className="text-2xl font-medium ml-4 pt-4">Pagos</h1>
        </div>
        {/* Contenido */}
        <div className=" p-4 ">
          <div>
            {/* columnas */}
            <div className=" border rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  py-2 px-2 gap-5">
              <div className="flex items-center rounded-md ">
                <img
                  src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div className="pl-2">
                  <h5 className="text-base font-medium">Nombre tienda</h5>
                  <p className=" text-sm font-medium text-gray-500">
                    Bienvenido a Ecove
                  </p>
                </div>
              </div>
              <CardProveedor
                icono={<RiCoinsLine />}
                titulo="Ingresos Totales"
                subtitulo={" $ variable"}
              />
              <CardProveedor
                icono={<RiBox3Line />}
                titulo="Productos Vendidos"
                subtitulo={" $ variable"}
              />
              <CardProveedor
                icono={<RiHandCoinLine />}
                titulo="Ganancia"
                subtitulo={" $ variable"}
              />
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <div className=" rounded-md  p-1">
              <h1 className="text-lg font-medium mb-1">
                Productos más vendidos
              </h1>
              <p className="text-justify text-sm">
                ¡Descubre cuáles son tus productos más populares! Aquí te
                presentamos los artículos que tus clientes adoran y que están
                impulsando el éxito de tu restaurante.
              </p>
              <div className="mt-2">

              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-2 border">
                <div className=" flex items-center text-center p-2 ">
                  <div>
                    <RiFileList3Line className="text-3xl text-green-800" />
                  </div>
                  <div className="pl-2">
                    {/* Nombre de categoría */}
                    <h1 className="text-sm text-gray-700">Ordenes aceptadas</h1>
                    {/* Cantidad de categoría */}
                    <p className="text-sm font-medium">{200}</p>
                  </div>
                </div>
                <div className=" flex items-center text-center ">
                  <div>
                    <RiCloseFill className="text-3xl text-red-500 " />
                  </div>
                  <div className="pl-2">
                    {/* Nombre de categoría */}
                    <h1 className="text-sm text-gray-700">
                      Ordenes Rechazadas
                    </h1>
                    {/* Cantidad de categoría */}
                    <p className="text-sm font-medium">{200}</p>
                  </div>
                </div>
                <div className=" flex items-center text-center ">
                  <div>
                    <RiCheckFill className="text-3xl text-blue-400" />
                  </div>
                  <div className="pl-2">
                    {/* Nombre de categoría */}
                    <h1 className="text-sm text-gray-700">
                      Ordenes Entregadas
                    </h1>
                    {/* Cantidad de categoría */}
                    <p className="text-sm font-medium">{200}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md  p-1">
              <div>
                <h1 className="text-lg font-medium mb-1">
                  Metodos de pagos preferidos
                </h1>
                <p className="text-justify text-sm">
                  Aquí puedes encontrar información sobre cómo los clientes
                  prefieren pagar por sus pedidos. Esta información puede ser
                  valiosa para adaptar tu oferta.
                </p>
              </div>
              <div className="mt-2">
                <TablaPagosProv
                  columnasPagos={columnasPagos}
                  datosPago={datosPago}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pagos;
