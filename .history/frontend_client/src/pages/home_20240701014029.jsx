import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function TestimonialCard({
  img,
  client,
  title,
  clientInfo,
}) {
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6 h-full flex flex-col justify-between">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="mb-4 text-lg lg:text-2xl font-bold"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col justify-between flex-grow">
        <div className="flex-grow"></div> {/* Spacer to push content to the bottom */}
        <div className="flex items-center justify-between mt-auto">
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
          <img src={img} className="rounded-lg max-w-[8rem] py-2" alt={client} />
        </div>
      </CardBody>
    </Card>
  );
}

export default TestimonialCard;
