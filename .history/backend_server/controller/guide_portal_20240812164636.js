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

exports.insertGuideAccounts = async (req, res) => {
    try {
        const account = req.body;

        if (!isValidAccount(account)) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        const query = `
            INSERT INTO 
                tour_guides (name, email, school, hometown, phone, bio, major, 
                secondary_major, minor, secondary_minor, profile_image_url, 
                instagram, linkedin, grad_year, greek_life, student_athlete, paid_internship) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
            RETURNING *`;
        const values = [account.name, account.email, account.school, account.hometown,
                        account.phone, account.bio, account.major, account.secondary_major, 
                        account.minor, account.secondary_minor, account.profile_image_url, 
                        account.instagram, account.linkedin, account.grad_year, account.greek_life,
                        account.student_athlete, account.paid_internship];

        const result = await db.query(query, values);
        res.status(201).json({ message: 'Account created', account: result.rows[0] });

    } catch (error) {
        console.error('Error inserting guide account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addHobbies = async (req, res) => {
    try {
        const { email, hobby_name, description } = req.body;

        if (!email || !hobby_name || !description) {
            res.status(400).json({ message: 'Missing required hobby data' });
            return;
        }

        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE LOWER(email) = LOWER($1)
            )
            INSERT INTO hobbies (tourguide_id, hobby_name, description)
            SELECT id, $2, $3
            FROM guide
            RETURNING *;
        `;
        const values = [email, hobby_name, description];

        const result = await db.query(query, values);
        res.status(201).json({ message: 'Hobby added', hobby: result.rows[0] });

    } catch (error) {
        console.error('Error adding hobby:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addInvolvement = async (req, res) => {
    try {
        const { email, activity_name, description } = req.body;

        if (!email || !activity_name || !description) {
            res.status(400).json({ message: 'Missing required involvement data' });
            return;
        }

        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE LOWER(email) = LOWER($1)
            )
            INSERT INTO campus_involvement (tourguide_id, activity_name, description)
            SELECT id, $2, $3
            FROM guide
            RETURNING *;
        `;
        const values = [email, activity_name, description];

        const result = await db.query(query, values);
        res.status(201).json({ message: 'Involvement added', involvement: result.rows[0] });

    } catch (error) {
        console.error('Error adding involvement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addWorkExp = async (req, res) => {
    try {
        const { email, job_name, description } = req.body;

        if (!email || !job_name || !description) {
            res.status(400).json({ message: 'Missing required job data' });
            return;
        }

        const query = `
            WITH guide AS (
                SELECT id
                FROM tour_guides
                WHERE LOWER(email) = LOWER($1)
            )
            INSERT INTO work_experience (tourguide_id, job_name, description)
            SELECT id, $2, $3
            FROM guide
            RETURNING *;
        `;
        const values = [email, job_name, description];

        const result = await db.query(query, values);
        res.status(201).json({ message: 'Job added', involvement: result.rows[0] });

    } catch (error) {
        console.error('Error adding Job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteHobby = async (req, res) => {
    try {
        const { hobby_id } = req.body;

        if (!hobby_id) {
            res.status(400).json({ message: 'Missing hobby ID' });
            return;
        }

        const query = 'DELETE FROM hobbies WHERE hobby_id = $1 RETURNING *';
        const values = [hobby_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Hobby not found' });
        } else {
            res.status(200).json({ message: 'Hobby deleted', hobby: result.rows[0] });
        }

    } catch (error) {
        console.error('Error deleting hobby:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteInvolvement = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Missing involvement ID' });
            return;
        }

        const query = 'DELETE FROM campus_involvement WHERE id = $1 RETURNING *';
        const values = [id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Involvement not found' });
        } else {
            res.status(200).json({ message: 'Involvement deleted', involvement: result.rows[0] });
        }

    } catch (error) {
        console.error('Error deleting involvement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.deleteWorkExp = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Missing job ID' });
            return;
        }

        const query = 'DELETE FROM campus_involvement WHERE id = $1 RETURNING *';
        const values = [id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Job not found' });
        } else {
            res.status(200).json({ message: 'Job deleted', involvement: result.rows[0] });
        }

    } catch (error) {
        console.error('Error deleting Job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.retrieveHobbies = async (req, res) => {
    try {
        const { tourguide_id } = req.body;

        if (!tourguide_id) {
            res.status(400).json({ message: 'Missing tour guide ID' });
            return;
        }

        const query = 'SELECT hobby_id, hobby_name, tourguide_id, description FROM hobbies WHERE tourguide_id = $1';
        const values = [tourguide_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No hobbies found' });
        } else {
            res.status(200).json({ hobbies: result.rows });
        }

    } catch (error) {
        console.error('Error retrieving hobbies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.retrieveInvolvement = async (req, res) => {
    try {
        const { tourguide_id } = req.body;

        if (!tourguide_id) {
            res.status(400).json({ message: 'Missing tour guide ID' });
            return;
        }

        const query = 'SELECT id, activity_name, description FROM campus_involvement WHERE tourguide_id = $1';
        const values = [tourguide_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No involvements found' });
        } else {
            res.status(200).json({ involvements: result.rows });
        }

    } catch (error) {
        console.error('Error retrieving involvements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.retrieveWorkExp = async (req, res) => {
    try {
        const { tourguide_id } = req.body;

        if (!tourguide_id) {
            res.status(400).json({ message: 'Missing tour guide ID' });
            return;
        }

        const query = 'SELECT id, job_name, tourguide_id, description FROM work_experience WHERE tourguide_id = $1';
        const values = [tourguide_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No Jobs found' });
        } else {
            res.status(200).json({ hobbies: result.rows });
        }

    } catch (error) {
        console.error('Error retrieving Jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.retrieveTours = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: 'Invalid guide email' });
            return;
        }

        const query = `
            SELECT
                t.event_date AS date, t.school, c.name AS guide, t.confirmed, t.id AS id, t.greek_life, t.student_athlete, t.paid_internship
            FROM
                tours t
            INNER JOIN
                tour_guides tg ON t.tour_guide_id = tg.id
            INNER JOIN
                clients c ON t.client_id = c.id
            WHERE
                LOWER(tg.email) = LOWER($1)`;
        const values = [email];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No tours found for the specified client' });
        } else {
            const confirmedTours = result.rows.filter(tour => tour.confirmed);
            const nonConfirmedTours = result.rows.filter(tour => !tour.confirmed);
            res.status(200).json({ confirmedTours, nonConfirmedTours });
        }

    } catch (error) {
        console.error('Error retrieving tours:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateGuideAccounts = async (req, res) => {
    try {
        const account = req.body;

        if (!isValidAccount(account)) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        const query = `
            UPDATE 
                tour_guides
            SET
                name = COALESCE($1, name), 
                school = COALESCE($3, school), 
                hometown = COALESCE($4, hometown), 
                phone = COALESCE($5, phone), 
                bio = COALESCE($6, bio), 
                major = COALESCE($7, major), 
                secondary_major = COALESCE($8, secondary_major), 
                minor = COALESCE($9, minor), 
                secondary_minor = COALESCE($10, secondary_minor), 
                profile_image_url = COALESCE($11, profile_image_url),
                instagram = COALESCE($12, instagram),
                linkedin = COALESCE($13, linkedin)
                grad_year = COALESCE($14, grad_year),
                greek_life = COALESCE($15, greek_life),
                student_athlete = COALESCE($16, )
            WHERE 
                LOWER(email) = LOWER($2)
            RETURNING *`;
        const values = [account.name, account.email, account.school, account.hometown, account.phone, account.bio, account.major, account.secondary_major, account.minor, account.secondary_minor, account.profile_image_url, account.instagram, account.linkedin];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Account not found' });
        } else {
            res.status(200).json({ message: 'Account updated', account: result.rows[0] });
        }

    } catch (error) {
        console.error('Error updating guide account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const isValidAccount = (account) => {
    return account.email && account.name && account.phone && account.hometown && account.bio && account.major && account.profile_image_url;
};

exports.retrieveGuideInfo = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: 'Must provide an email to get guide' });
            return;
        }

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
                LOWER(tg.email) = LOWER($1)
            GROUP BY 
                tg.id`;
        const values = [email];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
        } else {
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
        console.error('Error retrieving guide info:', error);
        res.status(500).json({ message: error });
    }
};

exports.confirmTour = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Invalid request: Missing required fields' });
            return;
        }

        const tourQuery = "SELECT tour_guide_id, client_id, event_date FROM tours WHERE id = $1";
        const tourResult = await db.query(tourQuery, [id]);
        if (tourResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        const guideQuery = "SELECT email, name, school FROM tour_guides WHERE id = $1";
        const clientQuery = "SELECT email, name, phone FROM clients WHERE id = $1";

        const guideResult = await db.query(guideQuery, [tourResult.rows[0].tour_guide_id]);
        if (guideResult.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
            return;
        }
        const clientResult = await db.query(clientQuery, [tourResult.rows[0].client_id]);
        if (clientResult.rows.length === 0) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }

        // Update in db to confirmed
        const updateQuery = "UPDATE tours SET confirmed = true WHERE id = $1 RETURNING *";
        const insertResult = await db.query(updateQuery, [id]);
        if (insertResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        // Send email to the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: clientResult.rows[0].email,
            subject: "A guide has accepted your tour request",
            html: `<p>Hey ${clientResult.rows[0].name},<br><br>
            Good news, ${guideResult.rows[0].name} has accepted your tour request and
            will be in touch within the next few days! They are excited and ready to show you around ${guideResult.rows[0].school}. 
            <br><br>If you have any questions or run into any issues, feel free to email info@touredit.com 
            and someone from our team will answer within 24 hours! Have a great tour!.<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guideResult.rows[0].email,
            subject: "Thanks for accepting a tour",
            html: `<p>Hey ${guideResult.rows[0].name},<br><br>
            <em>Congratulations on being selected to give a tour!</em> 
            Thank you for taking on this important role. Here are your next steps 
            to ensure a smooth and successful tour experience: 
            <br><br>
            \t 1. <strong> Client and Tour details </strong><br><br>\t\t
            &#8226; <strong> Client name:</strong> ${clientResult.rows[0].name} (Can be either parent/adult or student)<br>\t\t
            &#8226; <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            &#8226; <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            &#8226; <strong> Tour Date: </strong> ${tourResult.rows[0].event_date}<br>\t\t
            &#8226; <strong> Tour comments: </strong> ${insertResult.rows[0].comments} <br><br><br>

            \t 2. <strong> Introduce yourself via text or email </strong><br><br>
            This is an outline for a <strong> mandatory </strong> message you must send ${clientResult.rows[0].name}. 
            <br>\t\t
            &#8226; Start by sending a text to ${clientResult.rows[0].name}. Here's a script to help you:<br>\t\t\t
            &#8226; <strong> Your Name:</strong> "Hi, ${clientResult.rows[0].name} my name is __."<br>\t\t\t
            &#8226; <strong> Date and School:</strong>"I'm excited to show you or your child around ${guideResult.rows[0].school} on ${tourResult.rows[0].event_date}."<br>\t\t\t
            &#8226; <strong> Major and Interests:</strong> Share your major, any notable clubs, or activities you participate in that might interest them.<br>\t\t
            &#8226; Coordinate timing, meeting, and special request logistics<br>\t\t\t
            &#8226; <strong>Time:</strong> This is the most important. See when they would prefer or can tour on that date. If you cannot make ends meet
            for the date or any other date, email info@touredit.com and we can cancel the tour.<br>\t\t\t
            &#8226; <strong> Meeting Point:</strong> Suggest a convenient meeting point on campus.<br>\t\t\t
            &#8226; <strong> Special Requests: </strong> Ask if there are any specific buildings or parts of 
            campus they would like to see in particular.<br><br><br>
            Guides receive $40 for a 60-90 minute tour, and we offer various payment methods (Venmo, Zelle, etc.). 
            After the tour, a member of our team will contact you via text or email to confirm the tour and arrange payment. <br><br>
            If you have any questions, feel free to respond to this email or text 305-206-7966 for a quicker response.<br><br>
            Thank you for your dedication and enthusiasm!
            <br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to Josh
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "joshua.bernstein@touredit.com",
            subject: "A guide has accepted a tour request",
            html: `<p>Hi Josh,<br><br>
            \t${guideResult.rows[0].name} has accepted a tour request from ${clientResult.rows[0].name}
            on ${tourResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            \t<strong> The client and tour details </strong><br>\t\t
            &#8226; <strong> Client name:</strong> ${clientResult.rows[0].name} <br>\t\t
            &#8226; <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            &#8226; <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            &#8226; <strong> Tour Date: </strong> ${tourResult.rows[0].event_date}<br>\t\t
            &#8226; <strong> Tour comments: <strong> ${insertResult.rows[0].comments} <br><br>
            \t &#8226; <strong> The guide details </strong><br>\t\t
            &#8226; <strong> Guide name:</strong> ${guideResult.rows[0].name}<br>\t\t
            &#8226; <strong> Guide email:</strong> ${guideResult.rows[0].email}<br>\t\t
            &#8226; <strong> Guide School: </strong> ${guideResult.rows[0].school} <br><br>
            Please monitor. Thanks. $$$!!!!!!!<br><br>

            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Tour request confirmed successfully', tour: insertResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Invalid request: Missing required fields' });
            return;
        }

        const tourQuery = "SELECT tour_guide_id, client_id, event_date FROM tours WHERE id = $1";
        const tourResult = await db.query(tourQuery, [id]);
        if (tourResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        const guideQuery = "SELECT email, name, school FROM tour_guides WHERE id = $1";
        const clientQuery = "SELECT email, name, phone FROM clients WHERE id = $1";

        const guideResult = await db.query(guideQuery, [tourResult.rows[0].tour_guide_id]);
        if (guideResult.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
            return;
        }
        const clientResult = await db.query(clientQuery, [tourResult.rows[0].client_id]);
        if (clientResult.rows.length === 0) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }

        const deleteQuery = "DELETE FROM tours WHERE id = $1 RETURNING *";
        const deleteResult = await db.query(deleteQuery, [id]);
        if (deleteResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        // Send email to the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: clientResult.rows[0].email,
            subject: "A guide has declined your tour request",
            html: `<p>Hey ${clientResult.rows[0].name},<br><br>
            Unfortunately, your tour guide, ${guideResult.rows[0].name}, is unable to show 
            you around for your tour at ${guideResult.rows[0].school}.
            Our team will be in touch soon, though, and we assure you that we are 
            working hard on finding you a very similar match to show you around ${guideResult.rows[0].school}!<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guideResult.rows[0].email,
            subject: "You have declined a tour request",
            html: `<p>Hi ${guideResult.rows[0].name},<br><br>
            <em>Unfortunate to see you decline a tour</em>, 
            but thank you for being proactive. <br><br>
            If you know anybody that could possibly give a tour like this on your campus respond 
            to this email or text 305-206-7966 for a quicker response.
            Thank you for your dedication and enthusiasm!<br><br>
            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to Josh
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "joshua.bernstein@touredit.com",
            subject: "A guide has declined a tour request",
            html: `<p>Hi Josh,<br><br>
            \t${guideResult.rows[0].name} has declined a tour request from ${clientResult.rows[0].name}
            on ${tourResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            \t <strong> The client and tour details </strong><br>\t\t
            - <strong> Client name:</strong> ${clientResult.rows[0].name}<br>\t\t
            - <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            - <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            - <strong> Tour Date: </strong> ${tourResult.rows[0].event_date}<br>\t\t
            - <strong> Tour comments: </strong> ${deleteResult.rows[0].comments} <br><br>
            \t - <strong> The guide details </strong><br>\t\t
            - <strong> Guide name:</strong> ${guideResult.rows[0].name}<br>\t\t
            - <strong> Guide email:</strong> ${guideResult.rows[0].email}<br>\t\t
            - <strong> Guide School: </strong> ${guideResult.rows[0].school} <br><br>
            Let's get to work and secure some $$$!<br><br>

            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Tour deleted successfully', tour: deleteResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.cancelTour = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Invalid request: Missing required fields' });
            return;
        }

        const tourQuery = "SELECT tour_guide_id, client_id, event_date FROM tours WHERE id = $1";
        const tourResult = await db.query(tourQuery, [id]);
        if (tourResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        const guideQuery = "SELECT email, name, school FROM tour_guides WHERE id = $1";
        const clientQuery = "SELECT email, name, phone FROM clients WHERE id = $1";

        const guideResult = await db.query(guideQuery, [tourResult.rows[0].tour_guide_id]);
        if (guideResult.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
            return;
        }
        const clientResult = await db.query(clientQuery, [tourResult.rows[0].client_id]);
        if (clientResult.rows.length === 0) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }

        const deleteQuery = "DELETE FROM tours WHERE id = $1 RETURNING *";
        const deleteResult = await db.query(deleteQuery, [id]);
        if (deleteResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        // Send email to the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: clientResult.rows[0].email,
            subject: "A guide has canceled your tour request",
            html: `<p>Hey ${clientResult.rows[0].name},<br><br>
            \t${guideResult.rows[0].name} has canceled your tour request for ${guideResult.rows[0].school}
            on ${tourResult.rows[0].event_date}. A member of our team will reach out to make sure you have a new match for that date.<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guideResult.rows[0].email,
            subject: "You have canceled a tour request",
            html: `<p>Hi ${guideResult.rows[0].name},<br><br>
            <em>Unfortunate to see you cancel a tour</em>, 
            but thank you for being proactive. <br><br>
            If you know anybody that could possibly give a tour like this on your campus respond 
            to this email or text 305-206-7966 for a quicker response.
            Thank you for your dedication and enthusiasm!<br><br>
            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to Josh
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "joshua.bernstein@touredit.com",
            subject: "A guide has canceled a tour request",
            html: `<p>Hi Josh,<br><br>
            \t${guideResult.rows[0].name} has canceled a tour request from ${clientResult.rows[0].name}
            on ${tourResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            \t - <strong> The client and tour details </strong><br>\t\t
            - <strong> Client name:</strong> ${clientResult.rows[0].name}<br>\t\t
            - <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            - <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            - <strong> Tour Date: </strong> ${tourResult.rows[0].event_date} <br>\t\t
            - <strong> Tour comments: </strong> ${deleteResult.rows[0].comments} <br><br>
            \t- <strong> The guide details </strong><br>\t\t
            - <strong> Guide name:</strong> ${guideResult.rows[0].name}<br>\t\t
            - <strong> Guide email:</strong> ${guideResult.rows[0].email}<br>\t\t
            - <strong> Guide School: </strong> ${guideResult.rows[0].school} <br><br>
            Let's get to work and secure some $$$!<br><br>

            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Tour canceled successfully', tour: deleteResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
