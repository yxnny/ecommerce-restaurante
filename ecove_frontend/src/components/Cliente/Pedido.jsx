import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function Mypedido() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center mt-5">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-2sm font-bold rounded-full border border-transparent bg-primary text-lg  hover:bg-green-400 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Realizar pedido
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[80%] transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-lg font-bold text-center"
                  >
                    Editar direccion de envio
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xl text-gray-500">
                      Informacion Personal
                    </p>
                    <form className='ml-[10%] mt-4'>
                      <label>Numero de la tarjeta :</label>
                      <input type="text" className='border-2 border-black rounded-lg ml-2' />
                    </form>
                    <form className='ml-[50%] -mt-7'>
                      <label htmlFor="">Titular de la tarjeta:</label>
                      <input type="text" className='border-2 border-black rounded-lg ml-2' />
                    </form>
                    <form className='ml-[10%] mt-16'>
                      <label>MM :</label>
                      <input type="month" className='border-2 border-black rounded-lg ml-2 w-[10%]' />
                    </form>
                    <form className='ml-[30%] -mt-7'>
                      <label>AA :</label>
                      <input type="text" className='border-2 border-black rounded-lg ml-2 w-[10%]' />
                    </form>
                    <form className='ml-[50%] -mt-7'>
                      <label> CVV :</label>
                      <input type="text" className='border-2 border-black rounded-lg ml-2 ' />
                    </form>
                    <form className='ml-2 mt-8'>
                      <input type="checkbox" className='border-2 border-black' />
                      <label className='ml-2'>Guardar por defecto</label>
                    </form>
                  </div>

                  <div className="mt-[8%]">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-gray-300 px-4 py-2 text-lg font-bold hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Confirmar
                    </button>
                  </div>

                  <div className="-mt-11 ml-[15%]">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-gray-300 px-4 py-2 text-lg font-bold hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Mypedido
