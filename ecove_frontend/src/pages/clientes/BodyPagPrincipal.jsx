import React from "react";
import { Link } from "react-router-dom";
const BodyPagPrincipal = () => {
  return (
    <div className=" ">
      <div className="relative">
        <div className="z-0">
          <img
            src="/src/images/vegan.png"
            alt=""
            className="w-full h-full object-cover absolute"
          />
        </div>
        {/* contenido encima de la imagen */}
        <div className="relative lg:w-2/3 sm:w-full lg:p-8 p-2 space-y-4 pb-2 ">
          <h1 className=" text-white text-3xl font-bold">
            ¡Bienvenido a Ecove!
          </h1>
          <div className="opacity-75 bg-gray-300 p-2 text-justify rounded-lg">
            <p className=" text-black text-xl font-semibold ">
              Explora nuestra tienda y descubre una amplia gama de productos,
              desde alimentos orgánico, todos libres de crueldad y amigables con el medio ambiente. Cada
              elección que hagas aquí contribuirá a un futuro más verde y ético.
            </p>
          </div>

          <div className="">
            <Link
              to="/RegistroUsuario"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>

      {/* Informacion */}
      <div className="mt-4">
        <div className="">
          <h1 className="text-center font-bold  text-3xl">
            Nuestros Servicios
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8 mt-8">
          <div className="">
            <Link to="/">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="rounded-full w-36 h-36"
                  src="https://img.freepik.com/vector-gratis/icono-supermercado-isometrico_1284-9125.jpg?"
                  alt=""
                />
                <h1 className="lg:text-lg md:text-sm font-normal text-black mt-2">
                  Despensa
                </h1>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="rounded-full w-36 h-36"
                  src="https://img.freepik.com/vector-premium/diseno-icono-vegano_24911-27089.jpg?"
                />
                <h1 className="lg:text-lg md:text-sm font-normal text-black mt-2">
                  Restaurantes Veganos
                </h1>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="rounded-full w-36 h-36"
                  src="https://img.freepik.com/vector-premium/icono-frutas-verduras-saludables_821599-471.jpg?"
                  alt=""
                />
                <h1 className="lg:text-lg md:text-sm font-normal text-black mt-2">
                  Restaurantes Vegetarianos
                </h1>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
      {/* Has parte de nosotros */}
      <div className=" p-8">
        <div className="mb-4">
          <h1 className="text-center font-bold  text-3xl">
            Forma Parte de Nosotros
          </h1>
        </div>
        <div className="flex flex-col md:flex-row mb-4 justify-center items-center">
          <div className="w-56 ">
            <img
              src="https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?"
              alt=""
              className="w-48 h-48 rounded-lg object-cover"
            />
          </div>
          <div className="md:flex-1 space-y-2 pr-4 p-2">
            <h1 className="text-2xl font-bold">Registra tu Restaurante</h1>
            <p className="text-justify pt-3">
              Registra tu tienda de manera virtual, coloca a la vista de todo
              público la descripción e información general de tu tienda física,
              además de poner su ubicación y subir fotos para darte a conocer al
              público.
            </p>
            <div className="pt-4">
              <Link to="/RegistroEmpresa" className="text-white bg-primary rounded-full p-3">
                ¡Registrarte aqui!
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4 justify-center items-center">
          <div className="w-56">
            <img
              src="https://images.pexels.com/photos/8475166/pexels-photo-8475166.jpeg?"
              alt=""
              className="w-48 h-48 rounded-lg object-cover"
            />
          </div>
          <div className="md:flex-1 space-y-2 pr-4 p-2">
            <h1 className="text-2xl font-bold">Registra tu Tienda</h1>
            <p className="text-justify pt-3">
              Registra tu tienda de manera virtual, coloca a la vista de todo
              público la descripción e información general de tu tienda física,
              además de poner su ubicación y subir fotos para darte a conocer al
              público.
            </p>

            <div className="pt-4">
              <Link to="/RegistroEmpresa" className="text-white bg-primary rounded-full p-3">
                ¡Registrarte aqui!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BodyPagPrincipal;
