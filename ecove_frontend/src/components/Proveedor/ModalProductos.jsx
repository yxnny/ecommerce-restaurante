import { Dialog, Transition } from "@headlessui/react";
import { RiErrorWarningLine, RiAddFill, RiCameraLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  createProducto,
  updateProducto,
  getProducto,
} from "../../api/CrearProducto";
import { getAllProductos } from "../../api/Productos";
const ModalProductos = (props) => {
  const {
    isOpen,
    onOpen,
    onClose,
    title,
    TituloFoto,
    NombreProducto,
    Descripcion,
    PrecioProducto,
    buttonText,
    texto,
    productoId,
    buttonText2,
    selectedCategoryId,
    loadProductos,
    sedId,
  } = props;
  const [productos, setProductos] = useState([]);
  const [productoImagen, setProductoImagen] = useState("");
  const [productoPreview, setProductoPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();
  const watchProducto = watch("pro_foto");
  useEffect(() => {
    if (watchProducto && watchProducto.length > 0) {
      setProductoPreview(URL.createObjectURL(watchProducto[0]));
    }
  }, [watchProducto]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllProductos(selectedCategoryId);
      setProductos(response.data);
    }
    fetchData();
  }, [selectedCategoryId]);
  const [nombreCambiado, setNombreCambiado] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (
      nombreCambiado &&
      productos.some((producto) => producto.pro_nombre === data.pro_nombre)
    ) {
      alert("El producto ya existe en esta categoría. Introduce un producto único.");
      return;
    }

    const formData = new FormData();
    formData.append("pro_nombre", data.pro_nombre);
    formData.append("pro_especificacion", data.pro_especificacion);
    formData.append("pro_precio", data.pro_precio);
    formData.append("pro_tipo", data.pro_tipo);
    formData.append("sed_id", sedId);

    if (selectedCategoryId) {
      formData.append("cate_id", selectedCategoryId);
    }
    // Verificar si se ha seleccionado una nueva imagen
    if (data.pro_foto[0]) {
      formData.append("pro_foto", data.pro_foto[0]);
    }

    if (productoId) {
      await updateProducto(productoId, formData, selectedCategoryId);
    } else {
      await createProducto(formData, selectedCategoryId);
      reset();
    }
    loadProductos(selectedCategoryId);
    onClose();
  });
  useEffect(() => {
    // Determinar si el nombre ha cambiado durante la edición
    if (productos.length > 0 && productoId) {
      const productoActual = productos.find((p) => p._id === productoId);
      if (productoActual && productoActual.pro_nombre !== watch("pro_nombre")) {
        setNombreCambiado(true);
      }
    }
  }, [productos, watch("pro_nombre"), productoId]);
  useEffect(() => {
    async function loadProducto() {
      if (productoId) {
        const res = await getProducto(productoId);
        setValue("pro_nombre", res.data.pro_nombre);
        setValue("pro_especificacion", res.data.pro_especificacion);
        setValue("pro_precio", res.data.pro_precio);
        setValue("pro_tipo", res.data.pro_tipo);

        if (res.data.pro_foto) {
          setProductoImagen(res.data.pro_foto);
        }
      }
    }
    loadProducto();
  }, [productoId, setValue]);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="rounded-md px-4 py-2 text-sm font-medium text-black hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {buttonText}
      </button>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <form onSubmit={onSubmit} encType="multipart/form-data">
                  <div className="mt-2 flex items-center">
                    <div className="flex justify-center pr-2">
                      <RiErrorWarningLine className="text-2xl text-green-600" />
                    </div>
                    <p className="text-sm text-gray-500 text-justify">
                      {texto}
                    </p>
                  </div>
                  <div className="mt-2 ">
                    <label className="text-sm font-medium">{TituloFoto}</label>
                    <div className="relative ">
                      {productoPreview || productoImagen ? (
                        <img
                          src={productoPreview || productoImagen}
                          alt="Producto"
                          className="w-28 h-28 object-cover rounded-lg mt-4 border border-dashed border-green-600"
                        />
                      ) : (
                        <div
                          className={`w-28 h-28 flex items-center justify-center bg-gray-200 rounded-lg mt-4 border border-dashed ${
                            productoPreview
                              ? "border-green-600"
                              : "border-red-500"
                          }`}
                        >
                          <RiCameraLine className={"text-red-500"} />
                        </div>
                      )}
                      <label
                        htmlFor="fotoProducto"
                        className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-[85px]"
                      >
                        <RiAddFill
                          className={
                            productoPreview
                              ? "text-xl  bg-green-400 rounded-lg text-white "
                              : "text-xl text-red-400 "
                          }
                        />
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/jfif"
                        id="fotoProducto"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log("Producto file selected:", file);

                          if (file) {
                            setProductoPreview(URL.createObjectURL(file));
                            setValue("pro_foto", file); // Set the value for sed_logo using setValue
                          }
                        }}
                        {...register("pro_foto", {
                          required: !productoId, // Campo requerido al agregar, no requerido al editar
                        })}
                      />
                      {errors.pro_foto && (
                        <span className="font-thin text-sm text-[#Ff0000]">
                          Este campo es requerido
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-2">
                      <label className="text-sm font-medium mt-2">
                        {NombreProducto}
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre del producto"
                        className="w-full mt-2  p-2 px-2 outline-none rounded-lg bg-gray-100 appearance-none"
                        {...register("pro_nombre", { required: true })}
                      />
                      {errors.pro_nombre && (
                        <span>Este campo es requerido</span>
                      )}
                      <label className="text-sm font-medium mt-2">
                        {Descripcion}
                      </label>
                      <textarea
                        placeholder="Por ejemplo: Plato con cebolla, arroz, frijol y maíz"
                        className="w-full mt-2 p-2 px-2 outline-none rounded-lg bg-gray-100 appearance-none"
                        {...register("pro_especificacion", { required: true })}
                      />
                      {errors.pro_especificacion && (
                        <span>Este campo es requerido</span>
                      )}
                      <label className="text-sm font-medium mt-2">
                        {PrecioProducto}
                      </label>
                      <input
                        type="number"
                        placeholder="Precio producto"
                        className="w-full mt-2 p-2 px-2 outline-none rounded-lg bg-gray-100 appearance-none"
                        {...register("pro_precio", { required: true })}
                      />
                      {errors.pro_precio && (
                        <span>Este campo es requerido</span>
                      )}

                      <div className="text-sm font-medium">Tipo Producto</div>
                      <select
                        name="selectedProductType"
                        className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                        {...register("pro_tipo", { required: true })}
                      >
                        <option value="">Seleccione el tipo</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="vegano y vegetariano">Vegano y Vegetariano</option>
                      </select>
                      {errors.pro_tipo && <span>Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="mt-4 space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        onClose(); // Cierra el modal
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {buttonText2}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalProductos;
