import React, { useState, useEffect } from "react";
import MenuCartaItems from "../../components/Proveedor/MenuCartaItems";
import {  deleteCategoria } from "../../api/Categoria";
import { getAllProductos } from "../../api/Productos";
import { getAllCategoriasPorSed } from "../../api/CategoriasPorSed";
import {deleteProducto} from "../../api/CrearProducto/"
import ModalProductos from "../../components/Proveedor/ModalProductos";
import ModalCategoria from "../../components/Proveedor/ModalCategoria";
import {
  RiArrowDropRightLine,
  RiMoreFill,
  RiDeleteBin5Line,
  RiEdit2Line,
  RiRestaurant2Line,
} from "react-icons/ri";
const Carta = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [reloadCategorias, setReloadCategorias] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProducto, setIsEditingProducto] = useState(false);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [productoId, setProductoId] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showProductColumn, setShowProductColumn] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [reloadProductos, setReloadProductos] = useState(false); // Agregar esta variable de estado
  const tiendaSedId = localStorage.getItem("sed_id");
  console.log(" id de la sede: " + tiendaSedId);
  const loadCategorias = async () => {
    try {
      const res = await getAllCategoriasPorSed(tiendaSedId);
      setCategorias(res.data);
    } catch (error) {
      // Manejar errores
    }
  };
  useEffect(() => {
    loadCategorias(); // Carga las categorías en la carga inicial de la página
  }, []); // Usar un arreglo vacío para que se ejecute solo una vez en la carga inicial
  useEffect(() => {
    if (reloadCategorias) {
      loadCategorias(); // Carga las categorías cuando reloadCategorias cambie
      setReloadCategorias(false);
    }
  }, [reloadCategorias]);
  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setCategoriaId(null); // Esto establecerá categoriaId como nulo, indicando que estás creando una nueva categoría
  };
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };
  const borrarCategoria = async (categoriaId) => {
    const accepted = window.confirm("Estas seguro");
    if (accepted) {
      await deleteCategoria(categoriaId);
      setReloadCategorias(true); // Actualiza la variable para recargar categorías
      setReloadProductos(true);
      setShowProductColumn(false);

    }
  };
  const editarCategoria = (categoriaId) => {
    setIsCategoryModalOpen(true);
    setCategoriaId(categoriaId);
    setIsEditing(true); // Activa la edición
  };
  const categoriaMenuItems = [
    {
      label: "Eliminar categoría",
      icon: <RiDeleteBin5Line className="text-white" />,
      action: borrarCategoria,
    },
    {
      label: "Editar categoría",
      icon: <RiEdit2Line className="text-white" />,
      action: editarCategoria,
    },
  ];
  // Productos
  const openProductModal = () => {
    setIsProductModalOpen(true);
    setProductoId(null);
  };
  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };
  const loadProductos = async (categoriaId) => {
    if (categoriaId) {
      try {
        const res = await getAllProductos(categoriaId);
        setProductosCategoria(res.data);
      } catch (error) {
      }
    } else {
      setProductosCategoria([]);
    }
  };
  const borrarProductos = async (productoId) => {
    const accepted = window.confirm("Estas seguro");
    if (accepted) {
      await deleteProducto(productoId);
      setReloadProductos(true);
    }
  };
  useEffect(() => {
    if (reloadProductos) {
      loadProductos(selectedCategoryId); // Carga los productos cuando reloadProductos cambie
      setReloadProductos(false);
    }
  }, [reloadProductos]);
  const editarProductos = (productoId) => {
    setIsProductModalOpen(true);
    setProductoId(productoId);
    setIsEditingProducto(true);
  };
  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowProductColumn(true);
    await loadProductos(categoryId);
  };
  const productosMenuItems = [
    {
      label: "Eliminar producto",
      icon: <RiDeleteBin5Line className="text-white" />,
      action: borrarProductos,
    },
    {
      label: "Editar producto",
      icon: <RiEdit2Line className="text-white" />,
      action: editarProductos,
    },
  ];
  return (
    <>
      <div className="bg-white">
        <div className="p-1 w-full flex flex-row items-center pt-4 pl-4 pr-4">
          <h1 className="font-medium text-xl mr-4">Menu / Carta</h1>
        </div>
        <div className="p-4 w-full ">
          <div className="border border-gray-300 rounded-md ">
            <div>
              <h1 className="mt-4 ml-4 mb-4 font-medium">Menú Nombre tienda</h1>
            </div>
            <hr className="border-gray-300" />
            <div className="flex ">
              {/* columna1 */}
              <div className="border-r border-gray-300 w-72 flex flex-col">
                <ModalCategoria
                  key={isCategoryModalOpen} // Agrega una clave que cambie cuando se abre el modal
                  isOpen={isCategoryModalOpen}
                  onOpen={openCategoryModal}
                  onClose={() => {
                    closeCategoryModal();
                    setIsEditing(false); // Al cerrar el modal, desactiva la edición
                  }}
                  title={isEditing ? "Editar Categoría" : "Agregar Categoría"} // Cambia el título según si estás editando o creando
                  fieldLabel="Nombre de la categoría"
                  texto={
                    isEditing
                      ? "Aquí puedes editar la categoría existente."
                      : "Aquí puedes agregar categorías para organizar tu menú, como platos principales, entradas y bebidas. Personaliza tu oferta gastronómica y mejora la experiencia de tus clientes."
                  } // Cambia el texto informativo
                  placeholder="Ingrese el nombre de la categoría"
                  buttonText2={isEditing ? "Guardar" : "Agregar Categoría"} // Cambia el texto del botón según si estás editando o creando
                  buttonText="Agregar Categoría"
                  loadCategorias={loadCategorias}
                  categoriaId={categoriaId} // Pasa el categoriaId
                  sedId={tiendaSedId}  // Pasa el valor de sed_id aquí
                />
                {categorias.map((categoria) => (
                  <div key={categoria.cate_id} >
                    <hr className="border-gray-300" />
                    <div className={`pl-4 flex justify-between items-center pb-2 p-2 ${categoria.cate_id === selectedCategoryId ? 'bg-gray-100' : 'bg-white'}`}>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleCategoryClick(categoria.cate_id)}
                        >
                          <RiArrowDropRightLine className="text-2xl cursor-pointer" />
                        </button>
                        <h2 className="text-base font-normal ml-2">
                          {categoria.cate_nom}
                        </h2>
                      </div>
                      <div className=" text-black hover:cursor-pointer rounded-lg text-base pr-4 relative  ">
                        <MenuCartaItems
                          icon={<RiMoreFill className="text-base" />}
                          items={categoriaMenuItems}
                          onItemClick={(action) => action(categoria.cate_id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showProductColumn  && (
                <div className="border-r border-gray-300 w-72">
                  <div className="flex flex-col">
                    <ModalProductos
                      key={isProductModalOpen} // Agrega una clave que cambie cuando se abre el modal
                      isOpen={isProductModalOpen}
                      onOpen={openProductModal}
                      onClose={() => {
                        closeProductModal();
                        setIsEditingProducto(false); // Al cerrar el modal, desactiva la edición
                      }}
                      title={
                        isEditingProducto
                          ? "Editar Producto"
                          : "Agregar Producto"
                      } // Cambia el título según si estás editando o creando
                      TituloFoto="Foto del producto"
                      NombreProducto="Nombre del producto"
                      Descripcion ="Descripción del producto"
                      PrecioProducto ="Precio del producto"
                      texto={
                        isEditingProducto
                          ? "Aquí puedes editar la producto existente."
                          : "Aquí puedes agregar categorías para organizar tu menú, como platos principales, entradas y bebidas. Personaliza tu oferta gastronómica y mejora la experiencia de tus clientes."
                      } // Cambia el texto informativo
                      placeholder="Ingrese el nombre de la Producto"
                      buttonText2={
                        isEditingProducto ? "Guardar" : "Agregar Producto"
                      } // Cambia el texto del botón según si estás editando o creando
                      buttonText="Agregar Producto"
                      selectedCategoryId={selectedCategoryId} // Pasa el ID de la categoría seleccionada
                      loadProductos={loadProductos}
                      productoId={productoId}
                      sedId={tiendaSedId}
                    />
                  </div>
                  {productosCategoria.map((producto) => (
                    <div key={producto.pro_id}>
                      <hr className="border-gray-300" />
                      <div className="pl-4 flex justify-between items-center pb-2 mt-2">
                        <div className="flex items-center">
                          <button>
                            <RiRestaurant2Line className="text-2xl cursor-pointer" />
                          </button>
                          <h2 className="text-base font-normal ml-2">
                            {producto.pro_nombre}
                          </h2>
                        </div>
                        <div className=" text-black hover:cursor-pointer rounded-lg text-base pr-4 relative  ">
                          <MenuCartaItems
                            icon={<RiMoreFill className="text-base" />}
                            items={productosMenuItems}
                            onItemClick={(action) => action(producto.pro_id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Carta;