// This is the controlboard for the tour guide portal.
// basically, just make a bunch of functions to export
// and the router points the get/post requests to execute the functions
// you export from here

const db = require("./../database/db")


exports.insertGuideAccounts = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the new account
        if (!isValidAccount(account)) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Insert the account into the database
        const query =  `
            INSERT INTO 
                tour_guides (name, email, school, hometown, phone, bio, major, secondary_major, minor, secondary_minor, profile_image_url, instagram, linkedin) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
            RETURNING *`;
        const values = [account.name, account.email, account.school, account.hometown, account.phone,
            account.bio, account.major, account.secondary_major, account.minor, account.secondary_minor, 
            account.profile_image_url, account.instagram, account.linkedin];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Account created', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addHobbies = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Perform validation on the new account
        // if (!isValidAccount(account)) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Insert the account into the database
        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE email = $1
            )
            INSERT INTO hobbies (tourguide_id, hobby_name, description)
            SELECT id, $2, $3
            FROM guide
            RETURNING *;
            `;

            const values = [account.email, account.hobby_name, account.description];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Hobby added', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addInvolvement = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Perform validation on the new account
        // if (!isValidAccount(account)) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Insert the account into the database
        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE email = $1
            )
            INSERT INTO campus_involvement (tourguide_id, activity_name, description)
            SELECT id, $2, $3
            FROM guide
            RETURNING *;
            `;
            const values = [account.email, account.activity_name, account.description];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Involvement added', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addAvailability = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Insert the account into the database
        const query = `
            INSERT INTO availability (tourguide_id, day, period) VALUES ($1, $2, $3) RETURNING *`;
            const values = [account.tourguide_id, account.activity_name, account.description];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Availability added', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMetrics = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Insert the account into the database
        const query = `
            INSERT INTO tourguide_metrics (tourguide_id, num_tours, earnings, rating) VALUES ($1, $2, $3, $4 ) RETURNING *`;
            const values = [account.tourguide_id, account.activity_name, account.description];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Availability added', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAvailability = async (req,res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Insert the account into the database
        const query = `
            DELETE FROM availability where id = $1`;
            const values = [account.id];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Availability was deleted', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.deleteHobby = async (req,res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Perform validation on the new account
        // if (!isValidAccount(account)) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Insert the account into the database
        const query = `
            DELETE FROM hobbies where hobby_id = $1`;
            const values = [account.hobby_id];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Hobby was deleted', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteInvolvement = async (req,res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Perform validation on the new account
        // if (!isValidAccount(account)) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Insert the account into the database
        const query = `
            DELETE FROM campus_involvement where id = $1`;
            const values = [account.id];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Involvement was deleted', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.retrieveAvailability = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        // if (!account.email) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Retrieve the account from the database
        const query = "SELECT id, day, period FROM availability WHERE tourguide_id = $1";
        const values = [account.tourguide_id];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No availability found"});
        } else {
            res.status(201).json({ account: result.rows[0] });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.retrieveHobbies = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        // if (!account.email) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Retrieve the account from the database
        const query = "SELECT hobby_id, hobby_name, tourguide_id, description FROM hobbies WHERE tourguide_id = $1";
        const values = [account.tourguide_id];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No hobbies found"});
        } else {
            res.status(201).json({ hobbies: result.rows });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.retrieveInvolvement = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        // if (!account.email) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Retrieve the account from the database
        const query = "SELECT id, activity_name, description FROM campus_involvement WHERE tourguide_id = $1";
        const values = [account.tourguide_id];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No involvements found"});
        } else {
            res.status(201).json({ account: result.rows[0] });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.retrieveTours = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        // if (!account.email) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Retrieve the account from the database
        //const query = "SELECT event_date, event_time, school, completed, feedback, confirmed FROM tours WHERE tourguide_id = $1";
        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE email = $1
            )
            SELECT event_date, event_time, school, completed, feedback, confirmed
            FROM tours
            JOIN guide ON tours.tour_guide_id = guide.id;
            `;
        const values = [account.email];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No tours found"});
        } else {
            res.status(201).json({ account: result.rows });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.retrieveMetrics = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        // if (!account.email) {
        //     res.status(400).json({ message: 'Invalid account data' });
        //     return;
        // }

        // Retrieve the account from the database
        const query = "SELECT num_tours, earnings, rating FROM tourguide_metrics WHERE tourguide_id = $1";
        const values = [account.tourguide_id];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No metrics found"});
        } else {
            res.status(201).json({ account: result.rows[0] });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};



exports.updateGuideAccounts = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the account data thats being updated

        // Perform validation on the new account
        if (!isValidAccount(account)) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Insert the account into the database
        const query = `
            UPDATE 
                tour_guides
            SET
                name = COALESCE($1, name), 
                school  = COALESCE($3, school), 
                hometown  = COALESCE($4, hometown), 
                phone  = COALESCE($5, phone), 
                bio = COALESCE($6, bio), 
                major  = COALESCE($7, major), 
                secondary_major  = COALESCE($8, secondary_major), 
                minor  = COALESCE($9, minor), 
                secondary_minor  = COALESCE($10, secondary_minor), 
                profile_image_url  = COALESCE($11, profile_image_url),
                instagram = ($12, instagram),
                linkedin = ($13, linkedin)

            WHERE 
                email = $2
            Returning
                *`;
            const values = [ account.name, account.email, account.school, account.phone, 
                account.hometown, account.bio, account.major, account.secondary_major, 
                account.minor, account.secondary_minor, account.profile_image_url, account.instagram, account.linkedin];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Account Not Found" });
        } else {
            res.status(200).json({ message: 'Account updated', account: result.rows[0] });
        }b
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isValidAccount = (account) => {
    return (account.email && account.name && account.phone && account.hometown && account.bio && account.major && account.profile_image_url);
};

exports.retrieveGuideInfo = async (req, res) => {
    try {

        const guide = req.body; // Says search, but filter by colleges for now

        if (!guide.email) {
            res.status(400).json({ message: 'Must provide an email to get guide' });
            return;
        }

        // Query to get the guide's info along with campus activities and hobbies
        const query = `
            SELECT 
                tg.id, tg.name, tg.email, tg.school, tg.hometown, tg.phone, tg.bio,
                tg.major, tg.secondary_major, tg.minor, tg.secondary_minor,
                tg.profile_image_url, tg.num_tours, tg.instagram, tg.linkedin,
                COALESCE(array_agg(DISTINCT ca.activity_name), ARRAY[]::VARCHAR[]) AS activities,
                COALESCE(array_agg(DISTINCT ca.description), ARRAY[]::VARCHAR[]) AS activity_descriptions,
                COALESCE(array_agg(DISTINCT ca.id), ARRAY[]::INT[]) AS activity_ids,
                COALESCE(array_agg(DISTINCT h.hobby_name), ARRAY[]::VARCHAR[]) AS hobbies,
                COALESCE(array_agg(DISTINCT h.description), ARRAY[]::VARCHAR[]) AS hobby_descriptions,
                COALESCE(array_agg(DISTINCT h.hobby_id), ARRAY[]::INT[]) AS hobby_ids
            FROM 
                tour_guides tg
            LEFT JOIN 
                campus_involvement ca ON tg.id = ca.tourguide_id
            LEFT JOIN 
                hobbies h ON tg.id = h.tourguide_id
            WHERE 
                tg.email = $1
            GROUP BY 
                tg.id`;

        const values = [guide.email];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Guide Not Found" });
        } else {
            // Initialize guide info
            const guideInfo = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email,
                school: result.rows[0].school,
                hometown: result.rows[0].hometown,
                phone: result.rows[0].phone,
                bio: result.rows[0].bio,
                major: result.rows[0].major, 
                secondary_major: result.rows[0].secondary_major,
                minor: result.rows[0].minor,
                secondary_minor: result.rows[0].secondary_minor,
                profile_image_url: result.rows[0].profile_image_url,
                instagram: result.rows[0].instagram,
                linkedin: result.rows[0].linkedin,
                num_tours: result.rows[0].num_tours,
                activities: result.rows[0].activities.map((activity, index) => ({
                    activity_name: activity,
                    description: result.rows[0].activity_descriptions[index],
                    activity_id: result.rows[0].activity_ids[index]
                })),
                hobbies: result.rows[0].hobbies.map((hobby, index) => ({
                 hobby_name: hobby,
                 description: result.rows[0].hobby_descriptions[index],
                 hobby_id: result.rows[0].hobby_ids[index]
                }))
            };

            res.status(200).json({ guide: guideInfo });
        }

        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.confirmTour = async (req, res) => {
    try {
        const { data, email, guide_email } = req.body; // Assuming req.body contains the client email
        if (!email || !data.tour_id || !guide_email || !school) {
            res.status(400).json({ message: 'Invalid' });
            return;
        }

        
        const guideQuery = "SELECT name, school FROM tour_guides WHERE email = $1";
        const guideResult = await db.query(guideQuery, [guide_email]);
        // Insert tour details into the Tours table
        const updateQuery = `UPDATE tours SET confirmed = true WHERE id = $1 RETURNING *`;
        const insertResult = await db.query(updateQuery, [data.tour_id]);

        // Send email to the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: email, // receiver address
            subject: "A guide has accepted your tour request",
            html: `<p>Hi!<br><br>
            \t${guideResult.row[0].name} has accepted your tour request for ${guideResult.row[0].school}
            on ${data.date}. They will reach out to arrange the tour for t<br><br>
            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
        });

        // Send email to the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: guide_email, // receiver address
            subject: "You have a new tour request",
            html: `<p>Hi!<br><br>
            You have a new guide request. Please visit your tour guide portal to accept or decline 
            the new request In the portal you will see the details
            of the tourl and once you accept, you will recieve an email on the next steps.<br><br>
            Warmly,<br>
            TouredIt Team
            </p>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).json({ message: 'Tour request submitted successfully', tour: insertResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};