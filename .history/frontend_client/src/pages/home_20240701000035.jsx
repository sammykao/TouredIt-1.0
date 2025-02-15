import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";


Info: string;
}

function TestimonialCard({
  img,
  client,
  title,
  clientInfo,
}: TestimonialCardPropsType) {
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="lg:mb-20 mb-4 text-2xl font-bold"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-500"
          >
            {clientInfo}
          </Typography>
        </div>
        <img src={img} className="max-w-[8rem]" alt={client} />
      </CardBody>
    </Card>
  );
}
const testimonials = [
  {
    title:
      "The team went above and beyond to ensure my issue was resolved quickly and efficiently. Truly outstanding!",
    client: "Jessica Devis",
    clientInfo: "Full Stack Developer @Netflix",
    img: "/image/netflix.svg",
  },
  {
    title:
      "It have broadened my horizons and helped me advance my career. The community is incredibly supportive.",
    client: "Marcell Glock",
    clientInfo: "Graphic Designer, @Coinbase",
    img: "/image/Logo-coinbase.svg",
  },
];


export function Home() {
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen bg-gray-500">
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
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
               Discover your campus, forge connections
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              Get ahead of the crowd by scheduling 1-on-1 personalized college tours or by calling current students. Your campus, your tours, your conections.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/find-match"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="/why-touredit" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-45rem)]"
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
        <section className="px-8 py-10 lg:py-28">
          <div className="container mx-auto">
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 !text-2xl lg:!text-4xl"
            >
              The heartfelt testimonials of our community
            </Typography>
            <Typography
              variant="lead"
              className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
            >
              From life-enhancing gadgets to unparalleled customer support, and
              transformative learning opportunities.
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
                  className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
                >
                  &quot;Its intuitive design and powerful features make it
                  indispensable. I can&apos;t imagine going back to life before
                  it!&quot;
                </Typography>
              </CardHeader>
              <CardBody className="items-center mx-auto py-2">
                <img
                  src="/image/spotify.svg"
                  className="max-w-[8rem] mx-auto grayscale"
                  alt="spotify"
                />
                <Typography variant="h6" color="blue-gray">
                  Emma Roberts
                </Typography>
                <Typography
                  variant="paragraph"
                  className="font-normal !text-gray-500"
                >
                  Chief Executive @Spotify
                </Typography>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;