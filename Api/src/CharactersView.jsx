import React, { useState, useEffect } from 'react';
import CharacterForm from './CharacterForm';
import CharacterCard from './CharacterCard';

const CharactersView = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // R - READ
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results.slice(0, 8));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando personajes:", err);
        setLoading(false);
      });
  }, []);

  // C - CREATE
  const handleCreate = (newChar) => {
    setCharacters([newChar, ...characters]);
  };

  // U - UPDATE
  const handleUpdate = (id) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre del personaje:");
    if (!nuevoNombre) return;

    const listaEditada = characters.map(char =>
      char.id === id ? { ...char, name: nuevoNombre } : char
    );
    setCharacters(listaEditada);
  };

  // D - DELETE
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este personaje?")) {
      setCharacters(characters.filter(char => char.id !== id));
    }
  };

  return (
    <div>
      <CharacterForm onCreate={handleCreate} />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Cargando...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {characters.map(char => (
            <CharacterCard
              key={char.id}
              character={char}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {!loading && characters.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No hay personajes. Añade uno con el formulario.
        </p>
      )}
    </div>
  );
};

export default CharactersView;
