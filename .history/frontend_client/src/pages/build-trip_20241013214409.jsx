import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';

async function getCoordinates(place) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error("Location not found");
    }
  }
  This function sends a request to Nominatim with a place name (place), and it returns the first result with its latitude and longitude.
  
  Step 3: Display Markers on the Leaflet Map
  Now, use the coordinates returned by the geocoding function to display markers on a Leaflet map. Here's a full example that fetches coordinates for places like "Boston University" and "Princeton University" and displays them on the map.
  
  Full Example in React
  jsx
  Copy code
  import React, { useState, useEffect } from 'react';
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  
  function CollegeTourMap() {
    const [locations, setLocations] = useState([]);
  
    // Function to get coordinates using Nominatim and update state
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
  
    return (
      <MapContainer center={[42.35, -71.105]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
  
        {locations.map((location, idx) => (
          <Marker key={idx} position={[location.lat, location.lon]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
  
  export default CollegeTourMap;

export function BuildTrip() {
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
        <div class="py-24 mt-12 sm:py-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
              <h2 class="text-base font-semibold leading-7 text-blue-900">Why TouredIt? </h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Personalize your college search</p>
              <p class="mt-6 text-lg leading-8 text-gray-800">Choosing where you want to attend school is harder than it has ever been. 
              Students are not getting the information they need on campus visits to make well-informed decisions about their future. 
              Today, students need to fully immerse themselves in the college they hope to attend before their freshman year to make 
              the best decision. Here's how TouredIt helps students visualize their college experience:
              </p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-g h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>

                    </div>
                    1-on-1 On-Campus Tours
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-800">Personalize your college tour by hand-picking your guide. 
                  Touring campus with a guide who shares your interests provides a better picture of what your first year 
                  at school could look like.
                  </dd>
                </div>
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>

                    </div>
                    A Connection to Success
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-800">TouredIt tour guides aren't just tour guides — they are 
                  your future classmates. This means you'll have someone on campus to help with class selection, 
                  dorm choices, and any other advice you might need.
                  </dd>
                </div>
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>

                    </div>
                    1-on-1 Student Video Chats
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-800">
                    Connect with a guide who shares your interests through a personalized 
                    video chat. Gain valuable insights into campus life and what your first 
                    year could feel like—all from the comfort of home.
                  </dd>
                </div>
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>

      
                    </div>
                    Insights to the Application Process
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-800">On your call or tour, learn more about the application process and what the student did to get in the school.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <Newsletter/>
        <div className="bg-gray-500 py-12 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-800">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="rounded-2xl relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
          
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-indigo-600">Our Recommendation</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Getting the Most Out of Your Tour</h1>
                  <p className="mt-6 text-xl leading-8 text-gray-900">
                  To get the most value out of your tour, we advise to ask as many questions as possible. 
                  Don't hold back! The time is yours and the guide is meant to serve all your pre-college needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                className="w-[24rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[42rem]"
                src="./../../public/img/about.jpg"
                alt=""
              />
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-850 lg:max-w-lg">
                  <p>
                  Feel free to ask non-traditional questions during your tour. We want your experience to be unique and engaging, 
                  not cookie-cutter or bland. We also encourage you to establish a professional or social connection with your guide. 
                  Whether it's exchanging social media handles or connecting on LinkedIn, there are countless benefits to building that 
                  connection.
                  </p>
                  <ul role="list" className="mt-8 space-y-8 text-gray-700">
                    <li className="flex gap-x-3">
                      <BriefcaseIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-gray-900">Potential future internship referrals.</strong> Use that connection to ask for referrals in the future! No promises though.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <UserPlusIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-gray-900">Navigate the social scene.</strong> Your guide can be another friend on campus. They can give you inisghts and help you navigate the school socially.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-gray-900">Learn how to maximize your experience.</strong> Your guide can give you insights on what classes to take, the best dorms, 
                        and how to get started recruiting for an internship.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-8">
                    We're beating the traditional college admission tour, while giving you a school and connection for life.
                  </p>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Don't see a guide? No problem.</h2>
                  <p className="mt-6">
                    If there's no guide or no match you like on the website, reach out and we'll personally pair you with the perfect match.
                    Our guide network is big and constantly expanding, but sometimes there's availability issues or niche interests. We get it!
                    We'll reach out in a few days and send you potential options to tour with.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/find-match"
                className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Try It Out <span aria-hidden="true">→</span>
              </a>
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