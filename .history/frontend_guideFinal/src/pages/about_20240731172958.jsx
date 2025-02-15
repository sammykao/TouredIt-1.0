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

export function About() {
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div
          className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="relative isolate overflow-hidden mt-40 bg-gray-900 py-24 rounded-xl sm:py-32">
            <img
                alt=""
                src="https://images.unsplash.com/photo-1647866873870-92d45763ef44?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <div
                aria-hidden="true"
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
                <div
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
                <div
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Join TouredIt</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                    Join TouredIt and start giving tours of your campus. We provide clients with personalized 1-on-1 tours of college campuses.
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                    {links.map((link) => (
                    <a key={link.name} href={link.href}>
                        {link.name} <span aria-hidden="true">&rarr;</span>
                    </a>
                    ))}
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                    <div key={stat.name} className="flex flex-col-reverse">
                        <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                        <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
        </div>
        <section className="lg:py-28 py-10 px-8">
            <div className="container mx-auto mb-10 text-center lg:mb-20">
                <Typography
                color="blue-gray"
                className="mb-2 font-bold uppercase"
                >
                Learn More
                </Typography>
                <Typography
                color="blue-gray"
                className="mb-4 !text-2xl font-bold lg:!text-4xl"
                >
                How it Works
                </Typography>
                <Typography
                variant="lead"
                className="mx-auto max-w-lg !text-gray-500"
                >
                Here's how we provide you with the opportunity to show off your campus
                </Typography>
            </div>
            <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
                <Card
                className="col-span-1 bg-gray-300 overflow-hidden"
                shadow={false}
                >
                <CardBody className="text-center">
                    <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Clients submit requests
                    </Typography>
                    <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-600">
                    A client will submit a request to our team about the school the want to tour with 
                    and what persona profile they would ideally like a tour from.
                    </Typography>
                    <img
                    src="/image/iphone.svg"
                    alt="iphone"
                    className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center"
                    />
                </CardBody>
                </Card>
                <Card
                className="col-span-2 bg-gray-300 overflow-hidden"
                shadow={false}
                >
                <CardBody className="text-center">
                    <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Clients choose guides
                    </Typography>
                    <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
                    Clients will choose spec.
                    </Typography>
                    <img
                    src="/image/laptop 1.svg"
                    alt="laptop"
                    className="w-full lg:h-[380px] md:h-[300px] h-[220px] lg:translate-y-16 translate-y-10 object-cover object-center"
                    />
                </CardBody>
                </Card>
            </div>
            <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
                <Card
                className="col-span-2 bg-gray-300 overflow-hidden"
                shadow={false}
                >
                <CardBody className="text-center">
                    <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Digital Product Design
                    </Typography>
                    <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500">
                    Check out our proven methods, guides, and exercises that help make
                    work better, and people happier.
                    </Typography>
                    <img
                    src="/image/logo-collection.svg"
                    alt="laptop"
                    className="w-full xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-cover object-top"
                    />
                </CardBody>
                </Card>
                <Card className="col-span-1 bg-gray-300" shadow={false}>
                <CardBody className="text-center">
                    <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Join Our Community
                    </Typography>
                    <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
                    The time is now for it to be okay to be great. For being a bright
                    color.
                    </Typography>
                    <div className="flex items-center -space-x-4 justify-center mt-24">
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="user 2"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                    />
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="user 3"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                    />
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="user 4"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                    />
                    </div>
                    <div className="flex justify-between items-end mt-[144px]">
                    <div className="flex gap-2">
                        <img
                        src="https://www.material-tailwind.com/image/mt-logo.svg"
                        alt="logo"
                        />
                        <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="mr-4 text-xs font-bold cursor-pointer"
                        >
                        
                        </Typography>
                    </div>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="text-xs font-bold cursor-pointer"
                    >
                        material-tailwind.com
                    </Typography>
                    </div>
                </CardBody>
                </Card>
            </div>
        </section>
      </div>
    </>
  );
}

export default About;
