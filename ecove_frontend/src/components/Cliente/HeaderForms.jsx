/* eslint-disable no-unused-vars */
import React from "react";
// iconos
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";

const HeaderForms = () => {
  return (
    <header className="flex items-center justify-between px-8 lg:h-[10vh] bg-gradient-to-r from-primary to-secundary ">
      <div>
          <ul>
            <li>
              <Link to="/.." className="text-white uppercase font-bold text-4xl">
                <GoChevronLeft />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white uppercase font-bold text-2xl tracking-[2px]">Ecove</p>
        </div>
    </header>
  );
};

export default HeaderForms;
