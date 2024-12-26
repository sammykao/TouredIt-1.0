import React from "react";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export function TestimonialCard({ img, client, title, clientInfo }) {
  return (
    <Card shadow={false} className="bg-gray-100/50 h-[24rem] md:h-auto rounded-2xl p-4 sm:p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="mb-2 sm:mb-4 text-base sm:text-lg lg:text-2xl font-bold text-center"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-2 sm:px-4 py-2 sm:py-4 flex flex-col items-center">
        <img
          src={img}
          className="max-w-[6rem] sm:max-w-[8rem] max-h-[4rem] sm:max-h-[6rem] rounded-md mb-4"
          alt={client}
        />
        <div className="text-center">
          <Typography variant="h6" color="blue-gray" className="text-sm sm:text-base">
            {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-900 text-sm sm:text-base"
          >
            {clientInfo}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}

export const testimonials = [
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
        "Virginia was such a sweet heart! It was great! Thanks!",
      client: "Tiffany Trigg",
      clientInfo: "Parent of student touring UCLA",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+California,+Los+Angeles_logo.jpg",
    },
    {
      title:
        "In the word of my daughter, the tour was  “really really good” “so nice” “learned about the whole \
        campus” “very thorough tour” “loved it” “loved her”… ",
      client: "Mariah Brownhill",
      clientInfo: "Parent of student touring Cornell & UPenn",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Cornell+University_logo.jpg",
    },
    {
      title:
        "Hi Joshua, the tour went very well! Sam was brilliant, so much better than the official tour we got at \
        *******. Please pass on",
      client: "Lily Peckham",
      clientInfo: "Parent of student touring Dartmouth & Boston College",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Dartmouth+College_logo.jpg",
    },
    {
      title:
        "I appreciate TouredIt's flexibility and Joshua's off-hours help. Dario was great! \
        He was on time, friendly and super informative",
      client: "Tuvana Bain",
      clientInfo: "Parent of student touring UMass Amherst & 3 others",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+Massachusetts+Amherst_logo.jpg",
    },
    {
      title:
        "The tour guide was very relatable and did a great job weaving in what day to day \
        life is like for students, socially and academically.",
      client: "Mariko Beck",
      clientInfo: "Parent of student touring William & Mary",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/College+of+William+and+Mary_logo.jpg",
    },
    {
      title:
        "The tour was great! The two guides, Garren and Kyle, were amazing and showed us around the \
        entire campus. They didn't hesitate to answer any questions and gave us the exact insight \
        we needed. Thank you so much.",
      client: "Luigi",
      clientInfo: "Parent of student touring UCLA",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+California,+Los+Angeles_logo.jpg",
    },
    {
      title: "We got much better access to the insides of buildings being with a student 1-on-1 rather \
      than on the tour. Molly and Natalie were able to give us a driving tour which actually \
      worked out better for Clemson and Ga bc the campuses are so big. Love it!",
      client: "Parthia Orth",
      clientInfo: "Parent of student touring Wake Forest & 3 Others",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Wake+Forest+University_logo.jpg",
    },
    {
      title: "Both tours were great. Great matches on guides for us. Thanks again!!",
      client: "Matt Marenghi",
      clientInfo: "Parent of student touring Washington and Lee & Davidson",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Washington+and+Lee+University_logo.jpg",
    },
    {
      title:"Flexibility in scheduling, match to my child's interests in terms of majors, ability to get unfiltered views",
      client: "Melissa Schilowitz",
      clientInfo: "Parent of student touring Pitt",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+Pittsburgh_logo.jpg",
    },
    {
      title: "Jurell was awesome - really. He was chill and informative and personable \
      and was able to share some great insight on applications etc. Thanks",
      client: "Lauren Mansfield",
      clientInfo: "Parent of student touring UCSB & USC",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/University+of+California,+Santa+Barbara_logo.jpg",
    },
    {
      title: "The tour was very helpful. We were able to get to pretty much all of the \
        campus and I feel like I got a really great sense of the school - JJ provided \
        great insights as well. Thanks for helping organize this!",
      client: "Shelby Garbis",
      clientInfo: "Parent, Toured Emory",
      img: "https://touredit-logos.s3.us-east-2.amazonaws.com/Emory+University_logo.jpg",
    },
];

