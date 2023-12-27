import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
import {
  RiCustomerService2Line,
  RiFileList3Line,
  RiMoneyDollarBoxLine,
  RiTimeLine,
  RiBookReadLine,
  RiStore3Line,
  RiStarLine,
  RiCoinsLine,
  RiMegaphoneLine,
  RiPercentLine,
  RiCloseLine,
  RiNotification2Line,
  RiFilter3Line,
  RiEyeLine,
} from "react-icons/ri";

const ProveedorSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div
        className={`fixed border-r lg:static top-0 w-64 h-full py-10 px-4  flex flex-col justify-between bg-[#FFFFFF]  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300" transition-all lg:left-0 z-50 ${
          showSidebar ? "-left-0 mt-[px]" : "-left-full"
        }`}
      >
        <div className="lg:-mt-7">
          <ul>
            <h2 className="text-black font-bold mb-2 ">Inicio</h2>
            <li>
              <Link
                to="/Resumen"
                className="text-black flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl transition-colors"
              >
                <RiEyeLine /> Resumen
              </Link>
            </li>
            <li>
              <Link
                to="/Notificaciones"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiNotification2Line />
                Notificaciones
              </Link>
            </li>
            <h2 className="text-black font-bold mb-2">Administración</h2>
            <li>
              <Link
                to="/ordenes"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiFileList3Line />
                Órdenes
              </Link>
            </li>
            <li>
              <Link
                to="/Horarios"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiTimeLine />
                Horarios
              </Link>
            </li>
            <li>
              <Link
                to="/MenuCarta"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiBookReadLine />
                Menu/Carta
              </Link>
            </li>
            {/* <li>
              <Link
                to="/PagosEmpresa"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiMoneyDollarBoxLine />
                Pagos
              </Link>
            </li>
            <h2 className="text-black font-bold mb-2">Análisis </h2>
            <li>
              <Link
                to="/Resenas"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiStarLine />
                Reseñas
              </Link>
            </li>
            <li>
              <Link
                to="/Ventas"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiCoinsLine />
                Ventas
              </Link>
            </li>
            */}
            <h2 className="text-black font-bold mb-2">Más información</h2>
            <li>
              <Link
                to="/CentroDeAyuda"
                className="text-black flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded-xl transition-colors"
              >
                <RiCustomerService2Line />
                Soporte de ayuda
              </Link>
            </li> 
          </ul>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden fixed bottom-4 right-4 bg-primary p-4 rounded-full text-xl z-50"
      >
        {showSidebar ? <RiCloseLine /> : <RiFilter3Line />}
      </button>
    </>
  );
};

export default ProveedorSidebar;
