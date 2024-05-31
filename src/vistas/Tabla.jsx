import React, { useEffect, useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Input } from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "lucide-react";

const columns = [
  { name: "Título", uid: "titulo" },
  { name: "Fecha", uid: "fecha" },
  { name: "Experiencia", uid: "experiencia" },
  { name: "Comentario", uid: "comentario" },
  { name: "Acciones", uid: "actions" }
];

export default function App() {
  const [historias, setHistorias] = useState([]);
  const [selectedHistoria, setSelectedHistoria] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonserver-examen.vercel.app/historias")
      .then(response => response.json())
      .then(data => {
        setHistorias(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteHistoria = (id) => {
    fetch(`https://jsonserver-examen.vercel.app/historias/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setHistorias(historias.filter(historia => historia.id !== id));
      })
      .catch(error => {
        console.error("Error deleting historia:", error);
      });
  };

  const openEditModal = (historia) => {
    setSelectedHistoria(historia);
    setIsEditModalOpen(true);
  };

  const openDetailModal = (historia) => {
    setSelectedHistoria(historia);
    setIsDetailModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedHistoria(prevState => ({ ...prevState, [name]: value }));
  };

  const saveEditedHistoria = () => {
    fetch(`https://jsonserver-examen.vercel.app/historias/${selectedHistoria.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedHistoria),
    })
      .then(response => response.json())
      .then(updatedHistoria => {
        setHistorias(historias.map(historia => (historia.id === updatedHistoria.id ? updatedHistoria : historia)));
        setIsEditModalOpen(false);
        setSelectedHistoria(null);
      })
      .catch(error => {
        console.error("Error updating historia:", error);
      });
  };

  const renderCell = useCallback((historia, columnKey) => {
    const cellValue = historia[columnKey];

    switch (columnKey) {
      case "titulo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <img src={historia.imagen} alt={cellValue} style={{ width: "100px", borderRadius: "5px" }} />
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => openDetailModal(historia)}>
                <EyeIcon className="text-blue-500 hover:text-blue-700" />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => openEditModal(historia)}>
                <EditIcon className="text-green-500 hover:text-green-700" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteHistoria(historia.id)}>
                <DeleteIcon className="text-red-500 hover:text-red-700" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [historias]);

  return (
    <>
      <Table aria-label="Tabla de historias" className="bg-gray-100 rounded-lg shadow-lg">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="bg-blue-500 text-white">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={historias}>
          {(item) => (
            <TableRow key={item.id} className="hover:bg-gray-200">
              {(columnKey) => <TableCell className="p-4">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedHistoria && isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Editar Historia</h2>
              </div>
              <Input label="Título" name="titulo" value={selectedHistoria.titulo} onChange={handleEditChange} className="mb-4" />
              <Input label="Fecha" name="fecha" value={selectedHistoria.fecha} onChange={handleEditChange} className="mb-4" />
              <Input label="Experiencia" name="experiencia" value={selectedHistoria.experiencia} onChange={handleEditChange} className="mb-4" />
              <Input label="Comentario" name="comentario" value={selectedHistoria.comentario} onChange={handleEditChange} className="mb-4" />
              <Input label="Imagen" name="imagen" value={selectedHistoria.imagen} onChange={handleEditChange} className="mb-4" />
              <div className="flex justify-end">
                <Button auto flat color="error" onClick={() => setIsEditModalOpen(false)} className="mr-2">
                  Cancelar
                </Button>
                <Button auto onClick={saveEditedHistoria}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedHistoria && isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Detalles de la Historia</h2>
              </div>
              <p><strong>Título:</strong> {selectedHistoria.titulo}</p>
              <p><strong>Fecha:</strong> {selectedHistoria.fecha}</p>
              <p><strong>Experiencia:</strong> {selectedHistoria.experiencia}</p>
              <p><strong>Comentario:</strong> {selectedHistoria.comentario}</p>
              <img src={selectedHistoria.imagen} alt={selectedHistoria.titulo} className="w-full rounded-md mt-4" />
              <div className="flex justify-end mt-4">
                <Button auto onClick={() => setIsDetailModalOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
