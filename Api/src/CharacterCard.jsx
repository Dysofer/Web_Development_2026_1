import React from 'react';

const CharacterCard = ({ character, onDelete, onUpdate }) => {
  const statusColor =
    character.status === 'Alive' ? '#28a745' :
    character.status === 'Dead'  ? '#dc3545' : '#6c757d';

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '10px',
      padding: '15px',
      background: '#fff',
      textAlign: 'left'
    }}>
      <img
        src={character.image}
        alt={character.name}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '12px', display: 'block' }}
      />

      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#111' }}>
        {character.name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: statusColor,
          display: 'inline-block'
        }} />
        <span style={{ fontSize: '0.85rem', color: '#666' }}>
          {character.status} · {character.species}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onUpdate(character.id)}
          style={{ background: '#fff', border: '1px solid #ddd', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#333' }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(character.id)}
          style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
