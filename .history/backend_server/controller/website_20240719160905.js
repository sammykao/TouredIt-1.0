const db = require("./../database/db");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();


exports.insertClientAccounts = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the new account
        if (!isValidAccount(account)) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Insert the account into the database
        const query = "INSERT INTO clients (email, name, phone) VALUES ($1, $2, $3) RETURNING *";
        const values = [account.email, account.name, account.phone];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Account created', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isValidAccount = (account) => {
    return (account.email && account.name && account.phone);
};

exports.retrieveClientInfo = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        if (!account.email) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Retrieve the account from the database
        const query = "SELECT email, name, phone, id FROM clients WHERE email = $1";
        const values = [account.email];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "Account Not Found"});
        } else {
            res.status(201).json({ account: result.rows[0] });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.updateClientInfo = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data
        console.log(account);
        // Perform validation on the  account
        if (!account.email) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Update the account in the database
        const query = "UPDATE clients SET name = COALESCE($2, name), \
        phone = COALESCE($3, phone) WHERE email = $1 RETURNING *";
        const values = [account.email, account.name, account.phone];
        console.log("PRE_QUERY");
        const result = await db.query(query, values);
        console.log("POSRT");
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Account Not Found" });
        } else {
            res.status(200).json({ message: 'Account updated', account: result.rows[0] });
        }

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

