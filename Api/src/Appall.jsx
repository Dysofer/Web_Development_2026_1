import React, { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // Nuevo estado para el Select
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // La API de Rick & Morty devuelve un objeto con una propiedad 'results' que es el array
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando API:", err);
        setLoading(false);
      });
  }, []);

  // Lógica de filtrado combinada (Nombre + Estatus)
  const filtered = characters.filter(char => {
    const matchName = char.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "" || char.status === status;
    return matchName && matchStatus;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#00b5cc' }}>Rick & Morty Explorer</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {/* Filtro por Nombre */}
        <input
          type="text"
          placeholder="Buscar personaje..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* Filtro por Estatus (Select *) */}
        <select 
          onChange={(e) => setStatus(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">Todos los estados</option>
          <option value="Alive">Vivos</option>
          <option value="Dead">Muertos</option>
          <option value="unknown">Desconocidos</option>
        </select>
      </div>

      {loading ? (
        <h2 style={{ textAlign: 'center' }}>Cargando desde la Ciudadela...</h2>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map(char => (
            <div key={char.id} style={{
              border: '1px solid #eee',
              borderRadius: '15px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <img src={char.image} alt={char.name} style={{ width: '100%' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{char.name}</h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  backgroundColor: char.status === 'Alive' ? '#d4edda' : char.status === 'Dead' ? '#f8d7da' : '#fff3cd',
                  color: '#333'
                }}>
                  {char.status} - {char.species}
                </span>
                <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#666' }}>
                  Última ubicación:<br/>
                  <strong>{char.location.name}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p style={{ textAlign: 'center' }}>No hay personajes que coincidan con tu búsqueda.</p>
      )}
    </div>
  );
}

export default App;