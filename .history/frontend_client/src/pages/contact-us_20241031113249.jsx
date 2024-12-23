import { Textarea, Input, Typography, Button } from "@material-tailwind/react";
import { useState } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga4';

export function ContactUs() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });

    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true); // Start loading animation

        try {
            await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendMail', formData);
            setMessage('Thank you for reaching out! Your message has been successfully submitted. \
                We appreciate your interest and will get back to you within 24 hours. <br /> In the meantime, feel \
                free to explore <a href="/why-touredit" class="text-blue-800"><u> our services </u></a>. Have a great day!');
        } catch (error) {
            console.error('Error sending message:', error);
            setMessage('There was an error sending your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }

        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
                <div
                    className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Contact Us
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-black">
                            Want to reach out? Contact us through this form.
                        </p>
                    </div>
                    {message && (
                        <div className="mb-6 text-center text-blue" dangerouslySetInnerHTML={{ __html: message }} />
                    )}
                    <form
                        action="#"
                        className="flex flex-col gap-4 lg:max-w-md w-full p-6 bg-white rounded-lg shadow-lg"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    className="mb-4 text-left font-medium !text-gray-900"
                                >
                                    First Name
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="First Name"
                                    name="first_name"
                                    className="focus:border-t-black"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                                {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
                            </div>
                            <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    className="mb-4 text-left font-medium !text-gray-900"
                                >
                                    Last Name
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="Last Name"
                                    name="last_name"
                                    className="focus:border-t-black"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                                {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Typography
                                variant="small"
                                className="mb-4 text-left font-medium !text-gray-900"
                            >
                                Your Email
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="name@email.com"
                                name="email"
                                className="focus:border-t-black"
                                value={formData.email}
                                onChange={handleChange}
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col">
                            <Typography
                                variant="small"
                                className="mb-4 text-left font-medium !text-gray-900"
                            >
                                Your Message
                            </Typography>
                            <Textarea
                                rows={6}
                                color="gray"
                                placeholder="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="focus:border-t-black"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                            {errors.message && <span className="text-red-500">{errors.message}</span>}
                        </div>

                        {/* Button or Loading Spinner */}
                        {!isSubmitting ? (
                            <Button type="submit" className="w-full" color="gray">
                                Send message
                            </Button>
                        ) : (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-600 border-solid"></div>
                                <Typography className="ml-2 text-gray-600">Submitting...</Typography>
                            </div>
                        )}
                    </form>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-60rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]"
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

export default ContactUs;
