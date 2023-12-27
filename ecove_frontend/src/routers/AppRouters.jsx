import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Paginas proveedor
import Notificaciones from "../pages/proveedor/Notificaciones";
import CentroAyuda from "../pages/proveedor/CentroAyuda";
import Horarios from "../pages/proveedor/Horarios";
import MenuCarta from "../pages/proveedor/MenuCarta";
import Pagos from "../pages/proveedor/Pagos";
import Resenas from "../pages/proveedor/Resenas";
import Ventas from "../pages/proveedor/Ventas";
import Resumen from "../pages/proveedor/Resumen";
import Ordenes from "../pages/proveedor/Ordenes";
import PerfilProveedor from "../pages/proveedor/PerfilProveedor";
import ConfigProveedor from "../pages/proveedor/ConfigProveedor";
import ConfigTienda from "../pages/proveedor/ConfigTienda";

// del cliente pagina como se ve el restaurante
import Restaurante from "../pages/clientes/Restaurante";
// para pagar, paginas de cliente
import PagoCliente from "../pages/clientes/PagoCliente";
import BodyClienteProd from "../pages/clientes/BodyClienteProd";
import BodyPagPrincipal from "../pages/clientes/BodyPagPrincipal";
import PerfilCliente from "../pages/clientes/PerfilCliente";
//Autenticacion/
import Login from "../pages/auth/Login";
import RegisterCliente from "../pages/auth/RegisterCliente";
import RegisterEmpresa from "../pages/auth/RegisterEmpresa";
/// Layaout
import ProveedorLayout from "../layouts/ProveedorLayout";
import ClienteLayout from "../layouts/ClienteLayaout";

function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/RegistroEmpresa" element={<RegisterEmpresa />} />
        <Route path="/RegistroUsuario" element={<RegisterCliente />} />
        <Route path="/" element={<ClienteLayout />}>
          <Route path="/" element={<BodyPagPrincipal />} />
          <Route path="/resultado" element={<BodyClienteProd />} />
          {/* <Route path="/Restaurante" element={<Restaurante />} /> */}
          <Route path="/PerfilUsuario" element={<PerfilCliente />} />
          <Route path="/Pago" element={<PagoCliente />} />
        </Route>

        <Route path="/" element={<ProveedorLayout />}>
          <Route path="/Resumen" element={<Resumen />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/CentroDeAyuda" element={<CentroAyuda />} />
          <Route path="/Horarios" element={<Horarios />} />
          <Route path="/MenuCarta" element={<MenuCarta />} />
          <Route path="/PagosEmpresa" element={<Pagos />} />
          {/* <Route path="/Resenas" element={<Resenas />} /> */}
          {/* <Route path="/Ventas" element={<Ventas />} /> */}
          <Route path="/Ordenes" element={<Ordenes />} />
          <Route path="/PerfilEmpresa" element={<PerfilProveedor />} />
          <Route path="/ConfigEmpresa" element={<ConfigProveedor />} />
        </Route>
        <Route path="/ConfigTienda" element={<ConfigTienda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouters;
