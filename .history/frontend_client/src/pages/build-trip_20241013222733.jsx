import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet for custom icons
import 'leaflet/dist/leaflet.css';
import { FlagIcon } from '@heroicons/react/24/solid'



export function BuildTrip() {

    const [locations, setLocations] = useState([]);
    const markerRefs = useRef([]);

    const getCoordinates = async (places) => {
        const coords = await Promise.all(
        places.map(async (place) => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
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
        getCoordinates(["Boston University", "Princeton University"]);
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
          className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
        <div className="mt-40">
          <div className="mx-auto" style={{ height: "600px", width: "80%", border: "4px solid #0a49a8", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", borderRadius: "12px", overflow: "hidden" }}>
            <MapContainer center={[42.35, -71.105]} zoom={6} style={{ height: "100%", width: "100%" }} attributionControl={false}>
              {/* Using CartoDB Positron tiles for a different map background */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
      
              {locations.map((location, idx) => (
              <Marker
                  key={idx}
                  position={[location.lat, location.lon]}
                  icon={thumbtackIcon} // Set the custom pin icon
                  ref={(el) => (markerRefs.current[idx] = el)} // Store reference to marker
              >
                  <Popup>{location.name}</Popup>
              </Marker>
              ))}
            </MapContainer>
          </div>
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
