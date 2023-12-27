import React,{useState} from "react";
// import axios from 'axios';
const Formulario = ({ titulo, campos, onSubmit, }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const enviarForm = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };
  return (
    <form onSubmit={enviarForm}>
      <div className="flex items-center mb-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="uppercase font-bold">{titulo}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {campos.map((campo) => (
          <div className="flex flex-col mb-4" key={campo.id}>
            <label className="text-sm mb-2">
              {campo.label}{" "}
            </label>
            {campo.type === "select" ? ( // Nuevo código para campos de selección (select)
              <div>
                <select
                  id={campo.id}
                  className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none cursor-pointer"
                >
                  <option value="">
                    {campo.placeholder || "Seleccione una opción"}
                  </option>
                  {campo.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : campo.type === "file" ? ( // Código existente para campos de archivo (file)
              <div className="relative rounded-lg border-gray-200 bg-gray-100 py-2 px-4">
                <input
                  type="file"
                  id={campo.id}
                  accept={campo.accept || ".pdf"}
                  className="absolute inset-0 w-full h-full outline-none opacity-0"
                  onChange={(e) => {
                    // Lógica para manejar la selección de archivos
                  }}
                />
                <div className="text-center">
                  <label
                    htmlFor={campo.id}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                  >
                    {campo.placeholder || "Subir archivo"}
                  </label>
                </div>
              </div>
            ) : (
              // Código existente para otros tipos de campos (texto, número, etc.)
              <input
                type={campo.type}
                id={campo.id}
                className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100"
                placeholder={campo.placeholder}
                maxLength={campo.maxLength}
                onKeyPress={(e) => {
                  if (campo.type === "email") {
                    // Validación personalizada para el correo electrónico si es necesario
                  } else if (campo.type === "file") {
                    // Validación personalizada para el archivo si es necesario
                  } else if (campo.type === "tel") {
                    const isValidKey = /[0-9]/.test(e.key);

                    // Si no es un número, prevenimos la entrada
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  } else if (
                    campo.id === "numeroCuentaBancariaUser" ||
                    campo.id === "numeroCuentaEmpresa"
                  ) {
                    const isValidNumber = /[0-9]/.test(e.key);
                    if (!isValidNumber || e.target.value.length >= 20) {
                      e.preventDefault();
                    }
                    // Se debe poner los campos espeficicos que solo debe ser caracteres
                  } else if (
                    campo.id === "nitEmpresa" 
                  ) {
                    const isValidNumber = /[0-9]/.test(e.key);
                    if (!isValidNumber || e.target.value.length >= 9) {
                      e.preventDefault();
                    }
                    // Se debe poner los campos espeficicos que solo debe ser caracteres
                  } else if (
                    campo.id === "nombreUsuario" ||
                    campo.id === "nombreTitularUser" ||
                    campo.id === "nombreRepresentante" ||
                    campo.id === "apellidosRepresentante" ||
                    campo.id === "nombreTitularEmpresa"
                  ) {
                    const isValidKey = /[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/.test(e.key);
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* <div className="flex justify-end">
        <button className="bg-primary/80 text-white py-2 px-4 rounded-lg hover:bg-primary transition-colors">
          Guardar
        </button>
      </div> */}
    </form>
  );
};

export default Formulario;
