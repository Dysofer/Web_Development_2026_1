import React from 'react';

const EpisodeCard = ({ episode, onDelete, onUpdate }) => {
  const charactersCount = Array.isArray(episode.characters) ? episode.characters.length : 0;
  const season = episode.episode ? episode.episode.substring(0, 3) : 'S??';

  const labelStyle = {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#999',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '4px'
  };

  const valueStyle = {
    fontSize: '0.95rem',
    color: '#222',
    margin: 0
  };

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '10px',
      padding: '20px',
      background: '#fff',
      position: 'relative'
    }}>
      {/* Etiqueta de temporada arriba a la derecha */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: '#111',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.5px'
      }}>
        {season}
      </div>

      <div style={{
        fontSize: '0.75rem',
        color: '#999',
        fontWeight: 600,
        letterSpacing: '1px',
        marginBottom: '8px'
      }}>
        {episode.episode || 'S??E??'}
      </div>

      <h3 style={{ margin: '0 0 16px 0', color: '#111', fontSize: '1.1rem', paddingRight: '40px' }}>
        {episode.name}
      </h3>

      <div style={{ marginBottom: '12px' }}>
        <div style={labelStyle}>Emisión</div>
        <p style={valueStyle}>{episode.air_date || 'Fecha desconocida'}</p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={labelStyle}>Personajes</div>
        <p style={valueStyle}>{charactersCount}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onUpdate(episode.id)}
          style={{ background: '#fff', border: '1px solid #ddd', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#333' }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(episode.id)}
          style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default EpisodeCard;
