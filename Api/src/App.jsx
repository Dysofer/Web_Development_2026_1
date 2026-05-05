import React, { useState } from 'react';
import CharactersView from './CharactersView';
import LocationsView from './LocationsView';
import EpisodesView from './EpisodesView';

function App() {
  const [activeTab, setActiveTab] = useState('characters');

  const tabs = [
    { id: 'characters', label: 'Personajes' },
    { id: 'locations',  label: 'Ubicaciones' },
    { id: 'episodes',   label: 'Episodios' }
  ];

  const tabStyle = (isActive) => ({
    padding: '14px 24px',
    border: 'none',
    background: 'transparent',
    color: isActive ? '#111' : '#888',
    fontWeight: isActive ? 600 : 400,
    cursor: 'pointer',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
    borderBottom: isActive ? '2px solid #111' : '2px solid transparent',
    marginBottom: '-2px',
    transition: 'color 0.15s'
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#111',
          letterSpacing: '-0.5px'
        }}>
          Rick &amp; Morty
        </h1>
        <p style={{
          color: '#888',
          marginTop: '4px',
          marginBottom: '32px',
          fontSize: '0.95rem'
        }}>
          Personajes, ubicaciones y episodios
        </p>

        {/* Pestañas */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #eee',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={tabStyle(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'characters' && <CharactersView />}
        {activeTab === 'locations'  && <LocationsView />}
        {activeTab === 'episodes'   && <EpisodesView />}
      </div>
    </div>
  );
}

export default App;
