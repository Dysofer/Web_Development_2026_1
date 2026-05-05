import React, { useState, useEffect } from 'react';
import EpisodeForm from './EpisodeForm';
import EpisodeCard from './EpisodeCard';

const EpisodesView = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // R - READ
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.results.slice(0, 8));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando episodios:", err);
        setLoading(false);
      });
  }, []);

  // C - CREATE
  const handleCreate = (newEpisode) => {
    setEpisodes([newEpisode, ...episodes]);
  };

  // U - UPDATE
  const handleUpdate = (id) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre del episodio:");
    if (!nuevoNombre) return;

    const listaEditada = episodes.map(ep =>
      ep.id === id ? { ...ep, name: nuevoNombre } : ep
    );
    setEpisodes(listaEditada);
  };

  // D - DELETE
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este episodio?")) {
      setEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  return (
    <div>
      <EpisodeForm onCreate={handleCreate} />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Cargando...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {episodes.map(ep => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {!loading && episodes.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No hay episodios. Añade el primero.
        </p>
      )}
    </div>
  );
};

export default EpisodesView;
