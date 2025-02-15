import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function About() {
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
              joining our network of passionate guides and starting earning <strong>$$$</strong>.
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
      </div>
    </>
  );
}

export default About;
