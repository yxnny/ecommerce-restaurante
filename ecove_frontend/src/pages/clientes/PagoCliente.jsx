import React, { useState, useEffect } from "react";
import { RiStore3Line } from "react-icons/ri";
import Modal from "../../components/Cliente/Modal";
import Metodos from "../../components/Cliente/Metodos";
import Pedido from "../../components/Cliente/Pedido";
import PropProducVende from "../../components/Cliente/PropProducVende";
import { useForm } from "react-hook-form";
import { getAllUsuarioRolClientes } from "../../api/UsuariosClientes";
import jsPDF from "jspdf";
import { getMetodoUsuarioRolClientes } from "../../api/Metodopago";
import { createOrden } from "../../api/CrearOrden";
const Cuerpo = () => {
  // Jenny
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [advertencia, setAdvertencia] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [usuNombreCli, setUsuNombreCli] = useState("");
  const [telClien, setTelClien] = useState("");
  const [reloadUserData, setReloadUserData] = useState(false);
  const [img, setimg] = useState("");
  const [nompro, setnompro] = useState("");
  const [cate, setcate] = useState("");
  const [precio, setprecio] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [sedeid, setsedeid] = useState("");
  const [proid, setproid] = useState("");
  const [cantida, setcantidad] = useState("");
  const [total, settotal] = useState("");

  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [metodosPago, setMetodosPago] = useState([]);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const storedUsername = localStorage.getItem("username");
      try {
        const usuarioResponse = await getAllUsuarioRolClientes(storedUsername);
        const metodosResponse = await getMetodoUsuarioRolClientes(
          storedUsername
        );

        setUserData(usuarioResponse.data);
        setMetodosPago(metodosResponse.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const storedProId = localStorage.getItem("pro_id");
    if (storedProId) {
      setimg(localStorage.getItem("pro_foto"));
      setnompro(localStorage.getItem("pro_nombre"));
      setcate(localStorage.getItem("cate"));
      setprecio(localStorage.getItem("pro_precio"));
      setdescripcion(localStorage.getItem("pro_especificacion"));
      setsedeid(localStorage.getItem("sed_id"));
      setproid(storedProId);
      setcantidad(parseInt(localStorage.getItem("cantidad")));
      setUsername(localStorage.getItem("username"));
      settotal(
        localStorage.getItem("cantidad") * localStorage.getItem("pro_precio")
      );
    }
  }, []);

  // datos user
  useEffect(() => {
    async function fetchData() {
      const storedUsername = localStorage.getItem("username");
      try {
        const usuarioResponse = await getAllUsuarioRolClientes(storedUsername);
        const metodosResponse = await getMetodoUsuarioRolClientes(
          storedUsername
        );

        setUserData(usuarioResponse.data);
        setMetodosPago(metodosResponse.data);

        const usuarioEncontrado = usuarioResponse.data.find(
          (usuario) => usuario.username === storedUsername
        );

        console.log("Información del usuario:", usuarioEncontrado);
        const metodosUsuario = metodosResponse.data.filter(
          (metodo) => metodo.username === storedUsername
        );

        console.log(
          "Métodos de pago del usuario que inicio sesion:",
          metodosUsuario
        );

        if (usuarioEncontrado) {
          console.log("Usuario Encontrado:", usuarioEncontrado);
          setDireccionCliente(usuarioEncontrado.usu_ubicacion);
          setUsuNombreCli(usuarioEncontrado.usu_nombre);
          setTelClien(usuarioEncontrado.usu_telefono);

          setReloadUserData(false);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    }

    fetchData();
  }, [reloadUserData]);

  const enviarOrden = async () => {
    try {
      if (!userData || !direccionCliente || !proid || !cantida || !username) {
        setAdvertencia("Faltan datos para realizar la orden.");
        return;
      }

      const metodosUsuarioResponse = await getMetodoUsuarioRolClientes(
        username
      );
      const metodosUsuario = metodosUsuarioResponse.data;

      const metodoPagoActivo = metodosUsuario.find(
        (metodo) => metodo.username === username
      );

      if (!metodoPagoActivo) {
        setAdvertencia("Selecciona un método de pago para realizar la orden.");
        return;
      }

      const ordenData = {
        username: username,
        sed_id: sedeid,
        direccion: direccionCliente,
        metodo_pago: {
          met_id: metodoPagoActivo.met_id,
          met_titular: metodoPagoActivo.met_titular,
          met_numero: metodoPagoActivo.met_numero,
          met_fechaexpira: metodoPagoActivo.met_fechaexpira,
          met_cvv: metodoPagoActivo.met_cvv,
        },
        productos: [
          {
            pro_id: proid,
            cantidad: cantida,
          },
        ],
      };

      console.log("Datos de la orden:", ordenData);

      const response = await createOrden(ordenData);
      console.log("Respuesta del servidor monda:", response);

      if (response.status === 201) {
        console.log("Orden creada exitosamente:", response.data);
        // Puedes mostrar un mensaje de éxito o redirigir al usuario a la página correspondiente.
        setPedidoRealizado(true); // Actualiza el estado al realizar el pedido
      } else {
        console.error("Error al crear la orden:", response.statusText);
        // Aquí manejas los errores, pero en este caso no debería ser un error.
      }
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      setAdvertencia(
        "Error al enviar la orden. Por favor, inténtalo de nuevo."
      );
    }
  };

  const generarPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(33, 33, 33);
    pdf.text("Ecove Factura", 80, 20);

    pdf.setFontSize(11);
    pdf.line(20, 35, 190, 35); // Reducido el espacio entre el título y los datos

    // Facturar a columna 1
    pdf.text("Facturar a", 20, 45);
    pdf.text(`Cliente: ${usuNombreCli}`, 20, 55);
    pdf.text(`Contacto: ${telClien}`, 20, 65);

    // Enviar a columna 2
    pdf.text("Enviar a", 80, 45);
    pdf.text(`Dirección: ${direccionCliente}`, 80, 55);
    pdf.text(`Contacto: ${telClien}`, 80, 65);

    // Número de factura columna 3
    pdf.text("Fecha:", 140, 45);
    pdf.text(new Date().toLocaleDateString(), 140, 55);

    // Línea divisoria
    pdf.line(20, 85, 190, 85);
    // Detalles del producto
    pdf.setFontSize(11);
    pdf.text("Cant.", 20, 95);
    pdf.text("Producto", 40, 95);
    pdf.text("Descripción", 70, 95);
    pdf.text("Precio unitario", 134, 95); // Modificado para reducir el espacio
    pdf.text("Importe", 170, 95);
    pdf.line(20, 100, 190, 100);

    // Detalle del producto
    const descripcionLines = pdf.splitTextToSize(descripcion, 63); // Aumentado el ancho máximo de la descripción
    pdf.setFont("helvetica", "normal"); // Establece la fuente a helvetica y el estilo a normal
    pdf.setFontSize(11);
    pdf.text(`${cantida}`, 20, 110);
    pdf.text(`${nompro}`, 40, 110);
    pdf.text(descripcionLines, 70, 110);
    pdf.text(`${precio}`, 134, 110);
    pdf.text(`${total}`, 170, 110);

    // Subtotal, IVA y Total
    pdf.text("Subtotal", 134, 135);
    pdf.text(`${total}`, 170, 135);
    pdf.text("IVA", 134, 145);
    pdf.text("No", 170, 145);
    pdf.text("Total a pagar", 134, 155);
    pdf.text(`${total}`, 170, 155);
    // Agradecimiento
    pdf.setFont("helvetica", "normal"); // Cambiado de "italic" a "normal"
    pdf.setTextColor(128, 128, 128);
    pdf.text("Gracias por su compra,", 20, 210);
    pdf.text("Ecove le desea un lindo día!", 20, 220);

    // Guarda el archivo PDF
    pdf.save("FacturaEcove.pdf");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      <div className="p-2   m-2">
        {/* Contenido de la columna 1 */}
        <div className="flex items-center">
          <RiStore3Line className="text-2xl" />
          <h1 className="text-lg font-medium">Productos Selecionados</h1>
        </div>
        <div className="">
          <PropProducVende
            imagen={img}
            titulo={nompro}
            titulo2={cate}
            descripcion={descripcion}
            precio={precio}
            mostrarContador={false}
            cantidad={cantida}
          />
        </div>
      </div>
      <div className=" border shadow-md rounded-md p-2 m-2">
        {/* Contenido de la columna 1 */}
        <div className="text-center">
          <h1 className="text-lg font-medium">Resumen pedido</h1>
        </div>
        <hr className="my-2 border-gray-200" />

        <div className="">
          <h1 className="text-base text-gray-700 font-medium">
            Información de Contacto
          </h1>
          <div className="text-xs text-gray-500">
            <p className="text-sm font-bold">Nombre: {usuNombreCli}</p>
            <p>Contacto: {telClien}</p>
          </div>
        </div>
        <hr className="my-2 border-gray-200" />

        <div className="flex items-center space-x-2 justify-between">
          <div className="flex space-x-2">
            <h1 className="text-base text-gray-700 font-medium">
              Dirreccion de envio:{" "}
            </h1>
            <p className="text-base text-gray-700 font-thin ">
              {direccionCliente}
            </p>
          </div>
          <div>
            <Modal
              usernameClin={username}
              actualizarDatosUsuario={() => setReloadUserData(true)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex space-x-2">
            <h1 className="text-base text-gray-700 font-medium">
              Metodo de pago:{" "}
            </h1>
            <p className="text-base text-gray-700 font-thin ">Tarjeta</p>
          </div>
          <div>
            <Metodos usernameClin={username} />
          </div>
        </div>
        <hr className="my-2 border-gray-200" />
        <div>
          <h1 className="text-base text-gray-800 font-medium text-center">
            Resumen de Costos
          </h1>
          <div className=" grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <div className=" ">
              <h1 className="text-base text-gray-700 font-medium">
                Nombre producto
              </h1>
              <p> {nompro}</p>
            </div>

            <div className=" ">
              <h1 className="text-base text-gray-700 font-medium">
                Valor Unitario
              </h1>
              <p> {precio}</p>
            </div>
            <div className=" ">
              <h1 className="text-base text-gray-700 font-medium">Cantidad</h1>
              <p> {cantida}</p>
            </div>
            <div className=" ">
              <h1 className="text-base text-gray-700 font-medium">Sub total</h1>
              <p>{total}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-gray-500">
            <p className="text-sm font-bold">Subtotal: {total}</p>
          </div>
        </div>
        <hr className="my-2 border-gray-200" />

        <div className="mb-4">
          <div className="text-xs text-gray-500">
            <p className="text-sm font-bold">Total: {total}</p>
          </div>
        </div>
        <div className=" text-center ">
          <button
            onClick={enviarOrden}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          >
            Realizar Pedido
          </button>
        </div>
        {advertencia && (
          <div className="text-sm text-red-500 mt-2 font-thin text-justify">
            {advertencia}
          </div>
        )}
        {pedidoRealizado && (
          <button
            onClick={generarPDF}
            className="bg-red-400 mt-2 px-4 py-2 text-white rounded-md hover:bg-red-600 w-full"
          >
            Generar PDF de la orden
          </button>
        )}
      </div>
    </div>
  );
};

export default Cuerpo;
