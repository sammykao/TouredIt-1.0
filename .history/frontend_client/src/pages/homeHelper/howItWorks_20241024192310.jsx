import {
    Typography,
} from "@material-tailwind/react";

import SchoolIcon from '@mui/icons-material/School';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';


export const HowItWorks = () => {
    return (
        <section className="py-12 rounded-xl mt-12 mb-16">
            <div className="container mx-auto">
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="text-center mb-10 text-4xl font-bold"
                >
                    How It Works
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                    <style jsx>{`
                        @keyframes gradient-border {
                        0% {
                            background-position: 0% 50%;
                        }
                        100% {
                            background-position: 100% 50%;
                        }
                        }

                        .gradient-border {
                        position: relative;
                        padding: 4px;
                        border-radius: 8px; /* Rounded corners */
                        background: linear-gradient(270deg, #f5fafa, #1c1f1f, #f5fafa);
                        background-size: 800% 200%; /* This makes the gradient large enough to animate */
                        animation: gradient-border 7s linear infinite alternate; /* Animation for moving gradient */
                        }

                        .gradient-border::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: -1;
                        border-radius: 8px;
                        background-color: white; /* Inner content background */
                        background-clip: padding-box;
                        }
                    `}</style>
                    <div className="gradient-border">
                        <div className="p-6 bg-blue-400 text-white rounded-lg shadow-lg">
                            <SchoolIcon className="text-5xl mb-4 mx-auto" />
                            <ArrowDownwardOutlinedIcon className="text-5xl ml-2 mb-4 mx-auto" />
                            <Typography variant="h5" className="font-bold">
                                Step 1: Choose Your College 
                            </Typography>
                            <Typography className="mt-2">
                                Select the college you're interested in visiting in our search bar below.
                            </Typography>
                        </div>
                    </div>
                    
                    <div className="gradient-border">
                        <div className="p-6 bg-blue-700 text-white rounded-lg shadow-lg">
                            <PersonSearchIcon className="text-5xl mb-4 mx-auto" />
                            <Typography variant="h5" className="font-bold">
                                Step 2: Find a Guide
                            </Typography>
                            <Typography className="mt-2">
                                Choose or get matched with a student of similar interests!
                            </Typography>
                        </div>
                    </div>
            
                    <div className="gradient-border">
                        <div className="p-6 bg-blue-900 text-white rounded-lg shadow-lg">
                            <EventAvailableIcon className="text-5xl mb-4 mx-auto" />
                            <Typography variant="h5" className="font-bold">
                                Step 3: Schedule Your Tour or Video Chat
                            </Typography>
                            <Typography className="mt-2">
                                Set a date and time that works for you and your guide.
                            </Typography>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
    
}

export default HowItWorks;