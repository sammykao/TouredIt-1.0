import { Input, Button, Textarea } from "@material-tailwind/react";

const ExtraDetailsPage = ({
    hobbyData, 
    handleHobbyChange, 
    handleAddHobby, 
    handleRemoveHobby, 
    activityData, 
    handleActivityChange, 
    handleAddActivity, 
    handleRemoveActivity, 
    expData, 
    handleWorkExpChange, 
    handleAddWorkExp, 
    handleRemoveWorkExp,
    handleActivitiesSubmit
}) => {
    return (
        <>
            <form onSubmit={handleActivitiesSubmit} className="space-y-8 mx-auto max-w-2xl px-4 sm:px-8">
                <h3 className="text-xl font-semibold text-center mb-6 text-blue-800">Tell Us About Your Activities and Experience</h3>
                <h5 className="text-md font-semibold text-center mb-6 text-black">These will show up on your profile card</h5>
                {/* Hobbies Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-700">Hobbies</h4>
                    {hobbyData.map((hobby, index) => (
                        <div key={index} className="space-y-2">
                            <Input
                                name="hobby_name"
                                placeholder="Hobby Name"
                                value={hobby.hobby_name}
                                onChange={(e) => handleHobbyChange(index, e, 'hobby_name')}
                                required
                                className="w-full"
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={hobby.description}
                                onChange={(e) => handleHobbyChange(index, e, 'description')}
                                required
                                className="w-full"
                            />
                            {hobbyData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveHobby(index)} className="mt-2">Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddHobby} className="mt-4 bg-black w-full sm:w-auto">Add Hobby</Button>
                </div>

                {/* Activities Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-700">Activities</h4>
                    {activityData.map((activity, index) => (
                        <div key={index} className="space-y-2">
                            <Input
                                name="activity_name"
                                placeholder="Activity Name"
                                value={activity.activity_name}
                                onChange={(e) => handleActivityChange(index, e, 'activity_name')}
                                required
                                className="w-full"
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={activity.description}
                                onChange={(e) => handleActivityChange(index, e, 'description')}
                                required
                                className="w-full"
                            />
                            {activityData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveActivity(index)} className="mt-2">Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddActivity} className="mt-4 bg-black w-full sm:w-auto">Add Activity</Button>
                </div>

                {/* Work Experience Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-700">Work Experience</h4>
                    {expData.map((exp, index) => (
                        <div key={index} className="space-y-2">
                            <Input
                                name="job_name"
                                placeholder="Experience Name"
                                value={exp.job_name}
                                onChange={(e) => handleWorkExpChange(index, e, 'job_name')}
                                required
                                className="w-full"
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={exp.description}
                                onChange={(e) => handleWorkExpChange(index, e, 'description')}
                                required
                                className="w-full"
                            />
                            {expData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveWorkExp(index)} className="mt-2">Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddWorkExp} className="mt-4 bg-black w-full sm:w-auto">Add Experience</Button>
                </div>

                <Button type="submit" className="mt-8 w-full bg-green-500 hover:bg-green-700 text-white">Submit</Button>
            </form>
        </>
    );
};

export default ExtraDetailsPage;
