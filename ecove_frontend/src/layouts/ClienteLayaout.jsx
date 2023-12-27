import React from "react";
// Componentes Proveedor
import { Outlet } from "react-router-dom";
import HeaderPagPrincipal from "../components/Cliente/HeaderPagPrincipal";
import NavCliente from "../components/Cliente/NavCliente";
import FooterPagPrincipal from "../components/Cliente/FooterPagPrincipal";

const ClienteLayout = () => {
  return (
    <div className="grid grid-rows-[auto,auto,1fr,auto] min-h-screen">
      <HeaderPagPrincipal />
      <NavCliente />
      <div className="overflow-y-auto">
        <Outlet />
      </div>
      <FooterPagPrincipal />
    </div>
  );
};

export default ClienteLayout;
