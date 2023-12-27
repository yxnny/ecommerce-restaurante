import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUsuario } from "../../api/UpdateUsuarioTienda.js";
import { desactivarCuenta } from "../../api/DesactivarCuentaUsuario.js";
import { cerrarSesion } from "../../api/CerrarSesion.js";
const ConfigProveedor = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [error, setError] = useState("");
  const storedNombre = localStorage.getItem("usu_nombre");
  const storedUsername = localStorage.getItem("username"); // Me tare el nombre de el usuario "username"
  const [nombre, setNombre] = useState(storedNombre);
  const [username, setUsername] = useState(storedUsername);
  const navigate = useNavigate();
  console.log("Stored nombre usuario tienda:", storedUsername);
  console.log(" nombre tienda: " + storedNombre);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const storedNombre = localStorage.getItem("usu_nombre");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setValue("username", storedUsername);
      setValue("usu_nombre", storedNombre);
      setNombre(storedNombre);
      setUsername(storedUsername);
    }
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("monda");
    if (storedUsername) {
      const response = await updateUsuario(storedUsername, data);
      localStorage.setItem("username", data.username);
      localStorage.setItem("usu_nombre", data.usu_nombre);
      setNombre(data.usu_nombre);
      setUsername(data.username);
      window.dispatchEvent(new Event("usuarioActualizado"));
    }
  });
  useEffect(() => {
    const storedNombre = localStorage.getItem("usu_nombre");
    const storedUsername = localStorage.getItem("username");
    console.log("Stored nombre usuario tienda:", storedNombre);
    console.log("Stored username usuario tienda:", storedUsername);

    if (storedUsername) {
      // No uses storedUsername para establecer el valor del formulario
      setValue("username", storedUsername);
      setValue("usu_nombre", storedNombre);
    }
  }, [setValue, storedUsername]);

  const handleDesactivarCuenta = async () => {
    console.log("Checkbox Checked:", checkboxChecked);
    if (!checkboxChecked) {
      setError("Por favor, marca la casilla para continuar.");
      return; // Agregamos un return para salir de la función si el checkbox no está marcado
    }
    if (storedUsername) {
      try {
        const response = await desactivarCuenta(storedUsername);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("usu_nombre");
        localStorage.removeItem("role");
        localStorage.removeItem("sed_id");
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("usu_nombre");
          localStorage.removeItem("role");
          localStorage.removeItem("sed_id");
          await cerrarSesion(token);
        }
        console.log(response);
        navigate("/login");
      } catch (error) {
        console.error("Error al desactivar la cuenta:", error);
      }
    }
  };
  return (
    <>
      <div className="bg-[#FFFFFF] p-4 ">
        <h1 className="font-bold uppercase text-2xl">Configuración</h1>
        <p className="mt-2 text-justify">
          Entendemos que en ocasiones puedan surgir necesidades relacionadas con
          la gestión de su cuenta. Queremos asegurarnos de que tenga un control
          total sobre su experiencia con nosotros.
        </p>
        <hr className="my-2 border-gray-200" />
        <form onSubmit={onSubmit}>
          <p className="uppercase font-bold text-center">Cambiar datos</p>

          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">
              Nombre Tienda <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
              placeholder="Nombre Tienda"
              onKeyPress={(e) => {
                const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              {...register("usu_nombre")}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">
              Correo <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
              placeholder="Correo Eletronico"
              {...register("username")}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary/80 text-white py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
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
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              className="accent-primary"
              id="idInactive"
              checked={checkboxChecked}
              onChange={() => setCheckboxChecked(!checkboxChecked)}
            />

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
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        </div>
      </div>
    </>
  );
};
export default ConfigProveedor;