exports.getAllGuides = async (req, res) => {
    try {

        const search = req.body; // Says search, but filter by colleges for now

        if (!search.school) {
            res.status(400).json({ message: 'Must provide a school to get guides for' });
            return;
        }

        // Query the database to get all guides for the specified college
        const query = "SELECT * FROM tour_guides WHERE school = $1";
        const values = [search.school];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "No guides found for the specified college" });
        } else {
            res.status(200).json({ guides: result.rows });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGuideInfo = async (req, res) => {
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
                COALESCE(array_agg(ca.activity_name), ARRAY[]::VARCHAR[]) AS activities,
                COALESCE(array_agg(h.hobby_name), ARRAY[]::VARCHAR[]) AS hobbies
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
                activities: result.rows[0].activities,
                hobbies: result.rows[0].hobbies
            };
            res.status(200).json({ guide: guideInfo });
        }

        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGuidesByFilter = async (req, res) => {
    try {
        const filters = req.body;

        let query = `
            SELECT 
                tg.id, tg.name, tg.email, tg.school, tg.hometown, tg.phone, tg.bio,
                tg.major, tg.secondary_major, tg.minor, tg.secondary_minor,
                tg.profile_image_url, tg.num_tours, tg.instagram, tg.linkedin,
                COALESCE(array_agg(ca.activity_name), ARRAY[]::VARCHAR[]) AS activities,
                COALESCE(array_agg(h.hobby_name), ARRAY[]::VARCHAR[]) AS hobbies
            FROM 
                tour_guides tg
            LEFT JOIN 
                campus_involvement ca ON tg.id = ca.tourguide_id
            LEFT JOIN 
                hobbies h ON tg.id = h.tourguide_id
            WHERE 1=1`;
        
        let values = [];
        let counter = 1;

        for (let key in filters) {
            if (filters[key] !== null && filters[key] !== undefined) {
                query += ` AND ${key} = $${counter}`;
                values.push(filters[key]);
                counter++;
            }
        }

        query += ' GROUP BY tg.id';

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "No guides found with the specified filters" });
        } else {
            res.status(200).json({ guides: result.rows });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllSchoolNames = async (req, res) => {
    try {
        // Query all school names from the database
        const query = "SELECT name FROM schools";
        const result = await db.query(query);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "No schools found" });
        } else {
            const schoolNames = result.rows.map(school => school.name);
            res.status(200).json({ schools: schoolNames });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSchoolInfo = async (req, res) => {
    try {
        const school = req.body; // Assuming you pass school id as a parameter

        // Query school info from the database
        const query = "SELECT * FROM schools WHERE name = $1";
        const values = [school.name];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "School Not Found" });
        } else {
            res.status(200).json({ school: result.rows[0] });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSchoolInfos = async (req, res) => {
    try {
        // Query all school information from the database
        const query = "SELECT * FROM schools";
        const result = await db.query(query);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "No schools found" });
        } else {
            res.status(200).json({ schools: result.rows });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// config settings for email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  

// sending email
exports.sendEmail = async (req, res) => {
    const { first_name, email, last_name, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: 'info@touredit.com', // receiver address
        subject: "Website Contact Form",
        html: `<p>You have a new contact request from:</p>
            <ul>
                <li>Name: ${first_name} ${last_name}</li>S
                <li>Email: ${email}</li>
            </ul>
            <p>Message:</p>
            <p>${message}</p>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
        console.log(err);
        res.status(500).send({message: 'Error sending email', error: err});
        } else {
        console.log(info);
        res.status(200).send({message: 'Email sent successfully'});
        }
    });
};

exports.getClientTours = async (req, res) => {
    try {
        const { email } = req.body; // Assuming req.body contains the client email
        console.log(email);
        if (!email) {
            res.status(400).json({ message: 'Invalid client email' });
            return;
        }

        // Query to get the tours for the specific client including the tour guide's name and confirmation status
        const query = `
            SELECT 
                t.event_date AS date, t.school, tg.name AS guide, t.confirmed
            FROM 
                tours t
            INNER JOIN 
                tour_guides tg ON t.tour_guide_id = tg.id
            INNER JOIN
                clients c ON t.client_id = c.id
            WHERE 
                c.email = $1`;
        
        const values = [email];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No tours found for the specified client" });
        } else {
            // Separate the tours into confirmed and non-confirmed arrays
            const confirmedTours = result.rows.filter(tour => tour.confirmed);
            const nonConfirmedTours = result.rows.filter(tour => !tour.confirmed);
            
            res.status(200).json({ confirmedTours, nonConfirmedTours });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendcustomtour = async (req, res) => {
    try {
        const { email } = req.body; // Assuming req.body contains the client email
        console.log(email);
        if (!email) {
            res.status(400).json({ message: 'Invalid client email' });
            return;
        }

        // Query to get the tours for the specific client including the tour guide's name and confirmation status
        const query = `
            SELECT 
                t.event_date AS date, t.school, tg.name AS guide, t.confirmed
            FROM 
                tours t
            INNER JOIN 
                tour_guides tg ON t.tour_guide_id = tg.id
            INNER JOIN
                clients c ON t.client_id = c.id
            WHERE 
                c.email = $1`;
        
        const values = [email];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No tours found for the specified client" });
        } else {
            // Separate the tours into confirmed and non-confirmed arrays
            const confirmedTours = result.rows.filter(tour => tour.confirmed);
            const nonConfirmedTours = result.rows.filter(tour => !tour.confirmed);
            
            res.status(200).json({ confirmedTours, nonConfirmedTours });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendtour = async (req, res) => {
    try {
        const { data, email, guide_email } = req.body; // Assuming req.body contains the client email
        if (!email || !data || !guide_email) {
            res.status(400).json({ message: 'Invalid client request' });
            return;
        }

        let mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: email, // receiver address
            subject: "Thanks for sending a request",
            html: "<p> Hi! \n\n\tThank you for submitting a request for a tour. \
            Our team moves very quickly and will make sure a match \
            is found, or that the requested guide responds quickly. \
            We appreciate your support and if you ever need anything, \
            email us at info@touredit.com.\n\nWarmly,\nTouredIt Team\n \
            </p>"
                
        };
    
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
            console.log(err);
            res.status(500).send({message: 'Error sending client email', error: err});
            } else {
            console.log(info);
            res.status(200).send({message: 'Email sent successfully'});
            }
        });

        mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: guide_email, // receiver address
            subject: "Thanks for sending a request",
            html: "<p> Hi! \n\n\tThank you for submitting a request for a tour. \
            Our team moves very quickly and will make sure a match \
            is found, or that the requested guide responds quickly. \
            We appreciate your support and if you ever need anything, \
            email us at info@touredit.com.\n\nWarmly,\nTouredIt Team\n \
            </p>"
                
        };
    
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
            console.log(err);
            res.status(500).send({message: 'Error sending client email', error: err});
            } else {
            console.log(info);
            res.status(200).send({message: 'Email sent successfully'});
            }
        });
        // Query to get the tours for the specific client including the tour guide's name and confirmation status
        const query = `
            SELECT 
                t.event_date AS date, t.school, tg.name AS guide, t.confirmed
            FROM 
                tours t
            INNER JOIN 
                tour_guides tg ON t.tour_guide_id = tg.id
            INNER JOIN
                clients c ON t.client_id = c.id
            WHERE 
                c.email = $1`;
        
        const values = [email];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No tours found for the specified client" });
        } else {
            // Separate the tours into confirmed and non-confirmed arrays
            const confirmedTours = result.rows.filter(tour => tour.confirmed);
            const nonConfirmedTours = result.rows.filter(tour => !tour.confirmed);
            
            res.status(200).json({ confirmedTours, nonConfirmedTours });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};