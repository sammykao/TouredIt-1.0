import React from "react";


import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

const links = [
    { name: 'Sign Up', href: '/guide-sign-up' },
]
const stats = [
    { name: 'Guides in our system', value: '1,000+' },
    { name: 'Colleges we offer', value: '1,200+' },
    { name: 'Tours completed by guides', value: '1,000+' },
    { name: 'You decide what tours you want to give', value: 'Your Schedule' },
]

export function Home() {
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div
          className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Tour guides create the experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              We empower students from campus' across the country to provide personalized tours. Please consider 
              joining our network of passionate guides and start earning <strong>$$$</strong>.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <img
              src="./../../public/img/guide_portal_ex.png"
              alt="Tour Guide"
              className="sm:max-w-md lg:max-w-4xl rounded-lg"
            />
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/sign-up"
                className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started <span aria-hidden="true">→</span>
              </a>
        </div>
        
      </div>
    </>
  );
}

export default Home;
