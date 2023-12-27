import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BsCreditCard } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  createmetodop,
  updateMetodoRolClientes,
  getMetodoUsuarioRolClientes,
} from "../../api/Metodopago";

function Mymetodo(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [seleccion, setSeleccion] = useState(null);
  const [metodos, setmetodos] = useState([]); // Estado para almacenar la lista de usuarios
  const [idmetodo, setIdmetodo] = useState(""); // ID
  const [username, setusername] = useState(""); // ID

  useEffect(() => {
    async function fetchDataM() {
      console.log("ento en fetchDataM");
      const username = localStorage.getItem("username");
      setusername(username);

      console.log("buscar metodos  ", username);
      const metodoRegisrado = await getMetodoUsuarioRolClientes();
      const metodos = metodoRegisrado.data;

      console.log("metodos data -", metodoRegisrado.data);
      console.log("metodos: ", metodos);

      // Guardo el metodo del usuario con el id del usuario (username)
      if (metodos) {
        const metodo = metodos.find((metodo) => metodo.username === username);

        console.log("Metodo dentro activo:", metodo);
        setmetodos(metodo);
      }
    }
    fetchDataM();
    console.log("Metodo fuera activo:", metodos);
  }, []);
  useEffect(() => {
    async function llenarM() {
      console.log("metodo activo value : ", metodos);
      console.log("username esta llegando ? : ", username);
      setValue("username", username);

      if (metodos) {
        console.log("en el llenado - ", metodos);
        setIdmetodo(metodos.met_id);

        setValue("met_titular", metodos.met_titular);
        setValue("met_numero", metodos.met_numero);
        setValue("met_fechaexpira", metodos.met_fechaexpira);
        setValue("met_cvv", metodos.met_cvv);
      }
    }
    llenarM();
  }, [metodos]);
  const handleSeleccion = (index) => {
    setSeleccion(index);

    if (index == 0) {
      setMostrarFormulario(true);
    } else {
      setMostrarFormulario(false);
    }
  };

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const enviarFormBancoUsuario = async (data) => {
    // Edital datos bancarios
    if (metodos) {
      // crear si no hay metodos
      console.log("verificar si esta id metodo :", idmetodo);
      console.log("respuesta from meto ", data);
      const res = await updateMetodoRolClientes(idmetodo, data);
      console.log("respuesta - ", res);
    } else {
      // crear si no hay metodos
      console.log("respuesta from meto else: ", data);
      const res = await createmetodop(data);
      console.log("res", res);
      // aaaaaaaa
      const metodosUsuarioResponse = await getMetodoUsuarioRolClientes(username);
      const metodosUsuario = metodosUsuarioResponse.data;
      if (metodosUsuario.length > 0) {
        setmetodos(metodosUsuario[0]);
      }
  
    }
  };
  return (
    <>
      <div className="inset-0 flex items-center justify-center mt-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md px-4 py-2 bg-gray-100  text-sm font-medium text-black hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Actualizar Tarjeta
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
                    className="text-lg font-bold text-center"
                  >
                    Metodos de pago
                  </Dialog.Title>
                  <div>
                    <div
                      className={`bg-gray-200 h-10 flex items-center space-x-2 mt-2 ${
                        seleccion === 0 ? "bg-green-200" : ""
                      }`}
                      onClick={() => handleSeleccion(0)}
                    >
                      <div className="pl-2">
                        <button
                          type="submit"
                          className=" "
                          checked={seleccion === 0}
                          onChange={() => handleSeleccion(0)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <BsCreditCard className="text-2xl text-green-600" />
                        <p className="font-bold">Agregar tarjeta</p>
                      </div>
                    </div>
                  </div>
                  {mostrarFormulario && (
                    <div className="mt-4">
                      <form onSubmit={handleSubmit(enviarFormBancoUsuario)}>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div>
                              <div>
                                <label className="text-sm mb-2">
                                  Nombre del Titular
                                </label>
                              </div>
                              <input
                                type="text"
                                placeholder="Titular de la tarjeta"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                                onKeyPress={(e) => {
                                  const isValidKey =
                                    /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                                  if (!isValidKey) {
                                    e.preventDefault();
                                  }
                                }}
                                {...register("met_titular")}
                              />
                            </div>
                            <div>
                              <div>
                                <label className="text-sm mb-2">
                                  Numero de Tarjeta
                                </label>
                              </div>
                              <input
                                type="text"
                                placeholder="XXXX - XXXX - XXXX - XXXX"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                                maxLength={16}
                                minLength={16}
                                onKeyPress={(e) => {
                                  const isValidKey = /[0-9]/.test(e.key);
                                  if (!isValidKey) {
                                    e.preventDefault();
                                  }
                                }}
                                {...register("met_numero")}
                              />
                            </div>
                          </div>
                          <div>
                            <div>
                              <div>
                                <label className="text-sm mb-2">
                                  Fecha de expiracion
                                </label>
                              </div>
                              <input
                                type="date"
                                placeholder="MM/AA"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                                {...register("met_fechaexpira")}
                              />
                            </div>
                            <div>
                              <div>
                                <label className="text-sm mb-2">
                                  Numero de CVV
                                </label>
                              </div>

                              <input
                                type="text"
                                placeholder="XXX"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                                maxLength={3}
                                minLength={3}
                                onKeyPress={(e) => {
                                  const isValidKey = /[0-9]/.test(e.key);
                                  if (!isValidKey) {
                                    e.preventDefault();
                                  }
                                }}
                                {...register("met_cvv")}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Guardar
                        </button>
                      </form>
                      <div className="space-x-2 mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Mymetodo;
