import React, { useState } from 'react';

const LocationForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Planet");
  const [dimension, setDimension] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newLocation = {
      id: Date.now(),
      name: name,
      type: type,
      dimension: dimension || "Dimensión desconocida",
      residents: []
    };

    onCreate(newLocation);
    setName("");
    setDimension("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
    >
      <input
        type="text"
        placeholder="Nombre de la ubicación..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '12px', flex: '2 1 200px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ padding: '12px', flex: '1 1 120px', borderRadius: '8px', border: '1px solid #ccc' }}
      >
        <option value="Planet">Planeta</option>
        <option value="Cluster">Cluster</option>
        <option value="Microverse">Microverso</option>
        <option value="Space station">Estación espacial</option>
        <option value="Dimension">Dimensión</option>
      </select>
      <input
        type="text"
        placeholder="Dimensión"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
        style={{ padding: '12px', flex: '1 1 150px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '12px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Añadir (Create)
      </button>
    </form>
  );
};

export default LocationForm;
