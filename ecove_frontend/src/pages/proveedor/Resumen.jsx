import React, { useState, useEffect } from "react";
import CardProveedor from "../../components/Proveedor/CardProveedor";
import {
  RiFunctionLine,
  RiCoinsLine,
  RiFileList3Line,
  RiBox3Line,
} from "react-icons/ri";
import { getOdenes } from "../../api/Ordenes";
import { getTotalProductosPorSed } from "../../api/TodosLosProductosPorSed";
import { getTotalCategoriasTienda } from "../../api/TotalCategoriasPorTienda";
import { getTotalProductosTienda } from "../../api/TotalProductosPorTienda";
import { getTotalOrdenesTienda } from "../../api/TotalOredenesPorTienda";
import { getProductosConTotalOrdenes } from "../../api/ProductosConTotalOrdenesPorSed";

const Resumen = () => {
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalOrdenes, setTotalOrdenes] = useState(0);
  const [productosConTotalOrdenes, setProductosConTotalOrdenes] = useState([]);
  const [numordenes, setNumordenes] = useState("");
  const [Ingresos, setIngresos] = useState("");
  const [IdSede, setIdSede] = useState("");

  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProductosConTotalOrdenes = async () => {
      try {
        const sedId = localStorage.getItem("sed_id");
        const response = await getProductosConTotalOrdenes(sedId);
        setProductosConTotalOrdenes(response.data);
      } catch (error) {
        console.error("Error al obtener productos con total de órdenes", error);
      }
    };

    fetchProductosConTotalOrdenes();
  }, []);

  const loadOrdenes = async () => {
    const tiendaSedId = localStorage.getItem("sed_id");

    const res = await getOdenes(tiendaSedId);
    // Filtrar solo tiendas activas
    const OrdenesActivas = res.data;

    const totalIngresos = OrdenesActivas.reduce((acumulador, orden) => {
      return acumulador + orden.total;
    }, 0);
    setIngresos(totalIngresos);
  };

  useEffect(() => {
    loadOrdenes();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      const sedId = localStorage.getItem("sed_id");
      const response = await getTotalProductosPorSed(sedId);
      setProductos(response.data);
    };
    fetchProductos();
  }, []);
  useEffect(() => {
    const fetchOrdenes = async () => {
      const sedId = localStorage.getItem("sed_id");
      const response = await getTotalOrdenesTienda(sedId);
      console.log("Nuevo total de Ordenes:", response.data.total_categorias);
      setTotalOrdenes(response.data.total_ordenes);
    };
    fetchOrdenes();
  }, [totalOrdenes]);
  useEffect(() => {
    const fetchTotalCategorias = async () => {
      try {
        const sedId = localStorage.getItem("sed_id");
        console.log(
          "Resumen se está volviendo a renderizar con totalCategorias:",
          totalCategorias
        );
        const response = await getTotalCategoriasTienda(sedId);
        console.log(
          "Nuevo total de categorías:",
          response.data.total_categorias
        );
        setTotalCategorias(response.data.total_categorias);
      } catch (error) {
        console.error("Error al obtener el total de categorías", error);
      }
    };
    fetchTotalCategorias();
  }, [totalCategorias]);
  useEffect(() => {
    const fetchTotalProductos = async () => {
      try {
        const sedId = localStorage.getItem("sed_id");
        console.log(
          "Resumen se está volviendo a renderizar con totalProductos:",
          totalProductos
        );
        const response = await getTotalProductosTienda(sedId);
        console.log("Nuevo total de productos:", response.data.total_productos);
        setTotalProductos(response.data.total_productos);
      } catch (error) {
        console.error("Error al obtener el total de productos", error);
      }
    };

    fetchTotalProductos();
  }, [totalProductos]);
  return (
    <>
      <div className=" bg-white">
        <div>
          <h1 className="text-2xl font-medium ml-4 pt-4">Resumen</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 mb-8 mt-8">
          <CardProveedor
            icono={<RiCoinsLine />}
            titulo="Total Ingresos"
            subtitulo={Ingresos}
          />
          <CardProveedor
            titulo="Total Categoria"
            subtitulo={totalCategorias} //se supone que se pasa el valor de la varible o no se, que sea lo que dios quiera alv
            icono={<RiFunctionLine />} // Puedes pasar el icono como texto el nombre del icono
          />
          <CardProveedor
            titulo="Total Productos"
            subtitulo={totalProductos}
            icono={<RiBox3Line />} // Puedes cambiar el icono aquí también
          />
          {/* 3 card */}
          <CardProveedor
            titulo="Total Ordenes Recibidas"
            subtitulo={totalOrdenes}
            icono={<RiFileList3Line />} // Puedes cambiar el icono aquí también
          />
        </div>
        <div className="  mt-4 p-4 ">
          {/* tabla mostrar productoss total orden*/}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1  gap-4 mb-4">
            <div className="p-2 shadow-md border">
              <div className="mb-2">
                <h1 className="text-lg font-medium mb-1">
                  Productos y su ordenes
                </h1>
                <p className="text-justify text-sm">
                  Es esencial conocer cuáles son los productos más comprados por
                  los clientes para poder mantener un inventario eficiente y
                  satisfacer sus necesidades de manera óptima.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-primary">
                    <tr>
                      <th className="border text-left text-white uppercase text-sm px-2">
                        Nombre producto
                      </th>
                      <th className="border text-left text-white uppercase text-sm px-2">
                        Precio producto
                      </th>
                      <th className="border text-left text-white uppercase text-sm px-2">
                        Total Órdenes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosConTotalOrdenes.map((producto) => (
                      <tr key={producto.producto_id}>
                        <td className="border text-left text-sm px-2">
                          {producto.producto_nombre}
                        </td>
                        <td className="border text-left text-sm px-2">
                          {producto.producto_precio}
                        </td>
                        <td className="border text-left text-sm px-2">
                          {producto.producto_total_ordenes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resumen;
