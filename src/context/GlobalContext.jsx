import React, { createContext, useState, useEffect } from 'react';
// Importamos React y los hooks createContext, useState y useEffect desde la biblioteca de React.

export const GlobalContext = createContext();
// Creamos un contexto global usando createContext.

export const GlobalProvider = ({ children }) => {
    // Definimos el componente funcional GlobalProvider que recibe children como prop.
    const [historias, setHistorias] = useState([]);
    // Definimos el estado historias y su función setHistorias, inicializándolo en un array vacío.
    const [dataHistòria, setDataHistòria] = useState(null);
    // Definimos el estado dataHistòria y su función setDataHistòria, inicializándolo en null.
    const [loading, setLoading] = useState(true);
    // Definimos el estado loading y su función setLoading, inicializándolo en true para indicar que los datos están cargando.
    const [error, setError] = useState(null);
    // Definimos el estado error y su función setError, inicializándolo en null.

    useEffect(() => {
        const fetchHistorias = async () => {
            try {
                const response = await fetch('https://jsonserver-examen.vercel.app/historias');
                // Realizamos una petición fetch a la URL especificada para obtener las historias.
                console.log('Response status:', response.status);
                // Registramos el estado de la respuesta en la consola para depuración.
                if (!response.ok) {
                    throw new Error('Error al cargar las historias');
                    // Si la respuesta no es exitosa, lanzamos un error.
                }

                const data = await response.json();
                // Convertimos la respuesta a JSON.
                console.log('Data fetched:', data);
                // Registramos los datos obtenidos en la consola para depuración.
                setHistorias(data || []);
                // Establecemos los datos obtenidos en el estado historias. Si data es null o undefined, establecemos un array vacío.
            } catch (err) {
                setError(err.message);
                // Si ocurre un error, lo registramos en el estado error.
                setHistorias([]);
                // Aseguramos que historias sea un arreglo vacío en caso de error.
            } finally {
                setLoading(false);
                // Cambiamos el estado loading a false una vez que la petición ha finalizado (con éxito o error).
            }
        };

        fetchHistorias();
        // Llamamos a la función fetchHistorias cuando el componente se monta.
    }, []);
    // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente.

    const agregarHistoria = async (historia) => {
        try {
            const response = await fetch('https://jsonserver-examen.vercel.app/historias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(historia),
                // Realizamos una petición POST para agregar una nueva historia, enviando los datos como JSON.
            });

            if (!response.ok) {
                throw new Error('Error al agregar la historia');
                // Si la respuesta no es exitosa, lanzamos un error.
            }
            const newHistoria = await response.json();
            // Convertimos la respuesta a JSON para obtener la nueva historia agregada.
            setHistorias(prev => [...prev, newHistoria]);
            // Actualizamos el estado historias añadiendo la nueva historia.
        } catch (err) {
            throw err;
            // Si ocurre un error, lo lanzamos para que pueda ser manejado por el componente llamante.
        }
    };

    const editarHistoria = async (id, historiaActualizada) => {
        try {
            const response = await fetch(`https://jsonserver-examen.vercel.app/historias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(historiaActualizada),
                // Realizamos una petición PUT para actualizar una historia existente.
            });

            if (!response.ok) {
                throw new Error('Error al editar la historia');
                // Si la respuesta no es exitosa, lanzamos un error.
            }

            const updatedHistoria = await response.json();
            // Convertimos la respuesta a JSON para obtener la historia actualizada.

            setHistorias(prev => prev.map(hist => hist.id === id ? updatedHistoria : hist));
            // Actualizamos el estado historias reemplazando la historia editada.
        } catch (err) {
            throw err;
            // Si ocurre un error, lo lanzamos para que pueda ser manejado por el componente llamante.
        }
    };

    const eliminarHistoria = async (id) => {
        try {
            const response = await fetch(`https://jsonserver-examen.vercel.app/historias/${id}`, {
                method: 'DELETE',
                // Realizamos una petición DELETE para eliminar una historia por su ID.
            });

            if (!response.ok) {
                throw new Error('Error al borrar la historia');
                // Si la respuesta no es exitosa, lanzamos un error.
            }

            setHistorias(prev => prev.filter(historia => historia.id !== id));
            // Actualizamos el estado historias eliminando la historia cuyo ID coincide con el dado.
        } catch (err) {
            throw err;
            // Si ocurre un error, lo lanzamos para que pueda ser manejado por el componente llamante.
        }
    };

    return (
        <GlobalContext.Provider value={{ historias, agregarHistoria, editarHistoria, eliminarHistoria, dataHistòria, setDataHistòria, loading, error }}>
            {children}
        </GlobalContext.Provider>
        // Retornamos el proveedor de contexto con el estado y las funciones que queremos compartir.
        // Envolvemos a los children dentro del proveedor para que puedan acceder al contexto.
    );
};
