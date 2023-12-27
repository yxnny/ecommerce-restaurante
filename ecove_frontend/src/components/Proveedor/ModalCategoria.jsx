import { Dialog, Transition } from "@headlessui/react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import {
  createCategoria,
  updateCategoria,
  getCategoria,
} from "../../api/Categoria";
import { getAllCategoriasPorSed } from "../../api/CategoriasPorSed";
import { useEffect, useState } from "react";
const ModalCategoria = (props) => {
  const {
    isOpen,
    onOpen,
    onClose,
    title,
    fieldLabel,
    buttonText,
    texto,
    loadCategorias,
    categoriaId,
    buttonText2,
    sedId,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Agrega reset al destructuring
  } = useForm();
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getAllCategoriasPorSed(sedId);
      setCategorias(response.data);
    }
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const categoriaExistente = categorias.find(
      (categoria) => categoria.cate_nom === data.cate_nom
    );

    if (categoriaExistente) {
      alert("La categoría ya existe. Introduce una categoría única.");
      return;
    }
    const categoriaData = { ...data, sed_id: sedId };

    if (categoriaId) {
      // Aquí realizar la lógica de edición
      await updateCategoria(categoriaId, categoriaData);
    } else {
      await createCategoria(categoriaData);
      reset(); // Limpia el formulario después de crear una nueva categoría
    }
    onClose();
    loadCategorias();
  });

  useEffect(() => {
    async function loadCategoria() {
      if (categoriaId) {
        const res = await getCategoria(categoriaId);
        setValue("cate_nom", res.data.cate_nom);
      }
    }
    loadCategoria();
  }, [categoriaId, setValue]);
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="rounded-md px-4 py-2 text-sm font-medium text-black hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {buttonText}
      </button>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <form onSubmit={onSubmit}>
                  <div className="mt-2 flex items-center">
                    <div className="flex justify-center pr-2">
                      <RiErrorWarningLine className="text-2xl text-green-600" />
                    </div>
                    <p className="text-sm text-gray-500 text-justify">
                      {texto}
                    </p>
                  </div>
                  <div className="mt-2 ">
                    <label className="text-sm mb-2">{fieldLabel}</label>
                    <input
                      type="text"
                      placeholder="Agrega la categoría"
                      className="w-full py-2 px-4 outline-none rounded-lg bg-gray-100 appearance-none mt-2"
                      {...register("cate_nom", { required: true })}
                    />
                    {errors.cate_nom && <span>Este campo es requerido</span>}
                  </div>
                  <div className="mt-4 space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        onClose(); // Cierra el modal
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {buttonText2}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalCategoria;
