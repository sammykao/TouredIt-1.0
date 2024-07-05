import { Textarea, Input, Typography, Button } from "@material-tailwind/react";


export function ContactUs() {
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
                Contact Us
                </h1>
                <p className="mt-6 text-lg leading-8 text-black">
                Want to reach out? Contact us through this form
                </p>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
                <form
                    action="#"
                    className="flex flex-col gap-4 lg:max-w-sm"
                >
                    <Typography
                    variant="small"
                    className="text-left !font-semibold !text-gray-600"
                    >
                    Select Options for Business Engagement
                    </Typography>
                    <div className="flex gap-4">
                    <Button variant="outlined" className="max-w-fit">
                        General inquiry
                    </Button>
                    <Button variant="outlined" className="max-w-fit">
                        Product Support
                    </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                        >
                        First Name
                        </Typography>
                        <Input
                        color="gray"
                        size="lg"
                        placeholder="First Name"
                        name="first-name"
                        className="focus:border-t-gray-900"
                        containerProps={{
                            className: "min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                        />
                    </div>
                    <div>
                        <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                        >
                        Last Name
                        </Typography>
                        <Input
                        color="gray"
                        size="lg"
                        placeholder="Last Name"
                        name="last-name"
                        className="focus:border-t-gray-900"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }}
                        />
                    </div>
                    </div>
                    <div>
                    <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                    >
                        Your Email
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        placeholder="name@email.com"
                        name="email"
                        className="focus:border-t-gray-900"
                        containerProps={{
                        className: "!min-w-full",
                        }}
                        labelProps={{
                        className: "hidden",
                        }}
                    />
                    </div>
                    <div>
                    <Typography
                        variant="small"
                        className="mb-2 text-left font-medium !text-gray-900"
                    >
                        Your Message
                    </Typography>
                    <Textarea
                        rows={6}
                        color="gray"
                        placeholder="Message"
                        name="message"
                        className="focus:border-t-gray-900"
                        containerProps={{
                        className: "!min-w-full",
                        }}
                        labelProps={{
                        className: "hidden",
                        }}
                    />
                    </div>
                    <Button className="w-full" color="gray">
                    Send message
                    </Button>
                </form>
            </div>
            </div>
        </div>
    </>
  );
}

export default ContactUs;
