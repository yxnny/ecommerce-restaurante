// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderForms from "../../components/Cliente/HeaderForms";
import { useForm } from "react-hook-form";
import { createusuario } from "../../api/RegistroUsuarioTienda";

// Icons
import {
  RiMailLine,
  RiStore3Line,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";

const Empresa = () => {
  const navigate = useNavigate();
  const { register, handleSubmit,formState: { errors },} = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[!@#$%^&*._]/.test(newPassword);
    setIsValidPassword(isValid);

    if (e.target.value !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
    setIsTyping(true); // Indica que se está escribiendo en el campo de contraseña
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      console.log("el rol es:" + data.role);
      data.role = 2; // ID del rol "tienda" en la base de datos
      data.is_active = true;
      data.is_tienda = true;
      data.is_staff = true;
      data.is_superuser = true;
      console.log(data);
      const res = await createusuario(data);
      console.log("res");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.error(error);
      const mensajeErrorDocumento = error.message.usu_numdoc;
      if (mensajeErrorDocumento !== null) {
        setError("La identificación de usuario ya está registrada.");
      }
      if (mensajeErrorCorreo !== null) {
        setError2("El correo electrónico ya está registrado.");
      }
    }
  });
  return (
    <div className=" bg-[#d1fae5]">
      <HeaderForms />
      <div className="flex items-center justify-center  min-h-screen">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
          <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8">
            Registrar <span className="text-secundary">tienda</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
            <input type="hidden" {...register("role")} />
            <div>
              <h1 className="mb-4 font-medium text-base text-gray-500">
                Datos Usuario
              </h1>
              <div className="relative mb-4 ">
                <RiStore3Line className="absolute top-6 -translate-y-1/2 left-2 text-primary" />
                <input
                  type="text"
                  className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Nombre tienda"
                  onKeyPress={(e) => {
                    const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                  {...register("usu_nombre", { required: true })}
                />
                {errors.usu_nombre && (
                  <span className="font-thin text-sm text-[#Ff0000]">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <div className="relative mb-4 ">
                <RiMailLine className="absolute top-6 -translate-y-1/2 left-2 text-primary" />
                <input
                  type="email"
                  className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Correo eletronico responsable"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="font-thin text-sm text-[#Ff0000]">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  {...register("password", { required: true })}
                  onChange={handlePasswordChange}
                  className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Contraseña"
                />
                {showPassword ? (
                  <RiEyeLine
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <RiEyeOffLine
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
              {isTyping && !isValidPassword && (
                <p className="text-red-500 text-sm mt-2">
                  La contraseña debe tener al menos una mayúscula, un número y
                  un carácter especial.
                </p>
              )}

              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                  placeholder="Confirmar Contraseña"
                />
                {showConfirmPassword ? (
                  <RiEyeLine
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                    onClick={toggleShowConfirmPassword}
                  />
                ) : (
                  <RiEyeOffLine
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                    onClick={toggleShowConfirmPassword}
                  />
                )}
              </div>
              {!passwordsMatch && password !== "" && confirmPassword !== "" && (
                <p className="text-red-500 text-sm mt-2">
                  Las contraseñas no coinciden.
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className={`${
                  passwordsMatch && isValidPassword
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                } uppercase font-bold text-sm w-full py-3 px-4 rounded-lg`}
                disabled={!passwordsMatch || !isValidPassword}
              >
                Registrarme
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center gap-4">
            <span className="flex items-center justify-center gap-2">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-[#fde047] transition-colors"
              >
                Ingresa
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Empresa;
