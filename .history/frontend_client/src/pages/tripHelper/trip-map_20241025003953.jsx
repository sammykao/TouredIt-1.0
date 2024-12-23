import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet

// Function to convert FlagIcon to an HTML string
function flagIconToHtml() {
  const iconString = `<div style="display: flex; justify-content: center; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clip-rule="evenodd" />
                        </svg>
                      </div>`;
  return iconString;
}

// Create the Leaflet divIcon with the Heroicons FlagIcon
function createCustomIcon() {
  return L.divIcon({
    html: flagIconToHtml(),
    className: '', // No extra classes for the icon wrapper
    iconSize: [30, 30], // Size of the custom icon
    iconAnchor: [15, 30], // Anchor point for the icon
    popupAnchor: [0, -30], // Popup location relative to the icon
  });
}

// Custom hook to adjust the map bounds based on markers
const SetBoundsToMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lon]));
      map.fitBounds(bounds); // Adjust map to fit all markers
    }
  }, [locations, map]);

  return null;
};

const TripMap = ({ schools, setIsLoading }) => {
  const [locations, setLocations] = useState([]);
  const markerRefs = useRef([]);

  const getCoordinates = async (places) => {
    const coords = await Promise.all(
      places.map(async ([school, date]) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${school}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          return { name: school, date, lat: parseFloat(lat), lon: parseFloat(lon) };
        } else {
          console.error(`Coordinates not found for ${school}`);
          return null;
        }
      })
    );
    const filteredCoords = coords.filter(Boolean);
    setLocations(filteredCoords);
    setIsLoading
  };

  useEffect(() => {
    if (schools && schools.length > 0) {
      getCoordinates(schools);
    }
  }, [schools]);

  return (
    <div
      className="mx-auto"
      style={{
        height: '100vh', // Full viewport height for mobile responsiveness
        width: '100%',
        maxHeight: '600px', // Set a max height for desktop views
        border: '4px solid #0a49a8',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={[0, 0]} // Temporary center before fitting bounds
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        scrollWheelZoom={false} // Disable scroll zoom for mobile experience
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={[location.lat, location.lon]}
            icon={createCustomIcon()}
            ref={(el) => (markerRefs.current[idx] = el)}
          >
            <Popup>
              <strong>{location.name}</strong> <br />
              Date Range: {location.start_date} to {location.end_date}
            </Popup>
          </Marker>
        ))}

        {/* Automatically adjust the bounds based on markers */}
        <SetBoundsToMarkers locations={locations} />
      </MapContainer>
    </div>
  );
};

export default TripMap;
