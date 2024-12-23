import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet

// Function to convert FlagIcon to an HTML string
function flagIconToHtml() {
  // Render the Heroicons FlagIcon SVG as an HTML string
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


const TripMap = () => {
    onst [locations, setLocations] = useState([]);
  const markerRefs = useRef([]);

  const getCoordinates = async (places) => {
    const coords = await Promise.all(
      places.map(async (place) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          return { name: place, lat: parseFloat(lat), lon: parseFloat(lon) };
        } else {
          console.error(`Coordinates not found for ${place}`);
          return null;
        }
      })
    );
    setLocations(coords.filter(Boolean)); // Filter out null results
  };

  useEffect(() => {
    // Fetch coordinates for Boston University and Princeton University
    getCoordinates(['Boston University', 'Princeton University']);
  }, []);

  // Open popups when the markers are rendered
  useEffect(() => {
    markerRefs.current.forEach((markerRef) => {
      if (markerRef) {
        markerRef.openPopup(); // Open the popup for each marker
      }
    });
  }, [locations]);


};

export default TripMap;