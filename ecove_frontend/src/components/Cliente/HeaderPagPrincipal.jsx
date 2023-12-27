import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../api/CerrarSesion";

import {
  RiShoppingCart2Line,
  RiCloseLine,
  RiSearch2Line,
  RiSettings4Line,
  RiLoginBoxLine,
  RiArrowDownSLine,
  RiUser3Line,
} from "react-icons/ri";
import ProductoCarrito from "../Cliente/ProductoCarrito";
import { Link } from "react-router-dom";

const HeaderPagPrincipal = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado
  const [username, setUsername] = useState(""); // Nuevo estado para almacenar el nombre de usuario
  const [nombre, setNombre] = useState(""); // Nuevo estado para almacenar el nombre de usuario
  const [rol, setRol] = useState(""); // Nuevo estado para almacenar el rol del usuario

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedNombre = localStorage.getItem("usu_nombre");
    const storedRol = localStorage.getItem("role");
    console.log("Token:", token);
    console.log("Stored Username:", storedUsername);
    console.log("Stored nombre:", storedNombre);
    console.log(" Rol:", storedRol);
    

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setNombre(storedNombre);
      setRol(storedRol);
      console.log(" Rol2:", storedRol);  // Agrega este log

    }
  }, []);

  const handleCerrarSesion = async () => {
    try {
      // Obtén el token desde localStorage o donde lo tengas almacenado
      const token = localStorage.getItem("token");

      // Realiza la llamada a la función para cerrar sesión
      await cerrarSesion(token);

      // Limpia el token en localStorage u otro lugar donde lo estés guardando
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("usu_nombre");
      localStorage.removeItem("role");
      // Redirige al usuario a la página de inicio de sesión o a donde desees
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Maneja cualquier error que pueda ocurrir durante el cierre de sesión
    }
  };
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-6 lg:h-[10vh] bg-gradient-to-r from-primary to-secundary border-b pb-2">
      {/* div 1 */}
      <div className="pr-2">
        <ul>
          <li>
            <Link to="/" className="text-white uppercase font-bold text-2xl">
              Ecove
            </Link>
          </li>
        </ul>
      </div>
      {/* div 2 */}
      <div className="w-full md:w-auto">
        {/* Barra de búsqueda */}
        <div className="relative">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="bg-white outline-none py-2 pl-8 pr-4 rounded-xl w-full lg:w-[100vh] sm:w-[35vh]"
            placeholder="Buscar"
          />
        </div>
      </div>
      {/* div3 que quiero que este al lado del div 2*/}
      <div className="flex items-center space-x-4 pt-2 z-10">
        <div>
          <div
            className={`fixed bg-white md:w-[40%] xl:w-[20%] h-full 
            ${showMenu ? "right-0" : "-right-[80%]"} 
            top-0 flex-1 flex flex-col 
            items-center gap-3 
            transition-all duration-500 `}
          >
            {/* Contenido del carrito */}
            <div className=" w-full flex bg-primary p-3 ">
              <h1 className="w-3/4 text-sm xl:text-2xl font-semibold text-white">
                Tu carrito
              </h1>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-1/4 ml-16  text-3xl text-white"
              >
                {showMenu ? <RiCloseLine /> : <RiShoppingCart2Line />}
              </button>
            </div>

            {/* Información del producto en el carrito */}
            <div className="h-full overflow-auto">
              <ProductoCarrito
                nombreTiendaCarro="Nombre Tienda Carro"
                imgProductCarrito="https://img.freepik.com/fotos-premium/ensalada-vegana-frijoles-albondigas-aguacate-pepino-tazon-blanco-vista-superior-sobre-fondo-blanco_951562-4571.jpg?"
                nombreProductCarro="Nombre producto carro"
                precioProductCarro="000 000 00"
              />
            </div>

            <div className="">
              <button className="text-white text-sm bg-primary rounded-full p-2 w-2/8 mb-2">
                <p href="#" className="mx-6">
                  Comprar
                </p>
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-1/24 text-right text-white ml-4 text-2xl  hover:text-yellow-400"
          >
            {showMenu ? <RiShoppingCart2Line /> : <RiShoppingCart2Line />}
          </button>
        </div>
        <div>
          {isLoggedIn && rol === "cliente" ? (
            // Si el usuario ha iniciado sesión, muestra el menú de usuario
            <div className="text-white ">
              <div className="text-white ">
                <Menu as="div">
                  <Menu.Button className="flex items-center gap-2 hover:bg-green-500 py-2 px-4 rounded-lg transition-colors  ">
                    <span>{nombre}</span>
                    <RiUser3Line className="w-8 h-8 object-cover rounded-full" />
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
                    <Menu.Items
                      as="section"
                      className="absolute top-4 -right-2 sm-right-10 bg-primary w-60 rounded-lg shadow-lg p-3 "
                    >
                      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-gray-300">
                        <Menu.Item>
                          <Link
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-secundary transition-colors"
                          >
                            <RiUser3Line className="w-8 h-8 object-cover rounded-full" />

                            <div>
                              <h5 className="text-base">{nombre}</h5>
                              <p className="text-white-400 text-xs">
                                {username}
                              </p>
                            </div>
                          </Link>
                        </Menu.Item>
                        <hr className="my-2" />
                        <Menu.Item>
                          <Link
                            to="/PerfilUsuario"
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
              </div>
            </div>
          ) : (
            // Si el usuario no ha iniciado sesión, muestra el enlace de inicio de sesión
            <div>
              <Link
                to="/login"
                className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 items-center"
              >
                Ingreso <RiUser3Line className="text-2xl ml-2" />
              </Link>
            </div>
          )}
        </div>
        {/* Menu usuario se debe hacer la logica para cuando inicie sesion muestre la vista con el menu y datos del usuario */}
      </div>
    </header>
  );
};

export default HeaderPagPrincipal;
