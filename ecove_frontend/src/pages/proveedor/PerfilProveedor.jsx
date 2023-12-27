import React, { useState, useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateDatosTienda, getTienda } from "../../api/DatosTienda";
import { getAllTiendasPorOwnerApi } from "../../api/TodasLasTiendasPorOwners";
const PerfilProveedor = () => {
  // Para traer todas las tiendas registradas
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito
  const [tiendaUsuario, setTiendaUsuario] = useState();
  const [tiendaActual, setTiendaActual] = useState(null); // Agrega estado para almacenar la tienda actual
  const [logoImagen, setLogoImagen] = useState("");
  const [bannerImagen, setBannerImagen] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }, // Fix the typo here
  } = useForm();
  useEffect(() => {
    if (tiendaUsuario && tiendaUsuario.sed_logo) {
      setLogoImagen(tiendaUsuario.sed_logo);
    }
  }, [tiendaUsuario]);
  useEffect(() => {
    if (tiendaUsuario && tiendaUsuario.sed_banner) {
      setBannerImagen(tiendaUsuario.sed_banner);
    }
  }, [tiendaUsuario]);

  const watchLogo = watch("sed_logo");
  const watchBanner = watch("sed_banner");
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

  // Trae todas las tiendas registardas
  useEffect(() => {
    async function fetchData() {
      try {
        const username = localStorage.getItem("username");
        const tiendasDelUsuarioResponse = await getAllTiendasPorOwnerApi(
          username
        );
        const tiendasDelUsuario = tiendasDelUsuarioResponse.data;
        const tiendaActual = tiendasDelUsuario.find((Tienda) => Tienda.sed_id);
        setTiendaUsuario(tiendaActual);

        if (tiendaActual) {
          setTiendaActual(tiendaActual);
        }
        console.log("Tienda registrada:", tiendasDelUsuario);
        console.log("Tienda actual:", tiendaActual);

        // Resto del código...
      } catch (error) {
        console.error("Error al obtener la tienda:", error);
      }
    }

    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const token = localStorage.getItem("token");
      localStorage.setItem("sed_id", tiendaActual?.sed_id || "");
      const sedId = tiendaActual?.sed_id; // Asegúrate de almacenar sed_id cuando cargas los datos de la tienda
      console.log("sedId en el onsubmit:", sedId);
      console.log("Token actual:", token);
      const username = localStorage.getItem("username");
      console.log("Username recuperado de localStorage:", username);

      const formData = new FormData();
      // Datos tienda
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
      console.log("esto: " + username);

      if (data.sed_logo && data.sed_logo[0]) {
        formData.append("sed_logo", data.sed_logo[0]);
      }

      // Verificar si se ha seleccionado una nueva imagen para el banner
      if (data.sed_banner && data.sed_banner[0]) {
        formData.append("sed_banner", data.sed_banner[0]);
      }

      if (sedId) {
        const response = await updateDatosTienda(sedId, formData);
        // navigate("/Resumen");
        localStorage.setItem("sed_logo", response.sed_logo);
        console.log("Nuevo valor del logo en localStorage:", response.sed_logo);
        window.dispatchEvent(new Event("logoActualizado"));
        setSuccessMessage("¡Se actualizaron los datos correctamente!"); // Establecer el mensaje de éxito
      }
    } catch (error) {
      console.error("Error al enviar la tienda:", error);
    }
  });
  // Tarer los datos de la tienda registrada para mostrarlo, incluso la foto del logo
  useEffect(() => {
    async function loadTienda() {
      if (tiendaActual) {
        setValue("sed_ubicacion", tiendaUsuario.sed_ubicacion);
        setValue("sed_teltienda", tiendaUsuario.sed_teltienda);
        setValue("sed_emailtienda", tiendaUsuario.sed_emailtienda);
        setValue("sed_nomdueno", tiendaUsuario.sed_nomdueno);
        setValue("sed_teldueno", tiendaUsuario.sed_teldueno);
        setValue("sed_apedueno", tiendaUsuario.sed_apedueno);
        setValue("sed_docdueno", tiendaUsuario.sed_docdueno);
        setValue("sed_emaildueno", tiendaUsuario.sed_emaildueno);
        setValue("sed_banco", tiendaUsuario.sed_banco);
        setValue("sed_tipcuenta", tiendaUsuario.sed_tipcuenta);
        setValue("sed_nomtitular", tiendaUsuario.sed_nomtitular);
        setValue("sed_numcuentabancaria", tiendaUsuario.sed_numcuentabancaria);
        setValue("sed_Nit", tiendaUsuario.sed_Nit);

        if (tiendaUsuario.sed_logo) {
          setLogoImagen(tiendaUsuario.sed_logo);
        }

        if (tiendaUsuario.sed_banner) {
          setBannerImagen(tiendaUsuario.sed_banner);
        }
      }
    }

    loadTienda();
  }, [tiendaActual, setValue]);

  return (
    <>
      <div className=" bg-[#FFFFFF] p-4 ">
        <h1 className="font-bold uppercase text-2xl ">
          La información de tu tienda en los servicios de Ecove
        </h1>
        <p className="mt-2 text-justify">
          Entendemos que en ocasiones surgen cambios necesarios en el negocio, y
          estamos aquí para ayudarles a realizarlos de manera eficiente y legal.
          Si desea efectuar modificaciones en cualquier campo, como el nombre de
          la tienda, es importante cumplir con los requisitos legales
          correspondientes.
        </p>
        <hr className="my-2 border-gray-200" />
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input type="hidden" {...register("role")} />
          <div className="flex items-center mb-8">
            <div className="flex-1 flex flex-col items-center justify-center ">
              <p className="uppercase font-bold">Logotipo y banner</p>
              <div className="flex space-x-10 mb-2">
                <div className="relative">
                  {logoImagen && (
                    <img
                      src={logoPreview || logoImagen}
                      alt="logotipo"
                      className="w-28 h-28 object-cover rounded-lg mt-4 border border-dashed border-green-600"
                    />
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
                        if (logoImagen) {
                          setLogoImagen(""); // Limpiar la imagen existente si hay una nueva selección
                        }
                      }
                    }}
                    {...register("sed_logo")}
                  />
                </div>
                <div className="relative">
                  {/* <h1>Logo</h1> */}
                  {bannerImagen && (
                    <img
                      src={bannerPreview || bannerImagen}
                      alt="banner"
                      className="w-28 h-28 object-cover rounded-lg mt-4 border border-dashed border-green-600"
                    />
                  )}{" "}
                  <label
                    htmlFor="banner"
                    className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24 mt-4"
                  >
                    <RiEdit2Line className="black-red-400" />
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/jfif"
                    id="banner"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log("Banner file selected:", file);

                      if (file) {
                        setBannerPreview(URL.createObjectURL(file));
                        if (bannerImagen) {
                          setBannerImagen(""); // Limpiar la imagen existente del banner si hay una nueva selección
                        }
                      }
                    }}
                    {...register("sed_banner")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2">
                Dirección de la Tienda <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                placeholder="Dirección tienda"
                {...register("sed_ubicacion")}
              />
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
                {...register("sed_teltienda")}
              />
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
                {...register("sed_emailtienda")}
              />
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
                {...register("sed_nomdueno")}
              />
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
                {...register("sed_apedueno")}
              />
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
                onKeyPress={(e) => {
                  const isValidKey = /[0-9]/.test(e.key);
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
                {...register("sed_docdueno")}
              />
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
                {...register("sed_teldueno")}
              />
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
                {...register("sed_emaildueno")}
              />
            </div>
          </div>
          <hr className="my-2 border-gray-200" />
          <p className=" text-center uppercase font-bold">
            Infromación Financiera
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2">
                Número Cuenta Bancaria <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                placeholder="Número de cuenta"
                maxLength="20"
                onKeyPress={(e) => {
                  const isValidKey = /[0-9]/.test(e.key);
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
                {...register("sed_numcuentabancaria")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2">
                Número de Celular Tienda
                <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                {...register("sed_banco")}
              >
                <option value="">Selecione una opción</option>
                <option value="Avevillas">Avevillas</option>
                <option value="Bancolombia">Bancolombia</option>
              </select>
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
                {...register("sed_nomtitular")}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2">
                Tipo de Cuenta
                <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                {...register("sed_tipcuenta")}
              >
                <option value="">Selecione una opción</option>
                <option value="ahorro">Cuenta de Ahorro</option>
                <option value="corriente">Cuenta Corrinte </option>
              </select>
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
                onKeyPress={(e) => {
                  const isValidKey = /[0-9]/.test(e.key);
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
                {...register("sed_Nit")}
              />
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
          {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
        </form>
       
        <hr className="my-2 border-gray-200" />
      </div>
    </>
  );
};
export default PerfilProveedor;
