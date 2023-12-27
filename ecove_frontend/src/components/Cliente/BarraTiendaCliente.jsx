import React, { useState } from "react";
// iconos
import { RiHeart3Fill, RiHeart3Line, RiStore3Fill } from "react-icons/ri";

const BarraTiendaCliente = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="mt-1 grid grid-cols-6 xl:grid-cols-4 items-center ">
      <div className=" col-span-4 xl:col-span-2">
        <div className="flex">
          <a href="#" className="flex items-center h-9 gap-2 ">
            <div className="">
              {/* Logo de la tienda */}
              <img
                className="rounded-full h-12 w-12"
                src={`${props.img}`}
                alt=""
              />
            </div>

            <div className="  flex ">
              {/* Nombe de la tienda */}
              <div className="md:w-40 xl:w-56">
                <h2 className=" font-semibold text-sm xl:text-base ">
                  {props.NombreTienda}
                </h2>
              </div>

              <div className="xl:flex md:flex gap-5 hidden ">
                <img
                  className="rounded-full h-8 w-8"
                  src="https://th.bing.com/th/id/R.f88898c72840d3b1eaa616630c0ce25b?rik=KrcRsuAVPxg%2bng&pid=ImgRaw&r=0"
                  alt=""
                />
                <img
                  className="rounded-full h-8 w-8"
                  src="https://img.freepik.com/vector-gratis/circulo-vegano-verde_78370-2153.jpg?"
                  alt=""
                />
                <img
                  className="rounded-full h-8 w-8"
                  src="https://img.freepik.com/vector-gratis/etiqueta-compostable-dibujada-mano_23-2149433635.jpg?"
                  alt=""
                />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="p-2 xl:p-3 col-span-2">
        <div className="flex  xl:ml-48 gap-5 md:gap-20 xl:gap-20  items-center">
          <div className="  ">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-primary text-2xl xl:text-4xl "
            >
              {showMenu ? <RiHeart3Line /> : <RiHeart3Fill />}
            </button>
          </div>

          <div className=" ">
            <a href="#" className="">
              <div className="flex  text-primary ">
                <div className="text-2xl">
                  <RiStore3Fill />
                </div>
                <h1 className="hidden md:block xl:block text-xs xl:text-base">
                  Ir a la tienda
                </h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraTiendaCliente;
