import React from "react";
import CardProveedor from "../../components/Proveedor/CardProveedor";
import { RiStarLine, RiHeart3Line } from "react-icons/ri";
import CardNotificaciones from "../../components/Proveedor/CardNotificaciones";
const resenas = () => {
  return (
    <>
      <div className=" bg-white">
        <div>
          <h1 className="text-2xl font-medium ml-4 pt-4">Reseñas</h1>
        </div>
        {/* Contenido */}
        <div className=" p-4 ">
          <div>
            {/* columnas */}
            <div className="rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 ">
              <CardProveedor
                titulo="Reseñas Positivas"
                titulo2="Más de 3 estrellas"
                subtitulo={"Total: " + 22}
                icono={<RiStarLine />}
              />
              <CardProveedor
                titulo="Reseñas Negativas"
                titulo2="Menos de 3 estrellas"
                subtitulo={" $ variable"}
                icono={<RiStarLine />}
              />
              <CardProveedor
                titulo="Corazones en la Tienda"
                titulo2="Persona que le gusta tu restaurante"
                subtitulo={" $ variable"}
                icono={<RiHeart3Line />}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className=" rounded-md ">
            <div className="mb-4">
              <h1 className="text-lg font-medium mb-1">Reseñas Recientes</h1>
              <p className="text-justify text-sm">
                Aquí puedes ver las estrellas más recientes que han recibido tu
                restaurante y la cantidad de 'Me gusta' que han recibido tu
                restaurante.
              </p>
            </div>
            {/* solo que muestre 3 filas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <CardNotificaciones
                icono={<RiStarLine className="text-2xl " />}
                nombreUsuario="Nombre del Usuario"
                fecha="lunes, 31 de junio de 2023"
                calificacion={5}
                nombrePlato="Pizza Vegana con tofu"
                restaurante={5}
              />
              <CardNotificaciones
                icono={<RiHeart3Line className="text-2xl " />}
                nombreUsuario="Nombre del Usuario"
                fecha="lunes, 31 de junio de 2023"
                gustar={"Nombre restaurante"}
              />
              <CardNotificaciones
                icono={<RiHeart3Line className="text-2xl " />}
                nombreUsuario="Nombre del Usuario"
                fecha="lunes, 31 de junio de 2023"
                gustar={"Pizzas veganas"}
              />
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default resenas;
