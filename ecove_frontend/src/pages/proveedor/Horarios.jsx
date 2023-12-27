import React, { useState, useEffect } from "react";
import {
  RiErrorWarningLine,
  RiCloseLine,
  RiShoppingCart2Line,
} from "react-icons/ri";
// IMPORTS api traer datos

import { useForm } from "react-hook-form";
import { createHorario, updateHorario } from "../../api/Horarios";
import { getAllHorariosPorSed, getHorario } from "../../api/HorariosPorSed";
import { useNavigate } from "react-router-dom";

function Horarios() {
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito
  const [showMenu, setShowMenu] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const tiendaSedId = localStorage.getItem("sed_id");
  console.log(" id de la sede: " + tiendaSedId);

  const { register, handleSubmit, setValue } = useForm();
  // Para traer el horario de la tienda que inicio sesion
  useEffect(() => {
    async function fetchData() {
      const response = await getAllHorariosPorSed(tiendaSedId);
      setHorarios(response.data);
    }
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const categoriaHorario = { ...data, sed_id: tiendaSedId };

    try {
      // Verificar si ya existe un horario para la tienda
      const existingHorarioResponse = await getHorario(tiendaSedId);

      if (existingHorarioResponse.data.length > 0) {
        // Si ya existe un horario, realizar la actualización (editar)
        const res = await updateHorario(tiendaSedId, categoriaHorario);
        console.log("Se editó el horario:", res);
        setSuccessMessage("¡Se actualizaron los datos correctamente!"); // Establecer el mensaje de éxito
      } else {
        // Si no existe un horario, crear uno nuevo
        const res = await createHorario(categoriaHorario);
        console.log("Se creó un nuevo horario:", res);
        setSuccessMessage("¡Se guardo el horario correctamente!"); // Establecer el mensaje de éxito
      }
    } catch (error) {
      console.error("Error al verificar el horario:", error);
    }
  });

  useEffect(() => {
    async function loadTienda() {
      if (tiendaSedId) {
        try {
          const response = await getHorario(tiendaSedId);
          const tiendaDataList = response.data;

          if (tiendaDataList && tiendaDataList.length > 0) {
            const tiendaData = tiendaDataList[0];
            console.log("Datos de la tienda:", tiendaData);
            setValue("hlun_aper1", tiendaData.hlun_aper1);
            setValue("hlun_cie1", tiendaData.hlun_cie1);

            setValue("hmar_aper1", tiendaData.hmar_aper1);
            setValue("hmar_cie1", tiendaData.hmar_cie1);

            setValue("hmie_aper1", tiendaData.hmie_aper1);
            setValue("hmie_cie1", tiendaData.hmie_cie1);

            setValue("hjue_aper1", tiendaData.hjue_aper1);
            setValue("hjue_cie1", tiendaData.hjue_cie1);

            setValue("hvie_aper1", tiendaData.hvie_aper1);
            setValue("hvie_cie1", tiendaData.hvie_cie1);

            setValue("hsab_aper1", tiendaData.hsab_aper1);
            setValue("hsab_cie1", tiendaData.hsab_cie1);

            setValue("hdom_aper1", tiendaData.hdom_aper1);
            setValue("hdom_cie1", tiendaData.hdom_cie1);
          }
        } catch (error) {
          console.error("Error fetching horario:", error);
        }
      }
    }
    loadTienda();
  }, [tiendaSedId, setValue]);
  return (
    <>
      <div className="bg-white ">
        <div className="p-4 w-full ">
          <div className="border border-gray-300 rounded-md pb-7 relative">
            <h1 className="mt-4 ml-4 mb-4 font-medium">Horarios Regulares</h1>
            <hr className="my-2 border-gray-300" />

            <div className="bg-gray-200 mr-4 ml-4 py-2 rounded-lg mt-6 flex items-center">
              <div className="flex justify-center pl-2">
                <RiErrorWarningLine className="text-2xl text-green-600" />
              </div>
              <p className="text-sm pl-1 text-justify pr-2">
                ¡Atención! Puedes realizar cambios en el horario de tu tienda,
                pero ten en cuenta que estos cambios pueden tomar un poco de
                tiempo en ser procesados y aprobados.
              </p>
            </div>
            {/* TABLA HORAS */}
            <div className="ml-4 mt-6 mr-4 mb-4 overflow-x-auto">
              <form onSubmit={onSubmit}>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-primary text-white text-sm">
                    <tr>
                      <th className="text-left px-2 py-1">Día</th>
                      <th className="text-left px-2 py-1">Abre</th>
                      <th className="text-left px-2 py-1">Cierra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Lunes
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hlun_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hlun_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Martes
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hmar_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hmar_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Miercoles
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hmie_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hmie_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Jueves
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hjue_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hjue_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Viernes
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hvie_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hvie_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Sabado
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hsab_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hsab_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 bg-gray-100 text-sm">
                        Domingo
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hdom_aper1", { required: true })}
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="time"
                          className="w-full text-sm"
                          {...register("hdom_cie1", { required: true })}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="submit"
                  className="inline-flex justify-center my-2 rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Guardar
                </button>
                {successMessage && (
                  <div className="text-green-500 mt-4">{successMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Horarios;
