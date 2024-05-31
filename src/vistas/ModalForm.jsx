import React, { useEffect, useContext } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { Calendar, Pencil, Image as ImageIcon } from 'lucide-react';
import { GlobalContext } from "../context/GlobalContext";


export default function ModalForm({ isOpen, onClose, onSave }) {
    // Definimos el componente funcional ModalForm que recibe las props: isOpen, onClose y onSave.

    const { dataHistòria, setDataHistòria } = useContext(GlobalContext);
    // Extraemos dataHistòria y setDataHistòria del GlobalContext usando useContext.

    useEffect(() => {
        if (!dataHistòria) {
            setDataHistòria({ titulo: '', fecha: '', experiencia: '', comentario: '', imagen: '' });
            // Si no hay dataHistòria, inicializamos un objeto vacío con los campos correspondientes.
        }
    }, [dataHistòria, setDataHistòria]);
    // Ejecutamos este efecto cada vez que dataHistòria o setDataHistòria cambien.

    const controladorFormHistòria = (e) => {
        const { name, value } = e.target;
        setDataHistòria(prev => ({ ...prev, [name]: value }));
        // Actualizamos el estado de dataHistòria con el nuevo valor del campo que cambió.
    };

    const controladorEnvio = (e) => {
        e.preventDefault();
        // Prevenimos el comportamiento por defecto del formulario (recargar la página).

        if (dataHistòria.id) {
            controladorActualizaHistòrias(dataHistòria);
            // Si hay un id en dataHistòria, llamamos a la función para actualizar la historia.
        } else {
            controladorNuevaHistòria(dataHistòria);
            // Si no hay id, llamamos a la función para crear una nueva historia.
        }
        onSave(dataHistòria);
        // Llamamos a la función onSave pasada por props con dataHistòria como argumento.
    };

    const controladorActualizaHistòrias = (data) => {
        console.log("ID de la historia:", data.id);
        console.log("Actualizacion de la historia:", data);
        // Aquí se añadirá la lógica para actualizar el elemento en la base de datos.
    };

    const controladorNuevaHistòria = (data) => {
        console.log("ID de la historia:", data.id);
        console.log("Nueva Historia:", data);
        // Aquí se añadirá la lógica para crear un nuevo elemento en la base de datos.
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
            {/* Usamos el componente Modal con las propiedades isOpen y onClose para controlar su visibilidad y el evento de cierre. */}
            <ModalContent>
                {/* Contenido del modal */}
                <form onSubmit={controladorEnvio}>
                    {/* Formulario que llama a la función controladorEnvio cuando se envía */}
                    <ModalHeader>
                        {dataHistòria?.id ? "Editar historia" : "Crear nueva historia"}
                        {/* Encabezado del modal que cambia según si estamos editando o creando una nueva historia */}
                    </ModalHeader>
                    <ModalBody>
                        {/* Cuerpo del modal donde están los campos del formulario */}
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
                        {/* Campo de entrada para el título de la historia */}
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
                        {/* Campo de entrada para la fecha de la historia */}
                        <Textarea
                            underlined
                            label="Experiencia"
                            placeholder="Describe tu experiencia"
                            name="experiencia"
                            value={dataHistòria?.experiencia || ''}
                            onChange={controladorFormHistòria}
                        />
                        {/* Área de texto para describir la experiencia */}
                        <Textarea
                            underlined
                            label="Comentario"
                            placeholder="Escribe comentarios"
                            name="comentario"
                            value={dataHistòria?.comentario || ''}
                            onChange={controladorFormHistòria}
                        />
                        {/* Área de texto para los comentarios */}
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
                        {/* Campo de entrada para la URL de la imagen */}
                    </ModalBody>
                    <ModalFooter>
                        {/* Pie del modal con los botones de acción */}
                        <Button auto flat color="error" onPress={onClose} style={{ backgroundColor: '#f87171', color: 'white' }}>
                            Cerrar
                        </Button>
                        {/* Botón para cerrar el modal */}
                        <Button auto type="submit" color="primary" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                            {dataHistòria?.id ? "Editar Historia" : "Crear Historia"}
                        </Button>
                        {/* Botón para enviar el formulario y crear o editar la historia */}
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
