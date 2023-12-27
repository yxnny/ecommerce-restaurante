import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiAddCircleFill,
  RiCloseFill,
  RiAddFill,
  RiSubtractFill,
} from "react-icons/ri";

function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [contador, setContador] = useState(0);

  const aumentarContador = () => {
    setContador(contador + 1);
  };

  const disminuirContador = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <button type="button" onClick={openModal}>
          {/* Productos de una misma tienda */}

          <div className="flex mb-2 rounded-md  w-80 border-l-4 border-black  ">
            <div className="flex gap-1 p-2 ">
              <div className="rounded ">
                <img
                  className="w-32 h-24 object-cover"
                  src={`${props.imgProduct}`}
                  alt=""
                />
              </div>

              <div className="w-44 text-left space-y-4">
                {/* nombre producto */}
                <div className=" p-1 ">
                  <h2 className="text-sm font-serif">{props.nombreProduct}</h2>
                  <p className="text-xs font-thin">{props.tipoProducto}</p>
                </div>
                {/* precio producto */}
                <div className="flex items-center">
                  <div className="w-32 p-1 ">
                    <h2 className="font-semibold md:text-sm">
                      ${props.precioProduct}
                    </h2>
                  </div>
                  <div className=" ">
                    <RiAddCircleFill className="text-primary text-4xl hover:text-green-700 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  {/* titulo */}
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="p-2 flex justify-between items-center border-b mb-4">
                      <div className="lg:text-2xl sm:text-sm md:text-sm">
                        <h1>Nombre de la tienda </h1>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="flex space-x-2">
                          <div>
                            <img
                              className="rounded-full h-12 w-12 object-cover"
                              src="https://th.bing.com/th/id/R.f88898c72840d3b1eaa616630c0ce25b?rik=KrcRsuAVPxg%2bng&pid=ImgRaw&r=0"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              className="rounded-full h-12 w-12 object-cover"
                              src="https://img.freepik.com/vector-gratis/circulo-vegano-verde_78370-2153.jpg?"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              className="rounded-full h-12 w-12 object-cover"
                              src="https://img.freepik.com/vector-gratis/etiqueta-compostable-dibujada-mano_23-2149433635.jpg?"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="rounded-md text-5xl font-medium text-primary"
                            onClick={closeModal}
                          >
                            <RiCloseFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Title>
                  {/* contenido */}
                  {/* contenedor imagen */}
                  <div className="flex p-4 flex-col sm:flex-row">
                    {/* informacion del producto seleccionado para ir al carrito */}

                    <div className="">
                      {/* imagen producto en modal para agregar a carrito */}
                      <img
                        className="w-64 h-48 object-cover rounded-lg"
                        src={`${props.imgProduct}`}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 rounded-lg pl-4 text-justify">
                      <div className="">
                        <h2 className="text-lg font-medium text-black">
                          {/* nombre producto en modal para agregar a carrito  */}
                          {props.nombreProduct}
                        </h2>
                        <p className="text-sm font-semibold text-gray-600 ">
                          {/* precio producto en modal para agregar a carrito  */}
                          Tipo de producto: <span className="text-primary">{props.tipoProducto}</span>
                        </p>
                      </div>
                      <div className="mt-4">
                        <h1 className="text-sm font-medium text-gray-500">
                          Descripción del Producto
                        </h1>
                        <p className="text-base font-thin text-gray-600">
                          {/* nombre producto en modal para agregar a carrito  */}
                          {props.descripcion}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xl font-semibold ">
                          {/* precio producto en modal para agregar a carrito  */}
                          $ {props.precioProduct}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* contenedor contador y botones */}
                  <div className="p-4 flex justify-center md:space-x-4 lg:space-x-10 flex-col sm:flex-row ">
                    {/* div contador */}
                    <div className="flex items-center space-x-16 border rounded-md p-2 justify-center mt-2">
                      <button
                        className="text-black   rounded-full hover:bg-gray-200"
                        onClick={disminuirContador}
                      >
                        <RiSubtractFill className="text-xl" />
                      </button>
                      <p>{contador}</p>
                      <button
                        className="text-black  rounded-full hover:bg-gray-200"
                        onClick={aumentarContador}
                      >
                        <RiAddFill className="text-xl" />
                      </button>
                    </div>
                    {/* div botones */}
                    <div className="flex rounded-md justify-center space-x-2 mt-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 items-center"
                      >
                        Agregar al carrito
                      </button>

                      <Link
                        to="/cuerpo"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 items-center"
                      >
                        Agregar e ir a pagar
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MyModal;
