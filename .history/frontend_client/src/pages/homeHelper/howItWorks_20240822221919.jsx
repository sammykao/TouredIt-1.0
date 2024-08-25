import {
    Typography,
  } from "@material-tailwind/react";

import SchoolIcon from '@mui/icons-material/School';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const HowItWorks = () => {
    return (
        <section className="py-12 rounded-xl mb-20">
            <div className="container mx-auto">
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="text-center mb-10 text-4xl font-bold"
                >
                    How It Works
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    
                    <div className="p-6 bg-blue-400 text-white rounded-lg shadow-lg">
                    <SchoolIcon className="text-5xl mb-4 mx-auto" />
                    <Typography variant="h5" className="font-bold">
                        Step 1: Choose Your College
                    </Typography>
                    <Typography className="mt-2">
                        Select the college you're interested in visiting.
                    </Typography>
                    </div>

                    <div className="p-6 bg-blue-700 text-white rounded-lg shadow-lg">
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
    );
    
}

export default HowItWorks;