import React, { useState, useEffect } from 'react';
import LocationForm from './LocationForm';
import LocationCard from './LocationCard';

const LocationsView = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // R - READ
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/location")
      .then(res => res.json())
      .then(data => {
        setLocations(data.results.slice(0, 8));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando ubicaciones:", err);
        setLoading(false);
      });
  }, []);

  // C - CREATE
  const handleCreate = (newLocation) => {
    setLocations([newLocation, ...locations]);
  };

  // U - UPDATE
  const handleUpdate = (id) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre de la ubicación:");
    if (!nuevoNombre) return;

    const listaEditada = locations.map(loc =>
      loc.id === id ? { ...loc, name: nuevoNombre } : loc
    );
    setLocations(listaEditada);
  };

  // D - DELETE
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta ubicación?")) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  return (
    <div>
      <LocationForm onCreate={handleCreate} />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Cargando...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {locations.map(loc => (
            <LocationCard
              key={loc.id}
              location={loc}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {!loading && locations.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No hay ubicaciones. Crea una nueva.
        </p>
      )}
    </div>
  );
};

export default LocationsView;
