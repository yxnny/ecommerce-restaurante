import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAllUsuarioRolClientes } from "../../api/UsuariosClientes";
import { updateUsuarioRolClientes } from "../../api/UsuarioClienteUpdate";

function MyModal(props) {
  const { usernameClin, actualizarDatosUsuario } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [usuario, setUsuario] = useState({});

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  // Para editar
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Enviando solicitud de actualización...");

      // Añadir el username al objeto de datos
      const updateData = {
        ...data, // Los datos del formulario
        username: usernameClin,
      };
      const res = await updateUsuarioRolClientes(usernameClin, updateData);
      console.log("Respuesta de la actualización:", res);

      console.log("Solicitud de actualización enviada correctamente");
      // Puedes cerrar el modal o realizar otras acciones después de la actualización
      closeModal();
      actualizarDatosUsuario();
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
      }
    }
  });
  return (
    <>
      <div className="inset-0 flex items-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md px-4 py-2 bg-gray-100  text-sm font-medium text-black hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Cambiar dirección
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-[80%] transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl xl:text-lg font-bold text-center "
                  >
                    Cambiar direccion de envio
                  </Dialog.Title>
                  <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                      <div className="flex flex-col mb-4">
                        <label className="text-sm mb-2">
                          Número de Celular{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                          placeholder="Celular"
                          maxLength="10"
                          minLength="10"
                          onKeyPress={(e) => {
                            const isValidKey = /[0-9]/.test(e.key);
                            if (!isValidKey) {
                              e.preventDefault();
                            }
                          }}
                          {...register("usu_telefono")}
                        />
                      </div>
                      <div className="flex flex-col mb-4">
                        <label className="text-sm mb-2">
                          Dirección / Residencia{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="direcciontienda"
                          className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                          placeholder="Dirección"
                          {...register("usu_ubicacion")}
                        />
                      </div>
                    </div>

                    <div className="space-x-2 mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
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
