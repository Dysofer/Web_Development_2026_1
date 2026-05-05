import React, { useState } from 'react';

const CharacterForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Human");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Objeto que simula la respuesta de la API
    const newChar = {
      id: Date.now(),
      name: name,
      status: "Alive",
      species: species,
      image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
    };

    onCreate(newChar);
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
    >
      <input
        type="text"
        placeholder="Nombre del nuevo personaje..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '12px', flex: '2 1 200px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        style={{ padding: '12px', flex: '1 1 120px', borderRadius: '8px', border: '1px solid #ccc' }}
      >
        <option value="Human">Humano</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
        <option value="Humanoid">Humanoide</option>
      </select>
      <button
        type="submit"
        style={{ padding: '12px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Añadir (Create)
      </button>
    </form>
  );
};

export default CharacterForm;
