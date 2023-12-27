// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { RiMapPinLine } from "react-icons/ri";
import PropProducVende from "../../components/Cliente/PropProducVende";
import CalificacionEstrellas from "../../components/Cliente/ClificacionEstrellas";

const Cuerpopag11 = () => {
  return (
    <div className="">
      <div className="">
        <img
          src="/src/images/vegan.png"
          alt=""
          className="w-full lg:h-72  object-cover"
        />
      </div>
      {/* TItulos */}
      <div className="w-full">
        <div className="flex items-center justify-between p-2 ">
          <div className="flex items-center space-x-2">
            <div>
              <img
                src="https://th.bing.com/th/id/R.1597b1e63b9d8ff971d350d4ac4a6384?rik=pLsmI1DcXyt8zg&pid=ImgRaw&r=0"
                className="w-14 h-14 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-lg font-medium"> Nombre de restaurante</h1>
              <h1 className="text-base font-nromal">Delivery {20} Min.</h1>
            </div>
          </div>
          <div className="flex space-x-2 ">
            <RiMapPinLine className="text-2xl text-red-600 " />
            <div className="">
              <h1 className="text-lg font-medium">
                Direccion de ejemplo calle #22 cra 18
              </h1>
              {/* estrellas */}
              <div className="flex items-center space-x-1">
                <h1 className="text-base font-normal">Calificación:</h1>
                <div>
                  <CalificacionEstrellas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contenedor de productos */}
      <div>
        {/* Titulo */}
        <div>
          <h1 className="text-2xl font-medium text-center">Productos</h1>
        </div>
        {/* Filtros */}
        <div className="p-1 w-full flex  items-center pl-4 ">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <div className="font-semibold text-xl">Categorias:</div>
              <select className="w-32 py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer">
                <option value="Desayuno">Desayuno</option>
                <option value="Combos">Combos</option>
              </select>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4">
          <h1 className="text-2xl  font-medium text-gray-600 ">
            Nombre de la categoria: {"Combos "}
          </h1>
        </div>
        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-2  gap-4  mb-8 mt-4  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 max-h-[52vh]">
          <PropProducVende
            imagen="vegano"
            titulo="Titulo del plato"
            titulo2="Producto Vegano"
            descripcion="Arroz, Maiz, Maduro, Papa criolla, Champiñones, Cebollin y Cilantro"
            precio="$50.000"
            
          />
          <PropProducVende
            imagen="vegano"
            titulo="Titulo del plato"
            titulo2="Producto Vegano"
            descripcion="Arroz, Maiz, Maduro, Papa criolla, Champiñones, Cebollin y Cilantro"
            precio="$50.000"
          />
          <PropProducVende
            imagen="vegano"
            titulo="Titulo del plato"
            titulo2="Producto Vegano"
            descripcion="Arroz, Maiz, Maduro, Papa criolla, Champiñones, Cebollin y Cilantro"
            precio="$50.000"
          />
        </div>
      </div>
      {/* datos abajo */}
      <div>
        <h1 className="text-2xl font-medium text-center">Nombre restaurante</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-2  gap-5 ">
        {/* columna1 */}
        <div className="p-2">
          <div>
            <h1 className="text-center text-2xl font-medium">Informacion</h1>
          </div>
          <div className="mt-2 flex border-b-2 justify-between">
            <h1 className="font-medium text-base">Especialidad :</h1>
            <div>
              <p className="text-base">vegano/vegetariano</p>
            </div>
          </div>
          <div className="mt-2 flex border-b-2 justify-between">
            <h1 className="font-medium text-base">Tiempo de entrega aproximado :</h1>
            <div>
              <p className="text-base">20min</p>
            </div>
          </div>
          <div className="mt-2 flex border-b-2 justify-between">
            <h1 className="font-medium text-base">Direccion :</h1>
            <div>
              <p className="text-base">Calle 123 cra 11 L avenida norte</p>
            </div>
          </div>
        </div>
        {/* columna2 */}
        <div className="p-2 ">
          <div className="bg-cuadro rounded-3xl">
            <h1 className="text-center text-2xl font-medium">Horarios</h1>
            <div className="flex justify-center">
              <p className="font-medium ">Lunes :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium ">Martes :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium ">Miercoles :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium ">Jueves :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium ">Viernes :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium ">Sabado :</p>
              <p className="">14:00 - 20:00</p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium mb-3">Domingo :</p>
              <p className="">14:00 - 20:00</p>
            </div>
          </div>
        </div>
        {/* columan3 */}
        <div className="p-2">
          <div className="bg-cuadro rounded-3xl ">
            <h1 className="text-center text-2xl font-medium">
              Calificación restaurante{" "}
            </h1>
            <div className="mt-2 ml-6 text-center">
              <p className=" font-medium text-lg">
                4.4 <br />
              </p>
              <div>
                <div>
                  <CalificacionEstrellas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-medium text-center">Ubicación</h1>
      </div>
      <div className="mt-5">{/* mapa direccion */}</div>
    </div>
  );
};

export default Cuerpopag11;
