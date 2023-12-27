import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const PasswordForm = ({ userType }) => {
  const [viejaPassword, setViejaPassword] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isNuevaPasswordValid, setIsNuevaPasswordValid] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const ViejaPasswordChange = (e) => {
    const newViejaPassword = e.target.value;
    setViejaPassword(newViejaPassword);
  };

  const NuevaPasswordChange = (e) => {
    const newNuevaPassword = e.target.value;
    setNuevaPassword(newNuevaPassword);

    const isPasswordValid =
      newNuevaPassword.length >= 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.]).+/g.test(newNuevaPassword);

    if (!isPasswordValid) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número, una letra minúscula y un carácter especial (.@)"
      );
      setIsNuevaPasswordValid(false);
    } else {
      setError("");
      setIsNuevaPasswordValid(true);
    }
  };

  const ConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== nuevaPassword) {
      setError("Las contraseñas no coinciden.");
      setIsPasswordsMatch(false);
    } else {
      setError("");
      setIsPasswordsMatch(true);
    }
  };

const enviarDatos = async (e) => {
  e.preventDefault();
  const isValidViejaPassword = await validarContraseñaAntigua(viejaPassword);
  if (!isValidViejaPassword) {
    setError("La contraseña antigua no es válida.");
    return;
  }

  // Lógica para enviar los datos a la base de datos o al servidor
  try {
    // Realiza una solicitud HTTP (por ejemplo, usando fetch o axios) para enviar los datos al servidor.
    // Aquí deberías enviar la contraseña antigua y la nueva contraseña al servidor.

    console.log("Cambio de contraseña realizado con éxito.");
    console.log(`Cambio de contraseña ${userType === "proveedor" ? "proveedor" : "cliente"}`);
    // Para verlos en la consola alvvvvvvvvvvvvvvvvvv estoy mmada de esatr esta mierda
    console.log("Contraseña antigua:", viejaPassword);
    console.log("Nueva contraseña:", nuevaPassword);
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  }

  setViejaPassword("");
  setNuevaPassword("");
  setConfirmPassword("");
};

  const validarContraseñaAntigua = async (viejaPassword) => {
    // Lógica para validar la contraseña antigua en tu base de datos
    return true; // Simulación de éxito
  };

  return (
    <div>
      <form onSubmit={enviarDatos}>
        <div className="flex items-center mb-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="uppercase font-bold">Cambiar Contraseña</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Contraseña Antigua <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 px-8 outline-none rounded-lg bg-gray-100"
                placeholder="******"
                value={viejaPassword}
                onChange={ViejaPasswordChange}
              />
              {showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Nueva contraseña <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 relative">
            <input
              type={showPassword2 ? "text" : "password"}
              className="w-full py-2 px-8 outline-none rounded-lg bg-gray-100"
              placeholder="******"
              value={nuevaPassword}
              onChange={NuevaPasswordChange}
            />
            {showPassword2 ? (
              <RiEyeOffLine
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
              />
            ) : (
              <RiEyeLine
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Confirmar Contraseña <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full relative">
              <input
                type={showPassword3 ? "text" : "password"}
                className="w-full py-2 px-8 outline-none rounded-lg bg-gray-100"
                placeholder="******"
                value={confirmPassword}
                onChange={ConfirmPasswordChange}
                disabled={!isNuevaPasswordValid}
              />
              {showPassword3 ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword3(!showPassword3)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword3(!showPassword3)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary text-2xl"
                />
              )}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${
              !isNuevaPasswordValid || !isPasswordsMatch
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={!isNuevaPasswordValid || !isPasswordsMatch}
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
