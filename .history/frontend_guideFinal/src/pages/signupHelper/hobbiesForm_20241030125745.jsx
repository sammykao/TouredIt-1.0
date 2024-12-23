import { Input, Button, Textarea, Typography } from "@material-tailwind/react";

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
            <form onSubmit={handleActivitiesSubmit}>
                <h3 className="text-lg font-semibold mb-4">Tell Us About Your Activities and Experience</h3>

                {/* Hobbies Section */}
                <div>
                    <h4>Hobbies</h4>
                    {hobbyData.map((hobby, index) => (
                        <div key={index}>
                            <Input
                                name="hobby_name"
                                placeholder="Hobby Name"
                                value={hobby.hobby_name}
                                onChange={(e) => handleHobbyChange(e, index, 'hobby_name')}
                                required
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={hobby.description}
                                onChange={(e) => handleHobbyChange(e, index, 'description')}
                                required
                            />
                            {hobbyData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveHobby(index)}>Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddHobby}>Add Hobby</Button>
                </div>

                {/* Activities Section */}
                <div>
                    <h4>Activities</h4>
                    {activityData.map((activity, index) => (
                        <div key={index}>
                            <Input
                                name="activity_name"
                                placeholder="Activity Name"
                                value={activity.activity_name}
                                onChange={(e) => handleActivityChange(e, index, 'activity_name')}
                                required
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={activity.description}
                                onChange={(e) => handleActivityChange(e, index, 'description')}
                                required
                            />
                            {activityData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveActivity(index)}>Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddActivity}>Add Activity</Button>
                </div>

                {/* Work Experience Section */}
                <div>
                    <h4>Work Experience</h4>
                    {expData.map((exp, index) => (
                        <div key={index}>
                            <Input
                                name="exp_name"
                                placeholder="Experience Name"
                                value={exp.exp_name}
                                onChange={(e) => handleWorkExpChange(e, index, 'exp_name')}
                                required
                            />
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={exp.description}
                                onChange={(e) => handleWorkExpChange(e, index, 'description')}
                                required
                            />
                            {expData.length > 1 && (
                                <Button color="red" onClick={() => handleRemoveWorkExp(index)}>Remove</Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddWorkExp}>Add Experience</Button>
                </div>

                <Button type="submit" className="mt-6">Submit Activities</Button>
            </form>
        </>
    );
};

export default ExtraDetailsPage;
