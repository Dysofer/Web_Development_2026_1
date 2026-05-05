import React, { useState } from 'react';

const EpisodeForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [airDate, setAirDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEpisode = {
      id: Date.now(),
      name: name,
      episode: code || "S00E00",
      air_date: airDate || "Sin fecha",
      characters: []
    };

    onCreate(newEpisode);
    setName("");
    setCode("");
    setAirDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
    >
      <input
        type="text"
        placeholder="Nombre del episodio..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '12px', flex: '2 1 200px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Código (S01E01)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: '12px', flex: '1 1 100px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Fecha de emisión"
        value={airDate}
        onChange={(e) => setAirDate(e.target.value)}
        style={{ padding: '12px', flex: '1 1 130px', borderRadius: '8px', border: '1px solid #ccc' }}
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

export default EpisodeForm;
