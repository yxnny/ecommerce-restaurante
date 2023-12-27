import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiHeart3Line, RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Formulario from "../../components/Proveedor/Fomulario";
import CardNotificaciones from "../../components/Proveedor/CardNotificaciones";
import PasswordForm from "../../components/Proveedor/PasswordForm";

import { getAllUsuarioRolClientes } from "../../api/UsuariosClientes";
import { updateUsuarioRolClientes } from "../../api/UsuarioClienteUpdate";
import {
  createmetodop,
  updateMetodoRolClientes,
  getMetodoUsuarioRolClientes,
} from "../../api/Metodopago";
import { desactivarCuenta } from "../../api/DesactivarCuentaUsuario";

function Vista_usu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado
  const [username, setusername] = useState(""); // ID ususario
  const [idmetodo, setIdmetodo] = useState(""); // ID

  const [loginAttempted, setLoginAttempted] = useState(false); // Nuevo estado
  const [loginError, setLoginError] = useState("");

  const [usuario, setusuario] = useState([]); // Estado para almacenar la lista de usuario
  const [metodos, setmetodos] = useState([]); // Estado para almacenar la lista de usuarios

  const navigate = useNavigate();

  // traer el usuario activo
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    console.log("Token:", token);
    console.log("Id usuario:", username);

    if (token && username) {
      setIsLoggedIn(true);
      setusername(username);
    }
    async function fetchData() {
      // Consulta ususario
      console.log("username - ", username);
      const usuarioRegistrado = await getAllUsuarioRolClientes(username);

      console.log("Usuario fuera activo:", usuarioRegistrado.data);
      const usuarios = usuarioRegistrado.data;

      const usuario = usuarios.find((usuario) => usuario.username == username);

      if (usuario) {
        setusuario(usuario);
      }
    }
    fetchData();

    console.log("Usuario fuera activo:", usuario);
  }, []);

  useEffect(() => {
    async function fetchDataM() {
      console.log("ento en fetchDataM");
      const username = localStorage.getItem("username");

      console.log("buscar metodos ... user: ", username);
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
  // llanar campos con valores de usuario
  useEffect(() => {
    async function llenarUsu() {
      // console.log('usuario activo value : ', usuario);
      // console.log('metodo registrado : ', MetodousuarioRegistrado);
      if (usuario) {
        console.log("en el if - ", usuario.username);
        setValue("usu_nombre", usuario.usu_nombre);
        setValue("usu_numdoc", usuario.usu_numdoc);
        setValue("usu_ubicacion", usuario.usu_ubicacion);
        setValue("usu_telefono", usuario.usu_telefono);

        setValue("username", usuario.username);
        setValue("usu_fechanacimiento", usuario.usu_fechanacimiento);
      }
    }
    llenarUsu();
  }, [usuario]);
  // llenar campos con valores de banco
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

  const enviarFormDatosUsuario = async (data) => {
    // Editar datos usuario
    if (username) {
      console.log("verificar si esta username :", username);
      console.log("respuesta from", data);
      const res = await updateUsuarioRolClientes(username, data);
      console.log("respuesta - ", res);
      setSuccessMessage("¡Se actualizaron los datos personales correctamente!"); // Establecer el mensaje de éxito
    }
  };

  const enviarFormBancoUsuario = async (data) => {
    // Edital datos bancarios
    if (metodos) {
      // crear si no hay metodos
      console.log("verificar si esta id metodo :", idmetodo);
      console.log("respuesta from meto ", data);
      const res = await updateMetodoRolClientes(idmetodo, data);
      console.log("respuesta - ", res);
      setSuccessMessage("¡Se actualizo los datos bancarios correctamente!"); // Establecer el mensaje de éxito
    } else {
      // crear si no hay metodos
      console.log(data.username);
      console.log("respuesta from meto else: ", data);
      const res = await createmetodop(data);
      console.log("res", res);
      setSuccessMessage("¡Se guardaron los datos correctamente!"); // Establecer el mensaje de éxito
    }
  };

  const handleDesactivarCuenta = async (data) => {
    console.log("Checkbox Checked:", checkboxChecked);
    if (!checkboxChecked) {
      setError("Por favor, marca la casilla para continuar.");
      return; // Agregamos un return para salir de la función si el checkbox no está marcado
    }
    if (username) {
      try {
        // Aquí deberías enviar una solicitud a tu API para desactivar la cuenta
        const response = await desactivarCuenta(username);

        // Limpiar el localStorage en caso de éxito
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("usu_nombre");
        localStorage.removeItem("role");

        // Cerrar sesión (usando el token si es necesario)
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("usu_nombre");
          localStorage.removeItem("role");
          await cerrarSesion(token);
        }

        // Realizar acciones adicionales según la respuesta de la API (si es necesario)
        console.log(response);

        // Puedes redirigir al usuario a la página de inicio de sesión u otra página
        navigate("/login");
      } catch (error) {
        console.error("Error al desactivar la cuenta:", error);
        // Manejar errores aquí (mostrar mensajes al usuario, etc.)
      }
    }
  };

  return (
    <div className=" bg-[#FFFFFF] p-4 ">
      <h1 className="font-bold uppercase text-2xl  text-center">
        La información de tu cuenta en los servicios de Ecove
      </h1>
      <p className="mt-2 text-justify ">
        Entendemos que en ocasiones surgen cambios necesarios en tu cuenta, y
        estamos aquí para ayudarles a realizarlos de manera eficiente. Si desea
        efectuar modificaciones en cualquier campo, como el nombre dela tienda,
        es importante cumplir con los requisitos legales correspondientes.
      </p>
      <hr className="my-2 border-gray-200" />
      <div>
        <form className="mb-8" onSubmit={handleSubmit(enviarFormDatosUsuario)}>
          <h1 className="mb-4 text-center font-medium text-base text-black">
            DATOS BASICOS USUARIO
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <div className="relative mb-4 ">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Nombre Usuario <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Nombre tienda"
                  onKeyPress={(e) => {
                    // Verificar si la tecla presionada es una letra (A-Z o a-z),
                    // espacio o una letra con tilde (á, é, í, ó, ú, etc.)
                    const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);

                    // Si no es una letra, espacio o letra con tilde, prevenimos la entrada
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                  {...register("usu_nombre")}
                />
              </div>
              <div className="relative mb-4 ">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Documento <span className="text-red-600">*</span>
                </h1>
                <input
                  type="number"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Numero de Documento"
                  {...register("usu_numdoc")}
                />
              </div>
              <div className="relative mb-4">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  email <span className="text-red-600">*</span>
                </h1>
                <input
                  type="email"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Correo electronico"
                  {...register("username")}
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Direccion <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Direccion"
                  {...register("usu_ubicacion")}
                />
              </div>
              <div className="relative mb-2">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Numero de Celular <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Numero de Telefono"
                  maxLength={10}
                  {...register("usu_telefono")}
                />
              </div>
              <div className="relative mb-2">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Fecha de Nacimiento <span className="text-red-600">*</span>
                </h1>
                <input
                  type="date"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Fecha de Nacimiento"
                  {...register("usu_fechanacimiento")}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-600 text-white  hover:bg-green-500 uppercase text-sm  py-3 px-4 rounded-lg mt-8"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}
      <div>
        <form className="mb-8" onSubmit={handleSubmit(enviarFormBancoUsuario)}>
          <h1 className="mb-4 text-center font-medium text-base text-black">
            Informacion Bancaria
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <div className="relative ">
                <input
                  type="hidden"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="correo"
                  required
                  {...register("username")}
                />
              </div>
              <div className="relative mb-2 ">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Nombre del Titular <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Titular de la tarjeta"
                  required
                  onKeyPress={(e) => {
                    // Verificar si la tecla presionada es una letra (A-Z o a-z),
                    // espacio o una letra con tilde (á, é, í, ó, ú, etc.)
                    const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);

                    // Si no es una letra, espacio o letra con tilde, prevenimos la entrada
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                  {...register("met_titular")}
                />
              </div>
              <div className="relative mb-2 ">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Numero de Tarjeta <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="XXXX - XXXX - XXXX - XXXX"
                  required
                  maxLength={16}
                  minLength={16}
                  {...register("met_numero")}
                />
              </div>
            </div>
            <div>
              <div className="relative mb-2">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Fecha de Expiracion <span className="text-red-600">*</span>
                </h1>
                <input
                  type="date"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="MM/AA"
                  maxLength={3}
                  minLength={3}
                  required
                  {...register("met_fechaexpira")}
                />
              </div>
              <div className="relative mb-2">
                <h1 className="pl-3 mb-2 font-light text-base text-gray-700">
                  Numero de CVV <span className="text-red-600">*</span>
                </h1>
                <input
                  type="text"
                  className="py-2 pl-4 bg-gray-100 w-full outline-none rounded-lg"
                  maxLength={3}
                  placeholder="XXX"
                  required
                  {...register("met_cvv")}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-600 text-white  hover:bg-green-500 uppercase text-sm  py-3 px-4 rounded-lg mt-8"
              // onClick={() => handleSubmit(enviarFormBancoUsuario)}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      <hr className="my-2 border-gray-200" />

      {/* AQUI PA DESACTIVAR CUENTA Y BORRARLA */}
      <div className="p-8 rounded-xl mb-8 ">
        <div className="flex items-center  mb-8">
          <div className="flex-1 flex flex-col items-center justify-center ">
            <p className="uppercase font-bold">Eliminar Cuenta</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 bg-green-600/10 p-4 rounded-lg border border-dashed border-green-600 mb-8">
          <div className="flex justify-center">
            <RiErrorWarningLine className="text-5xl text-green-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-black text-xl mb-2">
              Estás desactivando tu cuenta
            </h5>
            <p className="text-gray-500 text-justify">
              Ten en cuenta que despues de 30 dias su cuenta sera eliminada de
              manera permanente.{" "}
              <Link to="/leermas" className="text-blue-500">
                Leer más
              </Link>
            </p>
          </div>
        </div>
        <div className="">
          <input
            type="checkbox"
            className="accent-primary"
            id="idInactive"
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
          />{" "}
          <label htmlFor="idInactive" className="text-gray-500">
            Confirmo la desactivación de mi cuenta
          </label>
          <div className="flex justify-end">
            <button
              onClick={handleDesactivarCuenta}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Desactivar cuenta
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
    </div>
  );
}
export default Vista_usu;
