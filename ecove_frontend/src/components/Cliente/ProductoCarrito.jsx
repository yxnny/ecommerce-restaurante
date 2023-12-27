import React from "react";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { BsTrash3Fill } from "react-icons/bs";

const ProductoCarrito = (props) => {
  return (
    <div className=" w-full p-3 ">
      {/* Nombre tienda */}
      <h1 className="text-center">{props.nombreTiendaCarro}</h1>
      <div className="flex ">
        <div className="w-auto p-1 ">
          {/* Imagen del producto */}
          <img
            className="rounded-sm h-[70px] w-[70px]"
            src={`${props.imgProductCarrito}`}
          />
        </div>

        <div className="w-auto my-0.5 -ml- mr-2 hidden xl:block">
          {/* Logos de categoria productos */}
          <div className=" h-5 w-5 text-right ">
            <img
              className="rounded-full "
              src="src/img/icono-vegetarian.jpg"
              alt=""
            />
          </div>
          <div className=" h-5 w-5 text-right ">
            <img
              className="rounded-full "
              src="https://img.freepik.com/vector-gratis/circulo-vegano-verde_78370-2153.jpg?"
              alt=""
            />
          </div>
          <div className=" h-5 w-5 text-right ">
            <img
              className="rounded-full "
              src="https://img.freepik.com/vector-gratis/etiqueta-compostable-dibujada-mano_23-2149433635.jpg?"
              alt=""
            />
          </div>
        </div>
        {/* Informacion del producto */}
        <div className="w-2/4 p-2 text-xs mb-1 ">
          <h1 className="">{props.nombreProductCarro}</h1>
          <h2 className="text-xs my-1 text-gray-900 font-bold">
            $ {props.precioProductCarro}
          </h2>
          <div className="flex mt-1 xl:gap-5">
            <button className="">
              <BsTrash3Fill className=" mx-2" />
            </button>
            <div className="border border-black  rounded-md">
              <button className="">
                <RiSubtractFill />
              </button>
              <span className="mx-2 ">1</span>
              <button className="">
                <RiAddFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCarrito;
