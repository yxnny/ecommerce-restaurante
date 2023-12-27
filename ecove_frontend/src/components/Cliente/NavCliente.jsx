// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// iconos
import {
  RiMenuUnfoldLine,
  RiCloseLine,
  RiRestaurant2Line,
  RiEarthLine,
  RiStore3Line,
  RiSendPlaneLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const NavCliente = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="flex w-full  px-6 h-[5vh] bg-gradient-to-r from-primary to-secundary ">
      <div className="items-center flex gap-6  ">
        
          <div className="z-20">
            <div
              className={`fixed bg-white md:w-[40%] xl:w-[20%] xl: h-full 
                ${showMenu ? "left-0" : "-left-[80%]"} 
                top-0 flex-1 flex flex-col 
                gap-3 
                transition-all {duration-500 }`}
            >
              <div className="bg-primary flex items-center p-4 justify-between gap-1">
                <div>
                  <h1 className="text-white uppercase font-bold text-2xl">
                    Ecove
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-white text-2xl"
                  >
                    <RiCloseLine />
                  </button>
                </div>
              </div>

              <div className="text-left grid mx-1 font-sain">
                <ul>
                  <h2 className="text-black font-bold px-2 text-base">
                    Categoria
                  </h2>
                  <li>
                    <Link
                      to="/"
                      className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
                    >
                      <RiRestaurant2Line /> Vegano
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
                    >
                      <RiRestaurant2Line /> Vegetariano
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
                    >
                      <RiEarthLine /> Ecologico
                    </Link>
                  </li>
                  <h2 className="text-black font-bold px-2 text-base ">Otros</h2>
                  <li>
                    <Link
                      to="/"
                      className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
                    >
                      <RiStore3Line /> Registrar tu restaurante
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
                    >
                      <RiSendPlaneLine /> Más información
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" border-white">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className=" text-white  text-2xl hover:text-yellow-400 z-10"
                
              >
                <RiMenuUnfoldLine />
              </button>
            </div>
          </div>
        
        {/* Navbar */}
       
      </div>
     
    </nav>
  );
};

export default NavCliente;
