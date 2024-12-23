import { Input, Button, Textarea, Typography } from "@material-tailwind/react";



const ExtraDetailsPage = ({
    handleActivitiesSubmit,
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
    handleRemoveWorkExp
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
                        onChange={(e) => {
                          const updatedHobbies = [...hobbyData];
                          updatedHobbies[index].hobby_name = e.target.value;
                          setHobbyData(updatedHobbies);
                        }}
                        required
                      />
                      <Textarea
                        name="description"
                        placeholder="Description"
                        value={hobby.description}
                        onChange={(e) => {
                          const updatedHobbies = [...hobbyData];
                          updatedHobbies[index].description = e.target.value;
                          setHobbyData(updatedHobbies);
                        }}
                        required
                      />
                      {hobbyData.length > 1 && (
                        <Button color="red" onClick={() => setHobbyData(hobbyData.filter((_, i) => i !== index))}>Remove</Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={() => setHobbyData([...hobbyData, { hobby_name: '', description: '' }])}>Add Hobby</Button>
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
                        onChange={(e) => {
                          const updatedActivities = [...activityData];
                          updatedActivities[index].activity_name = e.target.value;
                          setActivityData(updatedActivities);
                        }}
                        required
                      />
                      <Textarea
                        name="description"
                        placeholder="Description"
                        value={activity.description}
                        onChange={(e) => {
                          const updatedActivities = [...activityData];
                          updatedActivities[index].description = e.target.value;
                          setActivityData(updatedActivities);
                        }}
                        required
                      />
                      {activityData.length > 1 && (
                        <Button color="red" onClick={() => setActivityData(activityData.filter((_, i) => i !== index))}>Remove</Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={() => setActivityData([...activityData, { activity_name: '', description: '' }])}>Add Activity</Button>
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
                        onChange={(e) => {
                          const updatedExp = [...expData];
                          updatedExp[index].exp_name = e.target.value;
                          setExpData(updatedExp);
                        }}
                        required
                      />
                      <Textarea
                        name="description"
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => {
                          const updatedExp = [...expData];
                          updatedExp[index].description = e.target.value;
                          setExpData(updatedExp);
                        }}
                        required
                      />
                      {expData.length > 1 && (
                        <Button color="red" onClick={() => setExpData(expData.filter((_, i) => i !== index))}>Remove</Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={() => setExpData([...expData, { exp_name: '', description: '' }])}>Add Experience</Button>
                </div>

                <Button type="submit" className="mt-6">Submit Activities</Button>
            </form>
        </>
    );
};

export default ExtraDetailsPage;