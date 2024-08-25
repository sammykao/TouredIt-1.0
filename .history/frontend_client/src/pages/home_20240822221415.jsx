import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import FindMatch from "./homeHelper/find-match";
import { testimonials, TestimonialCard } from "./homeHelper/testimonialCard";
import SchoolCarousel from "./homeHelper/collegeCarousel";
import SchoolIcon from '@mui/icons-material/School';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export function Home() {

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
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
        <div className="mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
               Discover your campus, make it yours
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              Get ahead of the crowd by scheduling 1-on-1 personalized custom college tours. Your campus, your tours, your conections.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a href="/why-touredit" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <FindMatch />

        {/* How It Works Section */}
        <section className="py-12 rounded-xl">
          <div className="container mx-auto">
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mb-10 text-4xl font-bold"
            >
              How It Works
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              
              <div className="p-6 bg-blue-200 text-white rounded-lg shadow-lg">
                <SchoolIcon className="text-5xl mb-4 mx-auto" />
                <Typography variant="h5" className="font-bold">
                  Step 1: Choose Your College
                </Typography>
                <Typography className="mt-2">
                  Select the college you're interested in visiting.
                </Typography>
              </div>

              <div className="p-6 bg-indigo-400 text-white rounded-lg shadow-lg">
                <PersonSearchIcon className="text-5xl mb-4 mx-auto" />
                <Typography variant="h5" className="font-bold">
                  Step 2: Find a Guide
                </Typography>
                <Typography className="mt-2">
                  Choose or Get Matched with a student who will show you around.
                </Typography>
              </div>

              <div className="p-6 bg-blue-900 text-white rounded-lg shadow-lg">
                <EventAvailableIcon className="text-5xl mb-4 mx-auto" />
                <Typography variant="h5" className="font-bold">
                  Step 3: Schedule Your Tour
                </Typography>
                <Typography className="mt-2">
                  Set a date and time that works for you and your guide.
                </Typography>
              </div>
            </div>
          </div>
        </section>

        <SchoolCarousel />

        <section className="px-8 pb-8">
          <div className="container mx-auto">
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 !text-2xl lg:!text-4xl text-center"
            >
              What our Customers are Saying
            </Typography>
            <Typography
              className="mb-8 text-black !text-l lg:!text-xl text-center"
            >
              Don't just listen to us. Listen to our clients!
            </Typography>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              {testimonials.map((props, key) => (
                <TestimonialCard key={key} {...props} />
              ))}
            </div>

            <Card
              shadow={false}
              className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
            >
              <CardHeader color="transparent" floated={false} shadow={false}>
                <Typography
                  color="blue-gray"
                  className="mb-4 !text-lg lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
                >
                  &quot;Thank you so much for connecting us with Theo. He gave us some great insight
                  of what life is like as en Economics major at USC!&quot;
                </Typography>
              </CardHeader>
              <CardBody className="items-center mx-auto py-4">
                <img
                  src="https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+Southern+California_logo.jpg"
                  className="rounded-md max-w-[8rem] mx-auto my-2"
                  alt="University of Southern California"
                />
                <Typography variant="h6" color="blue-gray">
                  Robert Taylor
                </Typography>
                <Typography
                  variant="paragraph"
                  className="font-normal !text-gray-900"
                >
                  Parent of student touring USC
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/find-match"
                className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Try It Out <span aria-hidden="true">→</span>
              </a>
            </div>
        </section>
        <div
          className="absolute inset-x-0 top-[calc(100%-80rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-80rem)]"
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

export default Home;
