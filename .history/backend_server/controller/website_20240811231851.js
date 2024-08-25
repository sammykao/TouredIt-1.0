const db = require("./../database/db");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();

// config settings for email
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
    }
});

const sendEmailWithRetry = async (mailOptions, retries = 3) => {
    while (retries > 0) {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info);
            return { success: true, info };
        } catch (err) {
            console.error('Error sending email:', err);
            retries--;
            if (retries === 0) {
                return { success: false, error: err };
            }
        }
    }
};
  


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
        const result = await db.query(query, values);
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
                COALESCE(
                    json_agg(
                        DISTINCT jsonb_build_object('name', ca.activity_name, 'description', ca.description, 'id', ca.id)
                    ) FILTER (WHERE ca.activity_name IS NOT NULL), 
                    '[]'
                ) AS activities,
                COALESCE(
                    json_agg(
                        DISTINCT jsonb_build_object('name', h.hobby_name, 'description', h.description, 'id', h.hobby_id)
                    ) FILTER (WHERE h.hobby_name IS NOT NULL), 
                    '[]'
                ) AS hobbies,
                COALESCE(
                    json_agg(
                        DISTINCT jsonb_build_object('name', we.job_name, 'description', ca.description, 'id', we.id)
                    ) FILTER (WHERE we.job_name IS NOT NULL), 
                    '[]'
                ) AS work_experience,
                

            FROM 
                tour_guides tg
            LEFT JOIN 
                campus_involvement ca ON tg.id = ca.tourguide_id
            LEFT JOIN 
                hobbies h ON tg.id = h.tourguide_id
            WHERE 
                tg.email = $1
            GROUP BY 
                tg.id;
            `

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


  

// sending email
exports.sendEmail = async (req, res) => {
    const { first_name, email, last_name, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: 'info@touredit.com', // receiver address
        subject: "Website Contact Form",
        html: `<p>You have a new contact request from:</p>
            <ul>
                <li>Name: ${first_name} ${last_name}</li>
                <li>Email: ${email}</li>
            </ul>
            <p>Message:</p>
            <p>${message}</p>`
    };

    const emailResult = await sendEmailWithRetry(mailOptions);
    if (emailResult.success) {
        res.status(200).send({ message: 'Email sent successfully' });
    } else {
        res.status(500).send({ message: 'Error sending email', error: emailResult.error });
    }
};

exports.getClientTours = async (req, res) => {
    try {
        const { email } = req.body; // Assuming req.body contains the client email
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
                LOWER(c.email) = LOWER($1)`;
        
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

// Sending custom tour request
exports.sendcustomtour = async (req, res) => {
    try {
        const { data, email } = req.body;

        if (!email || !data) {
            res.status(400).json({ message: 'Invalid client request' });
            return;
        }

        // Retrieve the client's information from the database
        const clientQuery = "SELECT name FROM clients WHERE email = $1";
        const clientResult = await db.query(clientQuery, [email]);

        if (clientResult.rows.length === 0) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        const clientName = clientResult.rows[0].name;

        // Prepare email options for the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Thanks for sending a request",
            html: `<p>Hi ${clientName},<br><br>
            Thank you for submitting a request for a tour. Our team moves very quickly and will make sure a match 
            is found. We appreciate your support and if you ever need anything, 
            email us at info@touredit.com.<br><br>
            Warmly,<br>
            TouredIt Team
            </p>`
        };

        let emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to client', error: emailResult.error });
            return;
        }

        // Prepare email options for the TouredIt team
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "joshua.bernstein@touredit.com",
            subject: "New Custom Tour Request",
            html: `<p>Hi TouredIt Team,<br><br>
            You have a new custom tour request. Here are the details:<br>
            <ul>
                <li><strong>Client Name:</strong> ${clientName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>School:</strong> ${data.school}</li>
                <li><strong>Major:</strong> ${data.major}</li>
                <li><strong>Grade:</strong> ${data.grade}</li>
                <li><strong>Hobbies:</strong> ${data.hobbies}</li>
                <li><strong>Clubs:</strong> ${data.clubs}</li>
                <li><strong>Interests:</strong> ${data.interests}</li>
                <li><strong>Comments:</strong> ${data.comments}</li>
                <li><strong>Date:</strong> ${data.date}</li>
            </ul><br>
            Please process this request as soon as possible.<br><br>
            Warmly,<br>
            TouredIt Team
            </p>`
        };

        emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to TouredIt team', error: emailResult.error });
            return;
        }

        res.status(200).json({ message: 'Custom request submitted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.sendtour = async (req, res) => {
    try {
        const { data, email, school, guide_email } = req.body;

        if (!email || !data || !guide_email || !school) {
            res.status(400).json({ message: 'Invalid client request' });
            return;
        }

        // Get tour guide and client IDs with case-insensitive email comparison
        const guideQuery = "SELECT id FROM tour_guides WHERE LOWER(email) = LOWER($1)";
        const clientQuery = "SELECT id FROM clients WHERE LOWER(email) = LOWER($1)";

        const guideResult = await db.query(guideQuery, [guide_email]);
        const clientResult = await db.query(clientQuery, [email]);

        if (guideResult.rows.length === 0 || clientResult.rows.length === 0) {
            res.status(404).json({ message: "Guide or client not found" });
            return;
        }

        const tour_guide_id = guideResult.rows[0].id;
        const client_id = clientResult.rows[0].id;

        // Insert tour details into the Tours table
        const insertQuery = `
            INSERT INTO Tours (event_date, tour_guide_id, client_id, school, comments)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.date, tour_guide_id, client_id, school, data.comments];

        const insertResult = await db.query(insertQuery, values);

        // Prepare email options for the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Thanks for sending a request",
            html: `<p>Hi there!<br><br>
            Thank you for submitting a request for a tour. Our team moves very quickly 
            and will make sure that the requested guide responds soon. We normally price
            tours at $140 for a 90 minute session. We appreciate your support \
            and if you ever need anything or have any questions (including a cancellation), 
            email us at info@touredit.com. <br><br>
            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        let emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to client', error: emailResult.error });
            return;
        }

        // Prepare email options for the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guide_email,
            subject: "You have a new tour request",
            html: `<p>Hi there!<br><br>
            Congratulations! You have a new tour guide request through TouredIt. 
            Please visit your tour guide portal at https://www.toureditguides.com/sign-in 
            to accept or decline the request. <br> <br> Once you're in the portal, you'll see the tour 
            details. If you accept, you'll receive an email with the next steps. <br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to guide', error: emailResult.error });
            return;
        }

        res.status(200).json({ message: 'Tour request submitted successfully', tour: insertResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
