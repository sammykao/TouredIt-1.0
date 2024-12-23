import { useState, useEffect, useRef } from 'react';
import TripMap from "@/pages/"

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

export function BuildTrip() {
  const [locations, setLocations] = useState([]);
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

  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div
          className="absolute inset-x-0 top-[calc(100%-100rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-100rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BuildTrip;
