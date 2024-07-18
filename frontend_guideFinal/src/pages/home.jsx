import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";


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
               Discover your campus, forge connections
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              Get ahead of the crowd by scheduling 1-on-1 personalized college tours or by calling current students. Your campus, your tours, your conections.
            </p>
            
          </div>
        </div>
        

      </div>
    </>
  );
}

export default Home;