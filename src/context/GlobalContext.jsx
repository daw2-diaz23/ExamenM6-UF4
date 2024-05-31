import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [historias, setHistorias] = useState([]);
    const [dataHistòria, setDataHistòria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorias = async () => {
            try {
                const response = await fetch('https://jsonserver-examen.vercel.app/historias');
                console.log('Response status:', response.status); // Verifica la respuesta
                if (!response.ok) {
                    throw new Error('Error al cargar las historias');
                }
                const data = await response.json();
                console.log('Data fetched:', data); // Verifica los datos recibidos
                setHistorias(data || []); // Asegura que siempre se establezca un array
            } catch (err) {
                setError(err.message);
                setHistorias([]);  // Asegura que historias sea un arreglo
            } finally {
                setLoading(false);
            }
        };

        fetchHistorias();
    }, []);

    const agregarHistoria = async (historia) => {
        try {
            const response = await fetch('https://jsonserver-examen.vercel.app/historias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(historia),
            });
            if (!response.ok) {
                throw new Error('Error al agregar la historia');
            }
            const newHistoria = await response.json();
            setHistorias(prev => [...prev, newHistoria]);
        } catch (err) {
            throw err;
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
            });
            if (!response.ok) {
                throw new Error('Error al editar la historia');
            }
            const updatedHistoria = await response.json();
            setHistorias(prev => prev.map(hist => hist.id === id ? updatedHistoria : hist));
        } catch (err) {
            throw err;
        }
    };

    const eliminarHistoria = async (id) => {
        try {
            const response = await fetch(`https://jsonserver-examen.vercel.app/historias/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al borrar la historia');
            }
            setHistorias(prev => prev.filter(historia => historia.id !== id));
        } catch (err) {
            throw err;
        }
    };

    return (
        <GlobalContext.Provider value={{ historias, agregarHistoria, editarHistoria, eliminarHistoria, dataHistòria, setDataHistòria, loading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};