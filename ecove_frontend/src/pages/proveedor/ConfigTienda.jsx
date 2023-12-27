import React, { useState, useEffect } from "react";
import CardProveedor from "../../components/Proveedor/CardProveedor";
import ProveedorHeaderConfig from "../../components/Proveedor/ProveedorHeaderConfig";
import { createTienda } from "../../api/DatosTienda";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  RiStore2Line,
  RiCoinsLine,
  RiErrorWarningLine,
  RiEdit2Line,
  RiCameraLine,
} from "react-icons/ri";
const ConfigTienda = () => {
  const [showColumna1, setShowColumna1] = useState(true);
  const [showColumna2, setShowColumna2] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const watchLogo = watch("sed_logo");
  const watchBanner = watch("sed_banner");
  const handleBoton = () => {
    if (showColumna1) {
      setShowColumna1(false);
      setShowColumna2(true);
    } else {
      setShowColumna1(true);
      setShowColumna2(false);
    }
  };

  useEffect(() => {
    if (watchLogo && watchLogo.length > 0) {
      setLogoPreview(URL.createObjectURL(watchLogo[0]));
    }
  }, [watchLogo]);

  useEffect(() => {
    if (watchBanner && watchBanner.length > 0) {
      setBannerPreview(URL.createObjectURL(watchBanner[0]));
    }
  }, [watchBanner]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const formData = new FormData();
      formData.append("sed_logo", data.sed_logo);
      formData.append("sed_banner", data.sed_banner);
      formData.append("sed_ubicacion", data.sed_ubicacion);
      formData.append("sed_teltienda", data.sed_teltienda);
      formData.append("sed_emailtienda", data.sed_emailtienda);
      formData.append("sed_nomdueno", data.sed_nomdueno);
      formData.append("sed_teldueno", data.sed_teldueno);
      formData.append("sed_apedueno", data.sed_apedueno);
      formData.append("sed_docdueno", data.sed_docdueno);
      formData.append("sed_emaildueno", data.sed_emaildueno);
      formData.append("sed_banco", data.sed_banco);
      formData.append("sed_tipcuenta", data.sed_tipcuenta);
      formData.append("sed_nomtitular", data.sed_nomtitular);
      formData.append("sed_numcuentabancaria", data.sed_numcuentabancaria);
      formData.append("sed_Nit", data.sed_Nit);
      formData.append("owner", username);
      if (data.sed_logo[0]) {
        formData.append("sed_logo", data.sed_logo[0]);
      }
      if (data.sed_banner[0]) {
        formData.append("sed_banner", data.sed_banner[0]);
      }

      const response = await createTienda(formData);

      // Verificar si la respuesta tiene sed_id
      if (response.sed_id) {
        // Almacenar sed_id en localStorage
        localStorage.setItem("sed_id", response.sed_id);
        localStorage.setItem("sed_logo", response.sed_logo);
        console.log("sed_id almacenado en localStorage:", response.sed_id);
        localStorage.setItem("sed_logo", response.sed_logo);

      } else {
        console.error("Error: sed_id no está presente en la respuesta de createTienda");
      }
      navigate("/Resumen");
    } catch (error) {
      console.error("Error al enviar la tienda:", error);
    }
  });

  return (
    <>
      <ProveedorHeaderConfig />
      <div className=" bg-[#FFFFFF] p-4 ">
        {showColumna1 && (
          <div>
            <div className="mt-12">
              <h1 className="font-medium uppercase text-2xl text-center ">
                ¡Bienvenido Nombre-Tienda!
              </h1>
              <p className="mt-1 text-center font-extralight">
                Proceso de registro
              </p>
              <p className="text-justify box-border sm-ml-64 sm-mr-64">
                ¡Gracias por ser parte de nuestra comunidad! Para seguir
                disfrutando de nuestros servicios, te invitamos a completar los
                datos solicitados en la tienda. ¡Tu participación es fundamental
                para hacer de esta experiencia algo increíble!
              </p>
            </div>
            <div className="rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  py-2 px-2 gap-5 mt-10">
              <CardProveedor
                icono={<RiStore2Line />}
                titulo="Paso 1"
                subtitulo="Información del establecimiento"
              />
              <CardProveedor
                icono={<RiErrorWarningLine />}
                titulo="Paso 2"
                subtitulo="Datos Representante Legal"
              />
              <CardProveedor
                icono={<RiCoinsLine />}
                titulo="Paso 3"
                subtitulo="Información Financiera"
              />
            </div>
          </div>
        )}
        {showColumna2 && (
          <div className="p-4">
            <h1 className="font-medium uppercase text-2xl text-center mb-4">
              Información del establecimiento
            </h1>
            <p className="text-justify box-border sm-ml-64 sm-mr-64 mb-8">
              ¡Tu participación es clave para hacer de nuestra tienda un lugar
              aún mejor! Por favor, completa los datos generales de la tienda
              para que podamos ofrecerte una experiencia personalizada y
              adaptada a tus necesidades. ¡Gracias por ser parte de nuestro
              crecimiento!
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <input type="hidden" {...register("role")} />
              <div className="flex items-center mb-8">
                <div className="flex-1 flex flex-col items-center justify-center ">
                  <p className="uppercase font-bold">Logotipo y banner</p>
                  <div className="flex space-x-10 mb-2">
                    <div className="relative">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          className="w-28 h-28 object-cover rounded-lg mt-4 border border-dashed border-green-600"
                        />
                      ) : (
                        <div
                          className={`w-28 h-28 flex items-center justify-center bg-gray-200 rounded-lg mt-4 border border-dashed ${
                            logoPreview ? "border-green-600" : "border-red-500"
                          }`}
                        >
                          <RiCameraLine
                            className={
                              logoPreview ? "text-green-600" : "text-red-500"
                            }
                          />
                        </div>
                      )}
                      <label
                        htmlFor="logotipo"
                        className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24 mt-4"
                      >
                        <RiEdit2Line className="black-red-400" />
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/jfif"
                        id="logotipo"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log("Logo file selected:", file);

                          if (file) {
                            setLogoPreview(URL.createObjectURL(file));
                            setValue("sed_logo", file); // Set the value for sed_logo using setValue
                          }
                        }}
                        {...register("sed_logo", { required: true })}
                      />
                      {errors.sed_logo && (
                        <span className="font-thin text-sm text-[#Ff0000]">
                          Este campo es requerido
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          className="w-28 h-28 object-cover rounded-lg mt-4 border border-dashed border-green-600"
                        />
                      ) : (
                        <div
                          className={`w-28 h-28 flex items-center justify-center bg-gray-200 rounded-lg mt-4 border border-dashed ${
                            bannerPreview
                              ? "border-green-600"
                              : "border-red-500"
                          }`}
                        >
                          <RiCameraLine
                            className={
                              bannerPreview ? "text-green-600" : "text-red-500"
                            }
                          />
                        </div>
                      )}
                      <label
                        htmlFor="banner"
                        className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24 mt-4"
                      >
                        <RiEdit2Line className="black-red-400" />
                      </label>
                      <input
                        type="file"
                        id="banner"
                        accept="image/jpeg, image/jpg, image/png, image/jfif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log("Banner file selected:", file);

                          if (file) {
                            setBannerPreview(URL.createObjectURL(file));
                            setValue("sed_banner", [file]); // Asegúrate de envolver el archivo en un array
                          }
                        }}
                        {...register("sed_banner", { required: true })}
                      />
                      {errors.sed_banner && (
                        <span className="font-thin text-sm text-[#Ff0000]">
                          Este campo es requerido
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Dirección de la Tienda{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Dirección tienda"
                    {...register("sed_ubicacion", { required: true })}
                  />
                  {errors.sed_ubicacion && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Número de Celular Tienda
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Celular tienda"
                    maxLength="10"
                    onKeyPress={(e) => {
                      const isValidKey = /[0-9]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_teltienda", { required: true })}
                  />
                  {errors.sed_teltienda && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col ">
                  <label className="text-sm mb-2">
                    Correo Electrónico Tienda
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Correo electrónico"
                    {...register("sed_emailtienda", { required: true })}
                  />
                  {errors.sed_emailtienda && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
              </div>
              <hr className="my-2 border-gray-200" />
              <p className=" text-center uppercase font-bold">
                Representante Legal
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Nombres <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Nombres"
                    onKeyPress={(e) => {
                      const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_nomdueno", { required: true })}
                  />
                  {errors.sed_nomdueno && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Apellidos
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Apellidos"
                    onKeyPress={(e) => {
                      const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_apedueno", { required: true })}
                  />
                  {errors.sed_apedueno && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col ">
                  <label className="text-sm mb-2">
                    Número de Documento
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Documento"
                    maxLength="10"
                    minLength="6"
                    onKeyPress={(e) => {
                      const isValidKey = /[0-9]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_docdueno", { required: true })}
                  />
                  {errors.sed_docdueno && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col ">
                  <label className="text-sm mb-2">
                    Número de Celular
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Número celular"
                    maxLength="10"
                    onKeyPress={(e) => {
                      const isValidKey = /[0-9]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_teldueno", { required: true })}
                  />
                  {errors.sed_teldueno && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col ">
                  <label className="text-sm mb-2">
                    Correo Electrónico
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Correo electrónico"
                    {...register("sed_emaildueno", { required: true })}
                  />
                  {errors.sed_emaildueno && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
              </div>
              <hr className="my-2 border-gray-200" />
              <p className=" text-center uppercase font-bold">
                Infromación Financiera
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Número Cuenta Bancaria{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Número de cuenta"
                    maxLength="20"
                    minLength="20"
                    onKeyPress={(e) => {
                      const isValidKey = /[0-9]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_numcuentabancaria", { required: true })}
                  />
                  {errors.sed_numcuentabancaria && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Número de Celular Tienda
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                    {...register("sed_banco", { required: true })}
                  >
                    <option value="">Selecione una opción</option>
                    <option value="Avevillas">Avevillas</option>
                    <option value="Bancolombia">Bancolombia</option>
                  </select>
                  {errors.sed_banco && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Nombre del Titular<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Nombre del titular"
                    onKeyPress={(e) => {
                      const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_nomtitular", { required: true })}
                  />
                  {errors.sed_nomtitular && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Tipo de Cuenta
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                    {...register("sed_tipcuenta", { required: true })}
                  >
                    <option value="">Selecione una opción</option>
                    <option value="ahorro">Cuenta de Ahorro</option>
                    <option value="corriente">Cuenta Corriente </option>
                  </select>
                  {errors.sed_tipcuenta && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2">
                    Número de Identificación Tributaria (NIT){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                    placeholder="Nit"
                    maxLength="9"
                    minLength="9"
                    onKeyPress={(e) => {
                      const isValidKey = /[0-9]/.test(e.key);
                      if (!isValidKey) {
                        e.preventDefault();
                      }
                    }}
                    {...register("sed_Nit", { required: true })}
                  />
                  {errors.sed_Nit && (
                    <span className="font-thin text-sm text-[#Ff0000]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary/80 text-white py-2 px-4 rounded-lg hover:bg-primary transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
            <hr className="my-2 border-gray-200" />
          </div>
        )}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => handleBoton()}
            className="bg-green-600 text-white hover:bg-green-700 uppercase font-bold text-sm w-72 py-3 px-4 rounded-lg"
          >
            {showColumna1 ? "¡Comenzar!" : "Atrás"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfigTienda;
