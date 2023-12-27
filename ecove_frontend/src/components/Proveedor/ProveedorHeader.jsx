import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { cerrarSesion } from "../../api/CerrarSesion";
import {
  RiSettings4Line,
  RiLoginBoxLine,
  RiNotification3Line,
  RiArrowDownSLine,
  RiUser3Line,
  RiFileList3Line,
} from "react-icons/ri";

const ProveedorHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState("");

  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedNombre = localStorage.getItem("usu_nombre");
    const storedRol = localStorage.getItem("role");
    const logoTienda = localStorage.getItem("sed_logo");

    console.log("Token Tienda:", token);
    console.log("Stored Username Tienda:", storedUsername);
    console.log("Stored nombre Tienda:", storedNombre);
    console.log("Stored Rol Usuario Tienda:", storedRol);
    console.log("El logo de la tienda es", logoTienda);

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setNombre(storedNombre);
      setRol(storedRol);
      setLogo(logoTienda);
    }
    // Escuchar el evento de actualización del usuario
    const handleUsuarioActualizado = () => {
      const nuevoLogo = localStorage.getItem("sed_logo");
      console.log("Nuevo valor del logo:", nuevoLogo);
      setLogo(localStorage.getItem("sed_logo"));
    };

    window.addEventListener("usuarioActualizado", handleUsuarioActualizado);

    const handleLogoActualizado = () => {
      console.log("Evento logoActualizado manejado");
      setLogo(localStorage.getItem("sed_logo"));
    };
    window.addEventListener("logoActualizado", handleLogoActualizado);

    return () => {
      // Limpiar el event listener al desmontar el componente
      window.removeEventListener(
        "usuarioActualizado",
        handleUsuarioActualizado
      );
      window.removeEventListener(
        "logoActualizado", 
        handleLogoActualizado
      );

    };
  }, []);

  const handleCerrarSesion = async () => {
    try {
      const token = localStorage.getItem("token");

      await cerrarSesion(token);

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("usu_nombre");
      localStorage.removeItem("role");
      localStorage.removeItem("sed_id");
      localStorage.removeItem("sed_logo");

      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="h-[10vh] lg:h-[10vh] text-white  py-4 flex items-center justify-between z-40 bg-gradient-to-r from-primary to-secundary bg-repeat-no">
      <div>
        <h4 className="text-white uppercase font-bold text-2xl px-10 ">
          Ecove
        </h4>
      </div>

      <nav className="flex items-center gap-2">
       

        {/* MENU USUARIOOOOOOO */}

        {isLoggedIn && rol === "tienda" && (
          // Si el usuario ha iniciado sesión, muestra el menú de usuario
          <Menu as="div">
            <Menu.Button className="flex items-center gap-2 hover:bg-green-500 py-2 px-2 rounded-lg transition-colors relative">
              <span>{nombre}</span>
              <img src={logo} className="w-8 h-8 object-cover rounded-full" />
              <RiArrowDownSLine />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* Items que lleva tendro el despegable */}

              <Menu.Items
                as="section"
                className="absolute top-6 right-5 bg-primary w-64 rounded-lg shadow-lg p-3"
              >
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-gray-300">
                  <Menu.Item>
                    <Link
                      to="/PerfilEmpresa"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-secundary transition-colors"
                    >
                      <img
                        src={logo}
                        className="w-8 h-8 object-cover rounded-full"
                      />

                      <div>
                        <h5 className="text-base">{nombre}</h5>
                        <p className="text-white-400 text-xs">{username}</p>
                      </div>
                    </Link>
                  </Menu.Item>
                  <hr className="my-2" />
                  <Menu.Item>
                    <Link
                      to="/PerfilEmpresa"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-secundary transition-colors text-base"
                    >
                      <RiUser3Line /> Perfil
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/ConfigEmpresa"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-secundary transition-colors text-base"
                    >
                      <RiSettings4Line /> Configuración
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      onClick={handleCerrarSesion}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-secundary transition-colors text-base"
                    >
                      <RiLoginBoxLine /> Cerrar Sesión
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </nav>
    </header>
  );
};

export default ProveedorHeader;
