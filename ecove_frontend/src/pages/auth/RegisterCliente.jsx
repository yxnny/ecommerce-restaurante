import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import HeaderForms from "../../components/Cliente/HeaderForms";
import { createusuario } from "../../api/RegistroUsuario";
// Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
} from "react-icons/ri";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
      data.username = data.usu_correo;
      data.role = 1; // ID del rol "cliente" en la base de datos
      data.is_active = true;
      console.log(data);
      const res = await createusuario(data);
      console.log("res");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Obtenemos el mensaje de error del campo documento
      const mensajeErrorDocumento = error.message.usu_numdoc;
      // Obtenemos el mensaje de error del campo correo
      const mensajeErrorCorreo = error.message.usu_correo;
      // Si el mensaje de error del campo documento no es nulo, entonces el dato registrado es el documento
      if (mensajeErrorDocumento !== null) {
        setError("La identificación de usuario ya está registrada.");
      }
      if (mensajeErrorCorreo !== null) {
        // Si el mensaje de error del campo correo no es nulo, entonces el dato registrado es el correo
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
            Crear <span className="text-secundary">Cuenta</span>
          </h1>
          <form onSubmit={onSubmit} className="mb-8">
            <input type="hidden" {...register("role")} />
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="text"
                className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                placeholder="Nombre(s)"
                {...register("usu_nombre", { required: true })}
                onKeyPress={(e) => {
                  // Verificar si la tecla presionada es una letra (A-Z o a-z),
                  // espacio o una letra con tilde (á, é, í, ó, ú, etc.)
                  const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);

                  // Si no es una letra, espacio o letra con tilde, prevenimos la entrada
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
              />
             
            </div>
            {errors.usu_nombre && (
                <span className="font-thin text-sm text-[#Ff0000]">
                  Este campo es requerido
                </span>
              )}
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="text"
                className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                placeholder="Apellidos"
                {...register("usu_apellido", { required: true })}
                onKeyPress={(e) => {
                  const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {errors.usu_apellido && (
              <span className="font-thin text-sm text-[#Ff0000]">
                Este campo es requerido
              </span>
            )}
            <div className="relative mb-4">
              <input
                type="text"
                className="py-3 pl-2 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                placeholder="N. Documento"
                {...register("usu_numdoc", { required: true })}
                maxLength={10}
                onKeyPress={(e) => {
                  const isValidKey = /[0-9]/.test(e.key);
                  if (!isValidKey) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {errors.usu_numdoc && (
              <span className="font-thin text-sm text-[#Ff0000]">
                Este campo es requerido
              </span>
            )}
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="email"
                className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                placeholder="Correo electrónico"
                {...register("usu_correo", { required: true })}
              />
            </div>
            {errors.usu_correo && (
              <span className="font-thin text-sm text-[#Ff0000]">
                Este campo es requerido
              </span>
            )}
            <div className="relative mb-4">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
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
                La contraseña debe tener al menos 8 coracteres con una
                mayúscula, un número y un carácter especial !@#$%^&*._
              </p>
            )}
            <div className="relative mb-4">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="py-3 pl-8 pr-4 bg-gray-100 w-full outline-none rounded-lg"
                placeholder="Confirmar contraseña"
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
  );
};

export default Register;
