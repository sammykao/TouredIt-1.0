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



function TestimonialCard({
  img,
  client,
  title,
  clientInfo,
}) {
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="lg:mb-20 mb-4 text-lg lg:text-2xl font-bold"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-4 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-900"
          >
            {clientInfo}
          </Typography>
        </div>
        <img src={img} className="max-w-[8rem] max-h-[6rem] rounded-md" alt={client} />
      </CardBody>
    </Card>
  );
}
const testimonials = [
  {
    title:
      "What an adorable kind knowledgeable kid! Thank you so much!! That tour was amazing! \
      Please thank Cameron for us!",
    client: "Tracy Garozzo",
    clientInfo: "Parent of student touring Georgia Tech & Duke",
    img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Georgia+Institute+of+Technology_logo.jpg",
  },
  {
    title:
      "What an adorable kind knowledgeable kid! Thank you so much!! That tour was amazing! \
      Please thank Cameron for us!",
    client: "Tiffany Trigg (UCLA):",
    clientInfo: "Parent of student touring UCLA",
    img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+California+Los+Angeles_logo.jpg",
  },
  {
    title:
      "What an adorable kind knowledgeable kid! Thank you so much!! That tour was amazing! \
      Please thank Cameron for us!",
    client: "Tracy Garozzo",
    clientInfo: "Parent, Toured Georgia Tech & Duke",
    img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Georgia+Institute+of+Technology_logo.jpg",
  },
  {
    title:
      "What an adorable kind knowledgeable kid! Thank you so much!! That tour was amazing! \
      Please thank Cameron for us!",
    client: "Tracy Garozzo",
    clientInfo: "Parent, Toured Georgia Tech & Duke",
    img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Georgia+Institute+of+Technology_logo.jpg",
  },
  {
    title:
      "The tour was very helpful. We were able to get to pretty much all of the \
      campus and I feel like I got a really great sense of the school - JJ provided \
      great insights as well. Thanks for helping organize this!",
    client: "Shelby Garbis",
    clientInfo: "Parent, Toured Emory",
    img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Emory+University_logo.jpg",
  },
];


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
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="/why-touredit" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
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
                  alt="spotify"
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