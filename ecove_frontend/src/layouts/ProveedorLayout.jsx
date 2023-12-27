import React from "react";
import { Outlet } from "react-router-dom";
// Componentes Proveedor
import ProveedorHeader from "../components/Proveedor/ProveedorHeader";
import ProveedorSidebar from "../components/Proveedor/ProveedorSidebar";

const ProveedorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ProveedorHeader />
      <div className="h-[90vh] flex ">
        <ProveedorSidebar />

        <div className="flex-1 h-full overflow-y-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProveedorLayout;
