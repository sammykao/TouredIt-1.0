import React, { useEffect, useState } from 'react';
// import './App.css'

function App() {

  return (
    <div>
      <h1>List of Schools (IDs 1-5)</h1>
      {backendData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {backendData.map((school) => (
            <li key={school.id}>
              <img src={school.logo_url} alt={school.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div>
                <h2>{school.name}</h2>
                <p><strong>Location:</strong> {school.location}</p>
                <p><strong>Type:</strong> {school.type}</p>
                <p><strong>Undergraduate Population:</strong> {school.undergraduate_population}</p>
                <p><strong>In-State Tuition:</strong> {school.instate_tuition}</p>
                <p><strong>Out-of-State Tuition:</strong> {school.outstate_tuition}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;