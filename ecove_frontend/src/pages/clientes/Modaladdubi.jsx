import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RiMapPinLine } from "react-icons/ri";

function Modaladdubi() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex rounded-md px-4 py-2 text-sm font-medium text-white hover: focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <RiMapPinLine className="mt-1 text-white " />
          <h1>Ibague </h1>
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

          <div className="fixed inset-0 xl:mx-96 p-24 overflow-y-auto">
            <div className="flex min-h-full h-full w-full justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className=" grid text-center justify-center p-4">
                    <div className="w-full p-3 h-[100%] flex items-center justify-center  ">
                      <img
                        className="h-[100%] "
                        src="https://img.freepik.com/vector-premium/mapa-ubicacion-plegado-marcador-mapa-ciudad-puntero_349999-746.jpg?"
                        alt=""
                      />
                    </div>
                    <div className=" w-full text-center font-semibold sm:text-sm md:text-lg xl:text3xl">
                      <h1>Ingresa tu dirrecion </h1>
                    </div>
                    <div className=" w-full text-center font-semibold sm:text-sm md:text-lg xl:text3xl mt-5">
                      <form action="">
                        <input
                          type="text"
                          className="w-4/5 bg-gray-100 text-sm rounded text-center p-1"
                          placeholder="Ingresa tu direccion "
                        />
                      </form>
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

export default Modaladdubi;
