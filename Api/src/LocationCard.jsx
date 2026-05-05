import React from 'react';

const LocationCard = ({ location, onDelete, onUpdate }) => {
  const typeColor = {
    Planet:           '#1e88e5',
    Cluster:          '#8e24aa',
    Microverse:       '#fb8c00',
    'Space station':  '#00897b',
    Dimension:        '#d81b60'
  }[location.type] || '#546e7a';

  const residentsCount = Array.isArray(location.residents) ? location.residents.length : 0;

  // Estilo reutilizable para las etiquetas pequeñas en mayúsculas
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
      borderLeft: `3px solid ${typeColor}`
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#111', fontSize: '1.1rem' }}>
        {location.name}
      </h3>

      <span style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 600,
        background: typeColor,
        color: 'white',
        marginBottom: '16px'
      }}>
        {location.type || 'Desconocido'}
      </span>

      <div style={{ marginBottom: '12px' }}>
        <div style={labelStyle}>Dimensión</div>
        <p style={valueStyle}>{location.dimension || 'unknown'}</p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={labelStyle}>Residentes</div>
        <p style={valueStyle}>{residentsCount}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onUpdate(location.id)}
          style={{ background: '#fff', border: '1px solid #ddd', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#333' }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(location.id)}
          style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
