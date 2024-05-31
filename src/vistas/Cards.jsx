import React, { useContext, useState } from "react";
import CardItem from "./Card";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { GlobalContext } from "../context/GlobalContext";
import ModalForm from './ModalForm';


const Cards = () => {
  // Definimos el componente funcional Cards.
  const { historias, setDataHistòria, agregarHistoria, editarHistoria, eliminarHistoria, loading, error } = useContext(GlobalContext);
  // Extraemos historias, setDataHistòria, agregarHistoria, editarHistoria, eliminarHistoria, loading y error del GlobalContext usando useContext.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Definimos el estado isModalOpen y su función setIsModalOpen, inicializándolo en false.
  const handleEdit = (historia) => {
    setDataHistòria(historia);
    // Configuramos la historia actual para ser editada.
    setIsModalOpen(true);
    // Abrimos el modal estableciendo isModalOpen en true.
  };

  const handleDelete = async (id) => {
    try {
      await eliminarHistoria(id);
      // Intentamos eliminar la historia utilizando la función eliminarHistoria del contexto.
    } catch (err) {
      console.error("Error al borrar la historia:", err);
      // Si ocurre un error, lo mostramos en la consola.
    }
  };

  const handleClose = () => {
    setDataHistòria(null);
    // Reseteamos la historia seleccionada estableciéndola en null.
    setIsModalOpen(false);
    // Cerramos el modal estableciendo isModalOpen en false.
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await editarHistoria(data.id, data);
        // Si la data contiene un id, editamos la historia existente.
      } else {
        await agregarHistoria(data);
        // Si no hay id, agregamos una nueva historia.
      }
      handleClose();
      // Cerramos el modal después de guardar los cambios.
    } catch (err) {
      console.error("Error al guardar la historia:", err);
      // Si ocurre un error al guardar, lo mostramos en la consola.
    }
  };

  const onOpen = () => {
    setDataHistòria(null);
    // Reseteamos la historia seleccionada estableciéndola en null.
    setIsModalOpen(true);
    // Abrimos el modal estableciendo isModalOpen en true.
  };

  if (loading) {
    return <div>Cargando...</div>;
    // Si loading es true, mostramos un mensaje de carga.
  }

  if (error) {
    return <div>Error: {error}</div>;
    // Si hay un error, mostramos el mensaje de error.
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Contenedor principal del componente con clases de estilo para centrar y dar tamaño mínimo a la pantalla */}
      <h2 className="text-2xl font-bold mb-4">Mis historias</h2>
      {/* Título de la sección */}
      <div className="max-w-[1200px] gap-4 grid grid-cols-12">
        {/* Contenedor de las tarjetas con clases de estilo para el tamaño máximo y la disposición en grid */}
        {historias.map((historia) => (
          <CardItem
            key={historia.id}
            // Usamos el id de la historia como clave única
            title={historia.titulo}
            // Pasamos el título de la historia como prop
            date={historia.fecha}
            // Pasamos la fecha de la historia como prop
            description={historia.experiencia}
            // Pasamos la descripción de la historia como prop
            imageUrl={historia.imagen}
            // Pasamos la URL de la imagen de la historia como prop
            onEdit={() => handleEdit(historia)}
            // Pasamos la función de edición como prop, que se ejecuta cuando se hace clic en editar
            onDelete={() => handleDelete(historia.id)}
            // Pasamos la función de eliminación como prop, que se ejecuta cuando se hace clic en eliminar
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {/* Contenedor del botón con clases de estilo para margen superior y centrado */}
        <Button auto icon={<Plus className="w-4 h-4" />} onClick={onOpen}>
          Añadir Historia
        </Button>
        {/* Botón para abrir el modal y añadir una nueva historia, con el icono Plus */}
      </div>
      {isModalOpen && (
        <ModalForm
          isOpen={isModalOpen}
          // Pasamos el estado isOpen como prop para indicar si el modal está abierto
          onClose={handleClose}
          // Pasamos la función de cierre del modal como prop
          onSave={handleSave}
          // Pasamos la función de guardado como prop
        />
      )}
      {/* Renderizamos el componente ModalForm si isModalOpen es true */}
    </div>
  );
};

export default Cards;
// Exportamos el componente Cards para que pueda ser utilizado en otras partes de la aplicación.
