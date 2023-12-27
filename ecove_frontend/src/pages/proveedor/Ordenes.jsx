import React, { useState, useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { getOdenes } from "../../api/Ordenes";
import OrdenDetalle from "../../components/Proveedor/OrdenDetalle";
import { getDetallesOrden } from "../../api/DetalleOrden";

const Ordenes = () => {
  const [detalleOrden, setDetalleOrden] = useState(null); // Nuevo estado para almacenar los detalles de la orden seleccionada
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Nuevo estado para almacenar el ID de la orden seleccionada
  const [ordenes, setOrdenes] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [usuNombre, setUsuNombre] = useState(null);
  const [contacto, setContacto] = useState(null);
  const [productos, setProductos] = useState(null);
  const [total, setTotal] = useState(null);
  const [columna2, setColumna2] = useState(false);
  let ordenCounter = 1; // Inicializa el contador

  
  const loadOrdenes = async () => {
    const tiendaSedId = localStorage.getItem("sed_id");
    const res = await getOdenes(tiendaSedId);
    const OrdenesActivas = res.data;
    setOrdenes(OrdenesActivas);
  };

  useEffect(() => {
    loadOrdenes();
  }, []);

  const handleArrowClick = async (orderId) => {
    setSelectedOrderId(orderId);

    try {
      const detallesRes = await getDetallesOrden(orderId);
      const detallesOrden = detallesRes.data;

      console.log("Detalles de la orden:", detallesOrden);

      if (
        detallesOrden.length > 0 &&
        detallesOrden[0].usuario &&
        detallesOrden[0].usuario.cliente
      ) {
        console.log("Usuario:", detallesOrden[0].usuario);
        console.log("Cliente:", detallesOrden[0].usuario.cliente);
        console.log("Username:", detallesOrden[0].usuario.cliente.username);
        const orderId = detallesOrden[0].id;
        const direccion = detallesOrden[0].usuario.cliente.direccion;
        const contacto = detallesOrden[0].usuario.cliente.contacto;
        const usuNombre = detallesOrden[0].usuario.cliente.usu_nombre;
        const productos = detallesOrden[0].productos;
        const total = detallesOrden[0].total; 

        console.log("ID de la orden:", orderId);
        console.log("Dirección monda:", direccion);
        console.log("tel:", contacto);
        console.log("Usu_nombre:", usuNombre);
        console.log("Productos:", productos);
        console.log("total:",total );

        setDetalleOrden(detallesOrden);
        setOrderId(orderId);
        setDireccion(direccion);
        setUsuNombre(usuNombre);
        setContacto(contacto);
        setProductos(productos);
        setTotal(total);

        
        setColumna2(true);

        console.log("Usuario o Cliente no está definido");
      }
    } catch (error) {
      console.error("Error al obtener detalles de la orden:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-full sm:w-1/2 lg:w-96 bg-white p-4 border-l-4 ">
          <div>
            <div className="w-full rounded-lg py-2.5 bg-green-600 text-center text-white text-lg font-medium focus:outline-none ">
              Ordenes
            </div>
            <div className="">
              {ordenes.map((orden) => (
                <div
                  key={orden.ord_id}
                  className="group flex flex-row items-center border border-gray-200 p-3 rounded-lg hover:border-green-800 hover:bg-green-200 hover:text-black mt-3"
                >
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">
                      Orden #{ordenCounter++}
                    </h1>
                    <p className="text-sm mt-2">{orden.fecha}</p>
                  </div>
                  <div className="flex ml-auto items-center">
                    <p className="text-lg font-semibold">${orden.total}</p>
                    <button
                      className="ml-2 mr-2 rounded-lg transition  bg-gray-200 group-hover:bg-green-800 group-hover:text-white"
                      onClick={() => 
                        handleArrowClick(orden.ord_id)
                      }
                    >
                      <RiArrowRightSLine />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* columna2 */}
        {columna2 && (
          <div className="flex-1 w-full sm:w-1/2 bg-white">
            <OrdenDetalle
              orderNumber={orderId}
              direccion={direccion}
              usuNombre={usuNombre}
              telCliente={contacto}
              productos={productos}
              totalCalculado={total} // Pasa el total calculado desde tu vista
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Ordenes;
