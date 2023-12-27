import React from "react";

const FooterPagPrincipal = () => {
  return (
    <footer className=" bg-gradient-to-r from-secundary to-primary rounded pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 p-2  gap-5">
        {/* Columan1 */}
        <div className=" p-2">
          <h1 className="text-white uppercase font-bold text-xl">Ecove</h1>
          <p className="text-white text-justify">
            Descubre una variedad de productos frescos y sostenibles que te
            ayudarán a llevar un estilo de vida más saludable y respetuoso con
            el planeta. 
          </p>
        </div>
        {/* columna2 */}
        <div className=" p-2">
          <div className="">
            <h1 className="text-white uppercase font-bold text-xl">
              Unete a Ecove
            </h1>
            <div className="text-white">
              <a href="#">Registra tu Restaurante</a> <br />
            </div>
          </div>
        </div>
        <div className=" p-2 ">
          <div className="">
            <h1 className="text-white uppercase font-bold text-xl">
              Contáctanos
            </h1>
            <div className="text-white">
              <p>ecove@gmail.com</p>
              <p>xxx-xxx-xxx</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPagPrincipal;
