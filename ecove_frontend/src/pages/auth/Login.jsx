import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { getAllUsuarioRolClientes } from "../../api/UsuariosRolClientes";
// import { getAllUsuarioTodos } from "../../api/UsuariosTodos";
import { getAllUsuarioRolTienda } from "../../api/UsuariosRolTienda";
import { validateUsuario } from "../../api/Validacion";
import HeaderForms from "../../components/Cliente/HeaderForms";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";

const Login = () => {
  // Login para la parte de usuarios rol cliente
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
  const [loginErrorTienda, setLoginErrorTienda] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedTab === 0) {
          response = await getAllUsuarioRolClientes();
        } else if (selectedTab === 1) {
          response = await getAllUsuarioRolTienda();
        }

        setUsuarios(response.data);
      } catch (error) {
        if (selectedTab === 0) {
          console.error("Error al cargar usuarios:", error);
        } else if (selectedTab === 1) {
          console.error("Error al cargar usuarios Tienda:", error);
        }
      }
    };
    fetchData();
  }, [selectedTab]); 
  const handleClienteLogin = async (data) => {
    const username = data.username;
    const usuarioRegistrado = usuarios.find(
      (usuario) => usuario.username === username
    );
    setLoginAttempted(true);
    if (!usuarioRegistrado) {
      setLoginError("Usuario no se encuentra registrado");
      return;
    }
    try {
      const response = await validateUsuario(data);
      if (response.data.token) {
        if (response.data.role === "cliente") {
          localStorage.setItem("token", response.data.token);
          console.log("Respuesta del servidor1:", response.data);

          if (response.data.user) {
            localStorage.setItem("username", response.data.user.username);
            // Asegúrate de que la propiedad 'role' esté presente en la respuesta del servidor
            if (response.data.role) {
              localStorage.setItem("role", response.data.role);
              console.log("Rol del usuario almacenado:", response.data.role);
            } else {
              console.error(
                "Error: Rol del usuario no encontrado en la respuesta del servidor"
              );
            }
            if (response.data.usu_nombre) {
              localStorage.setItem("usu_nombre", response.data.usu_nombre);
              console.log(
                "usu_nombre del usuario almacenado:",
                response.data.usu_nombre
              );
            } else {
              console.error(
                "Error: usu_nombre del usuario no encontrado en la respuesta del servidor"
              );
            }
          }
        }
        // Agrega estos registros de consola
        console.log(
          "Datos del usuario almacenados en localStorage:",
          response.data.user
        );
        console.log("Respuesta del servidor2:", response.data);
        navigate("/resultado");
      } else {
        setLoginError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al validar usuario:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setLoginError(error.response.data.non_field_errors[0]);
      } else {
        setLoginError("Error al validar usuario");
      }
    }
  };
  // Login usuario rol Tienda
  const handleTiendaLogin = async (data) => {
    const username = data.username;
    const usuarioTiendaRegistrado = usuarios.find(
      (usuario) => usuario.username === username
    );
    setLoginAttempted(true);
    if (!usuarioTiendaRegistrado) {
      setLoginErrorTienda("Usuario Tienda no se encuentra registrado");
      return;
    }
    try {
      const response = await validateUsuario(data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Respuesta del servidor1:", response.data);

        if (response.data.role === "tienda") {
          if (response.data.user) {
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("usu_nombre", response.data.usu_nombre);

            // Verifica si hay información de la tienda
            if (
              response.data.tienda_info &&
              response.data.tienda_info.sed_ubicacion &&
              response.data.tienda_info.sed_id
            ) {
              // Almacena el sed_id de la tienda en el estado o contexto de la aplicación
              localStorage.setItem("sed_id", response.data.tienda_info.sed_id);
              localStorage.setItem("sed_logo", response.data.tienda_info.sed_logo);
              console.log("Logo almacenado en localStorage:", response.data.tienda_info.sed_logo);
              console.log("sed_id almacenado:", response.data.tienda_info.sed_id);
              navigate("/Resumen");
            } else {
              console.log("Redireccionando a /ConfigTienda");
              navigate("/ConfigTienda");
            }
          }
        }
        // navigate("/Resumen");
      } else {
        setLoginErrorTienda("Credenciales incorrectas TIenda");
      }
    } catch (error) {
      console.error("Contraseña o Usuari:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setLoginErrorTienda(error.response.data.non_field_errors[0]);
      } else {
        setLoginErrorTienda("Error al validar usuario Tienda");
      }
    }
  };
  const onSubmit = (data) => {
    if (selectedTab === 0) {
      handleClienteLogin(data);
    } else if (selectedTab === 1) {
      handleTiendaLogin(data);
    }
  };
  return (
    <div className=" min-h-screen bg-[#d1fae5]">
      <HeaderForms />
      <div className=" flex items-center justify-center ">
        <div>
          <Tab.Group>
            <div className=" flex items-center justify-center">
              <div>
                <Tab.List className={"w-64  mt-6 mb-6  "}>
                  <Tab.List className="flex rounded-xl">
                    <Tab
                      className={`group  bg-gray-200 w-full rounded-l-lg py-2.5 text-sm font-medium transition-colors focus:outline-none ${
                        selectedTab === 0
                          ? "bg-green-700 text-white"
                          : "text-black text-sm font-medium hover:text-green-800"
                      }`}
                      onClick={() => setSelectedTab(0)}
                    >
                      Cliente
                    </Tab>
                    <Tab
                      className={`group  bg-gray-200 w-full rounded-r-lg py-2.5 text-sm font-medium transition-colors focus:outline-none ${
                        selectedTab === 1
                          ? "bg-green-700 text-white"
                          : "text-black text-sm font-medium hover:text-green-800"
                      }`}
                      onClick={() => setSelectedTab(1)}
                    >
                      Tienda
                    </Tab>
                  </Tab.List>
                </Tab.List>
              </div>
            </div>

            <Tab.Panels className={"ml-6 mr-6"}>
              {/* Cotenido del tab 1 */}
              <Tab.Panel>
                <div className="bg-white p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
                  <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8">
                    Iniciar <span className="text-secundary">sesión</span>
                  </h1>
                  <form
                    className="mb-8"
                    onSubmit={handleSubmit(handleClienteLogin)}
                  >
                    <div className="relative mb-4">
                      <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="email"
                        className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                        placeholder="Correo electrónico"
                        {...register("username")}
                      />
                      {loginError && (
                        <span className="text-red-500">{loginErrorTienda}</span>
                      )}
                    </div>
                    <div className="relative mb-2">
                      <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type={showPassword ? "text" : "password"}
                        className="py-3 px-8 bg-gray-100 w-full outline-none rounded-lg"
                        placeholder="Contraseña"
                        {...register("password")}
                      />

                      {showPassword ? (
                        <RiEyeOffLine
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                        />
                      ) : (
                        <RiEyeLine
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                        />
                      )}
                    </div>
                    {loginError && (
                      <span className="text-red-500">{loginError}</span>
                    )}
                    <div>
                      <button
                        type="submit"
                        className="bg-green-600 text-white  hover:bg-green-700 uppercase font-bold text-sm w-full py-3 px-4 rounded-lg mt-8"
                      >
                        Ingresar
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-col items-center gap-4">
                    <span className="flex items-center gap-2">
                      ¿No tienes cuenta?{" "}
                      <Link
                        to="/RegistroUsuario"
                        className="text-primary hover:text-[#fde047] transition-colors"
                      >
                        Registrate
                      </Link>
                    </span>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
            {/* form del login para el usuario tienda*/}
            <Tab.Panel>
              <div className="bg-white p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
                <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8">
                  Iniciar sesión{" "}
                  <span className="text-secundary"> Proveedor</span>
                </h1>
                <form
                  className="mb-8"
                  onSubmit={handleSubmit(handleTiendaLogin)}
                >
                  <div className="relative mb-4">
                    <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                      type="email"
                      className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                      placeholder="Correo electrónico responsable"
                      {...register("username")}
                    />
                  </div>
                  <div className="relative mb-2">
                    <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="py-3 px-8 bg-gray-100 w-full outline-none rounded-lg"
                      placeholder="Contraseña"
                      {...register("password")}
                    />

                    {showPassword ? (
                      <RiEyeOffLine
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                      />
                    )}
                  </div>
                  {loginErrorTienda && (
                    <span className="text-red-500">{loginErrorTienda}</span>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="bg-green-600 text-white  hover:bg-green-700 uppercase font-bold text-sm w-full py-3 px-4 rounded-lg mt-4"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
                <div className="flex flex-col items-center gap-4">
                  <span className="flex items-center gap-2">
                    ¿Tu tienda no tienes cuenta?{" "}
                    <Link
                      to="/RegistroEmpresa"
                      className="text-primary hover:text-[#fde047] transition-colors"
                    >
                      Registrate tu tienda
                    </Link>
                  </span>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Login;
