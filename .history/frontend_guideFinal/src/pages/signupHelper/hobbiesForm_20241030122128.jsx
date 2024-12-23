


const ExtraDetailsPage = () => {
    

return (
    <>
        <div>
            {hobbyData.map((hobby, index) => (
            <div key={index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hobby_name">
                    Hobby Name:
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="hobby_name"
                    type="text"
                    placeholder="Name"
                    value={hobby.hobby_name}
                    onChange={(e) => handleHobbyChange(index, e)}
                    required
                />
                </div>
                <div className="w-full md:w-1/2">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Description:
                </Typography>
                <Textarea
                    cols="40"
                    rows="3"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="description"
                    type="text"
                    placeholder="~50 words maximum"
                    value={hobby.description}
                    onChange={(e) => handleHobbyChange(index, e)}
                    required
                />
                </div>
                <div className="w-full flex justify-end items-center mt-2 space-x-2">
                {hobbyData.length > 1 && (
                    <Button color="red" onClick={() => handleRemoveHobby(index)} className="py-3 px-3">
                    Remove Hobby
                    </Button>
                )}
                {index === hobbyData.length - 1 && (
                    <Button onClick={handleAddHobby} className="py-3 px-3">
                    Add Hobby
                    </Button>
                )}
                </div>
            </div>
            ))}
            {hobbyData.length === 0 && (
            <div className="w-full flex justify-end mt-2">
                <Button onClick={handleAddHobby} className="py-3 px-3">
                Add Hobby
                </Button>
            </div>
            )}
        </div>


        <div>
            {activityData.map((activity, index) => (
            <div key={index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activity_name">
                    On-campus activities:
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="activity_name"
                    type="text"
                    placeholder="Name"
                    value={activity.activity_name}
                    onChange={(e) => handleActivityChange(index, e)}
                    required
                />
                </div>
                <div className="w-full md:w-1/2">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Description:
                </Typography>
                <Textarea
                    cols="40"
                    rows="3"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="description"
                    type="text"
                    placeholder="~50 words maximum"
                    value={activity.description}
                    onChange={(e) => handleActivityChange(index, e)}
                    required
                />
                </div>
                <div className="w-full flex justify-end items-center mt-2 space-x-2">
                {activityData.length > 1 && (
                    <Button color="red" onClick={() => handleRemoveActivity(index)} className="py-3 px-3">
                    Remove Activity
                    </Button>
                )}
                {index === activityData.length - 1 && (
                    <Button onClick={handleAddActivity} className="py-3 px-3">
                    Add Activity
                    </Button>
                )}
                </div>
            </div>
            ))}
            {activityData.length === 0 && (
            <div className="w-full flex justify-end mt-2">
                <Button onClick={handleAddActivity} className="py-3 px-3">
                Add Activity
                </Button>
            </div>
            )}
        </div>

        
        <div>
            {expData.map((exp, index) => (
            <div key={index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="job_name">
                    Work Experience Name:
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="job_name"
                    type="text"
                    placeholder="Name"
                    value={exp.job_name}
                    onChange={(e) => handleWorkExpChange(index, e)}
                    required
                />
                </div>
                <div className="w-full md:w-1/2">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Description:
                </Typography>
                <Textarea
                    cols="40"
                    rows="3"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="description"
                    type="text"
                    placeholder="~50 words maximum"
                    value={exp.description}
                    onChange={(e) => handleWorkExpChange(index, e)}
                    required
                />
                </div>
                <div className="w-full flex justify-end items-center mt-2 space-x-2">
                {expData.length > 1 && (
                    <Button color="red" onClick={() => handleRemoveWorkExp(index)} className="py-3 px-3">
                    Remove Experience
                    </Button>
                )}
                {index === expData.length - 1 && (
                    <Button onClick={handleAddWorkExp} className="py-3 px-3">
                    Add Experience
                    </Button>
                )}
                </div>
            </div>
            ))}
            {expData.length === 0 && (
            <div className="w-full flex justify-end mt-2">
                <Button onClick={handleAddWorkExp} className="py-3 px-3">
                Add Work Experience
                </Button>
            </div>
            )}
        </div>

    </>
);
};

export default ExtraDetailsPage;