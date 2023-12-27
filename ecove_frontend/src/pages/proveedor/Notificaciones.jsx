import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { getOdenes, getDetallesUsuario } from "../../api/Ordenes";
import { RiFileList3Line } from "react-icons/ri";

function Notificaciones() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [ordenes, setOrdenes] = useState([]);
  let ordenCounter = 1; // Inicializa el contador

  const loadOrdenes = async () => {
    try {
      const tiendaSedId = localStorage.getItem("sed_id");
      const res = await getOdenes(tiendaSedId);
      const OrdenesActivas = res.data;

      // Cargar y almacenar detalles del usuario para cada orden
      const ordenesConDetallesUsuario = await Promise.all(
        OrdenesActivas.map(async (orden) => {
          const detallesUsuario = await loadUsuarioDetails(orden.usuario);
          return { ...orden, usuNombre: detallesUsuario };
        })
      );

      setOrdenes(ordenesConDetallesUsuario);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    }
  };

  const loadUsuarioDetails = async (username) => {
    try {
      const usuarioDetails = await getDetallesUsuario(username);
      return usuarioDetails.data.usu_nombre;
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      return null;
    }
  };

  useEffect(() => {
    loadOrdenes();
  }, []);

  return (
    <>
      <div className="bg-white ">
        <div className="p-4 w-full ">
          <div className="border border-gray-300 rounded-md pb-7 relative">
            <Tab.Group>
              <Tab.List className={"w-64  mt-6 mb-6 ml-6 "}>
                <Tab.List className="flex rounded-xl">
                  <Tab
                    className={`group  bg-gray-200 w-full rounded-md py-2.5 text-sm font-medium transition-colors focus:outline-none ${
                      selectedTab === 0
                        ? "bg-green-700 text-white"
                        : "text-black text-sm font-medium hover:text-green-800"
                    }`}
                    onClick={() => setSelectedTab(0)}
                  >
                    Notificaciones
                  </Tab>
                </Tab.List>
                {/* Icono más */}
              </Tab.List>
              <Tab.Panels className={"ml-6 mr-6"}>
                {/* Contenido del tab 1 */}
                <Tab.Panel>
                  {/* Tiempo real, es decir noti del día */}
                  <h1 className="text-lg font-bold pb-4">Hoy</h1>
                  {ordenes.map((orden) => (
                    <div className="flex items-center mb-4" key={orden.ord_id}>
                      <RiFileList3Line className="text-2xl mr-2 flex-shrink-0" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h1 className="font-medium text-lg">
                            Orden #{ordenCounter++}
                          </h1>
                          <p className="text-xs text-gray-500">{orden.fecha}</p>
                        </div>
                        <p className="font-medium text-sm text-gray-500">
                          Pedido realizado{" "}
                          <span className="text-gray-500 font-normal">
                            por - {orden.usuNombre || orden.usuario}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notificaciones;
