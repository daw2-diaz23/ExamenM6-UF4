import React, { useEffect, useContext } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { Calendar, Pencil, Image as ImageIcon } from 'lucide-react';
import { GlobalContext } from "../context/GlobalContext";

export default function ModalForm({ isOpen, onClose, onSave }) {
    const { dataHistòria, setDataHistòria } = useContext(GlobalContext);

    useEffect(() => {
        if (!dataHistòria) {
            setDataHistòria({ titulo: '', fecha: '', experiencia: '', comentario: '', imagen: '' });
        }
    }, [dataHistòria, setDataHistòria]);

    const controladorFormHistòria = (e) => {
        const { name, value } = e.target;
        setDataHistòria(prev => ({ ...prev, [name]: value }));
    };

    const controladorEnvio = (e) => {
        e.preventDefault();
        if (dataHistòria.id) {
            controladorActualizaHistòrias(dataHistòria);
        } else {
            controladorNuevaHistòria(dataHistòria);
        }
        onSave(dataHistòria);
    };

    const controladorActualizaHistòrias = (data) => {
        console.log("ID de la historia:", data.id);
        console.log("Actualizacion de la historia:", data);
        // Aquí se añadirá la lógica para actualizar el elemento en la base de datos
    };

    const controladorNuevaHistòria = (data) => {
      console.log("ID de la historia:", data.id);
        console.log("Nueva Historia:", data);
        // Aquí se añadirá la lógica para crear un nuevo elemento en la base de datos
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
            <ModalContent>
                <form onSubmit={controladorEnvio}>
                    <ModalHeader>
                        {dataHistòria?.id ? "Editar historia" : "Crear nueva historia"}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            clearable
                            underlined
                            label="Título"
                            placeholder="Título de la historia"
                            name="titulo"
                            value={dataHistòria?.titulo || ''}
                            onChange={controladorFormHistòria}
                            endContent={<Pencil className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        />
                        <Input
                            clearable
                            underlined
                            label="Fecha"
                            placeholder="Ejemplo: Junio de 2023"
                            name="fecha"
                            value={dataHistòria?.fecha || ''}
                            onChange={controladorFormHistòria}
                            endContent={<Calendar className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        />
                        <Textarea
                            underlined
                            label="Experiencia"
                            placeholder="Describe tu experiencia"
                            name="experiencia"
                            value={dataHistòria?.experiencia || ''}
                            onChange={controladorFormHistòria}
                        />
                        <Textarea
                            underlined
                            label="Comentario"
                            placeholder="Escribe comentarios"
                            name="comentario"
                            value={dataHistòria?.comentario || ''}
                            onChange={controladorFormHistòria}
                        />
                        <Input
                            clearable
                            underlined
                            label="Imagen"
                            placeholder="URL de la imagen"
                            name="imagen"
                            value={dataHistòria?.imagen || ''}
                            onChange={controladorFormHistòria}
                            endContent={<ImageIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button auto flat color="error" onPress={onClose} style={{ backgroundColor: '#f87171', color: 'white' }}>
                            Cerrar
                        </Button>
                        <Button auto type="submit" color="primary" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                            {dataHistòria?.id ? "Editar Historia" : "Crear Historia"}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}