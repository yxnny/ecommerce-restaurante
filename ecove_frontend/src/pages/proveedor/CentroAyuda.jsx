// src/components/CerrarSesion.jsx
import React from "react";
import {
  RiVideoAddLine,
  RiSendPlaneLine,
  RiUserSearchLine,
} from "react-icons/ri";

const CentroAyuda = () => {
  return (
    <>
      <div className="bg-white">
        <div className="p-4">
          <div className="border rounded-md p-4  mb-8 pr-4 pb-4">
            <div className=" flex items-center space-x-2">
              <div className=" bg-green-800 rounded-full p-3 text-white">
                <RiUserSearchLine className="text-5xl" />
              </div>
              <div>
                <h1 className="text-2xl font-medium pb-2 ">Centro de Ayuda</h1>
                <p className="text-justify text-base text-gray-600">
                  Para que tu experiencia sea lo más fluida y efectiva posible,
                  es esencial que te familiarices con todas las funciones que
                  ofrecemos. A continuación, hemos preparado una amplia variedad
                  de recursos y material de ayuda, cuidadosamente seleccionados,
                  para que puedas navegar con confianza en nuestra plataforma.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-md  mb-8 pr-4 pb-4">
            <div className=" flex items-center space-x-2  p-4 ">
              <div className=" bg-green-800 rounded-full p-3 text-white ">
                <RiVideoAddLine className="text-5xl" />
              </div>
              <div>
                <h1 className="text-lg font-medium pb-2">
                  Videos interactivos
                </h1>
                <p className="text-justify text-base text-gray-600">
                  Para que tu experiencia sea lo más fluida y efectiva posible,
                  es esencial que te familiarices con todas las funciones que
                  ofrecemos. A continuación, hemos preparado una amplia variedad
                  de recursos y material de ayuda, cuidadosamente seleccionados,
                  para que puedas navegar con confianza en nuestra plataforma.{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-end ">
              <a
                href="#"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              >
                Comenzar video
              </a>
            </div>
          </div>
          <div className="border rounded-md mb-8 pr-4 pb-4">
            <div className=" flex items-center space-x-2  p-4  ">
              <div className=" bg-green-800 rounded-full p-3 text-white ">
                <RiSendPlaneLine className="text-5xl" />
              </div>
              <div>
                <h1 className="text-lg font-medium pb-2">¿Aun tienes dudas?</h1>
                <p className="text-justify text-base text-gray-600">
                  Aquí podrás solucionar tus preguntas y aprender más sobre
                  nuestra plataforma. Explora los siguientes recursos y
                  materiales de ayuda para obtener respuestas a tus dudas y
                  sacar el máximo provecho de nuestra plataforma. Si necesitas
                  asistencia adicional, no dudes en escribirnos a este correo:
                  prueba@gmail.com o contactarnos directamente al número:
                  xxx-xxx-xxxx. Estamos aquí para ayudarte en cualquier momento{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CentroAyuda;
