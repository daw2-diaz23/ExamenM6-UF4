import React, { useContext, useState } from "react";
import CardItem from "./Card"; // Verifica la ruta correcta a CardItem
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { GlobalContext } from "../context/GlobalContext";
import ModalForm from './ModalForm'; // Verifica la ruta correcta a ModalForm

const Cards = () => {
  const { historias, setDataHistòria, agregarHistoria, editarHistoria, eliminarHistoria, loading, error } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (historia) => {
    setDataHistòria(historia);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await eliminarHistoria(id);
    } catch (err) {
      console.error("Error al borrar la historia:", err);
    }
  };

  const handleClose = () => {
    setDataHistòria(null);
    setIsModalOpen(false);
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await editarHistoria(data.id, data);
      } else {
        await agregarHistoria(data);
      }
      handleClose();
    } catch (err) {
      console.error("Error al guardar la historia:", err);
    }
  };

  const onOpen = () => {
    setDataHistòria(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Mis historias</h2>
      <div className="max-w-[1200px] gap-4 grid grid-cols-12">
        {historias.map((historia) => (
          <CardItem
            key={historia.id}
            title={historia.titulo}
            date={historia.fecha}
            description={historia.experiencia}
            imageUrl={historia.imagen}
            onEdit={() => handleEdit(historia)}
            onDelete={() => handleDelete(historia.id)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button auto icon={<Plus className="w-4 h-4" />} onClick={onOpen}>
          Añadir Historia
        </Button>
      </div>
      {isModalOpen && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Cards;
