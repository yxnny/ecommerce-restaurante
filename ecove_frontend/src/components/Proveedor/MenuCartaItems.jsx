import React from "react";
import { Menu, Transition } from "@headlessui/react";
function MenuCartaItems({ icon, items, onItemClick }) {
  return (
    <Menu as="div">
      <Menu.Button className=" right-6 p-1 text-black">{icon}</Menu.Button>
      <Transition enter="transition ease-out duration-300">
        <Menu.Items
          as="section"
          className="absolute right-[-5px] bg-primary w-44 rounded-lg shadow-lg p-0.5 z-10"
        >
          <div className="max-h-80">
            {items.map((item, index) => (
              <Menu.Item key={index} className="pb-2 space-x-1">
                <a
                  className="flex items-center rounded-md hover:bg-secundary transition-colors p-1"
                  onClick={() => onItemClick(item.action)}
                >
                  {item.icon}
                  <p className="text-white text-sm">{item.label}</p>
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export default MenuCartaItems;
