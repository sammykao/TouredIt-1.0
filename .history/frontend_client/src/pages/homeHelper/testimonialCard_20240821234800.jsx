function TestimonialCard({ img, client, title, clientInfo }) {
    return (
      <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-4 sm:p-6">
        <CardHeader color="transparent" floated={false} shadow={false}>
          <Typography
            color="blue-gray"
            className="mb-2 sm:mb-4 text-base sm:text-lg lg:text-2xl font-bold"
          >
            &quot;{title}&quot;
          </Typography>
        </CardHeader>
        <CardBody className="px-2 sm:px-4 py-2 sm:py-4 flex flex-wrap-reverse gap-x-6 justify-between items-center">
          <div>
            <Typography variant="h6" color="blue-gray" className="text-sm sm:text-base">
              {client}
            </Typography>
            <Typography variant="paragraph" className="font-normal !text-gray-900 text-sm sm:text-base">
              {clientInfo}
            </Typography>
          </div>
          <img src={img} className="max-w-[6rem] sm:max-w-[8rem] max-h-[4rem] sm:max-h-[6rem] rounded-md" alt={client} />
        </CardBody>
      </Card>
    );
}