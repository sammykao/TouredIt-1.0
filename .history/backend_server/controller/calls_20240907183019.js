const db = require("./../database/db");

exports.getClientCalls = async (req, res) => {
    try {
        const { email } = req.body; // Assuming req.body contains the client email 
        if (!email) {
            res.status(400).json({ message: 'Invalid client email' });
            return;
        }

        // Query to get the call for the specific client including the tour guide's name and confirmation status
        const query = `
            SELECT 
                c.event_date AS date, c.school, tg.name AS guide, c.confirmed
            FROM 
                calls c
            INNER JOIN 
                tour_guides tg ON c.tour_guide_id = tg.id
            INNER JOIN
                clients cl ON c.client_id = cl.id
            WHERE 
                LOWER(cl.email) = LOWER($1)`;
        
        const values = [email];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No calls found for the specified client" });
        } else {
            // Separate the calls into confirmed and non-confirmed arrays
            const confirmedCalls = result.rows.filter(call => call.confirmed);
            const nonConfirmedCalls = result.rows.filter(call => !call.confirmed);
            
            res.status(200).json({ confirmedCalls, nonConfirmedCalls });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.sendCustomCall = async (req, res) => {
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
            Thank you for submitting a request for a video chat. Our team moves very quickly and will make sure a match 
            is found. We normally price calls at $50 for a 60 minute session. We appreciate your support and if 
            you ever need anything, email us at info@touredit.com.<br><br>
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
            to:  ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "New Custom Call Request",
            html: `<p>Hi TouredIt Team,<br><br>
            You have a new custom call request. Here are the details:<br>
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
                <li><strong>Where they heard of us:</strong> ${data.source}</li>
                <li><strong>Additional Info:</strong> ${data.additionalInfo}</li>
            </ul><br>${additionalText}<br>
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



exports.sendCall = async (req, res) => {
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

        // Insert call details into the Calls table
        const insertQuery = `
            INSERT INTO Calls (event_date, tour_guide_id, client_id, school, comments)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.date, tour_guide_id, client_id, school, data.comments];

        const insertResult = await db.query(insertQuery, values);

    

        // Prepare email options for the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Thanks for sending a request",
            html: `<p>Hi there!<br><br>
            Thank you for submitting a request for a video chat. Our team moves very quickly 
            and will make sure that the requested student responds soon. We normally price
            video chats at $50 for a 60 minute session.<br><br>We appreciate your support 
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
            subject: "You have a new video chat request",
            html: `<p>Hi there!<br><br>
            Congratulations! You have a new video chat request through TouredIt.
            <br><br>Please visit your guide portal at https://www.toureditguides.com/sign-in 
            to accept or decline the request. If you accept, you'll receive an email with the next steps. 
            <br><br>Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to guide', error: emailResult.error });
            return;
        }

       
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "A guide got a video chat request",
            html: `<p>Hi there!<br><br>
            ${guide_email} got a video chat request for ${school} on ${data.date}. <br><br> 
            We will need confirm with both parties about the details of the tour, 
            how much to invoice the client, and how much to pay the guide.<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to guide', error: emailResult.error });
            return;
        }

        res.status(200).json({ message: 'Call request submitted successfully', call: insertResult.rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.retrieveGuideCalls = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: 'Invalid guide email' });
            return;
        }

        const query = `
            SELECT
                c.event_date AS date, c.school, cl.name,
                cl.email, cl.phone, c.confirmed, c.id AS id, 
                c.comments
            FROM
                calls c
            INNER JOIN
                tour_guides tg ON c.tour_guide_id = tg.id
            INNER JOIN
                clients cl ON c.client_id = cl.id
            WHERE
                LOWER(tg.email) = LOWER($1)`;
        const values = [email];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No calls found for the specified guide' });
        } else {
            const confirmedCalls = result.rows.filter(call => call.confirmed);
            const nonConfirmedCalls = result.rows.filter(call => !call.confirmed);
            res.status(200).json({ confirmedCalls, nonConfirmedCalls });
        }

    } catch (error) {
        console.error('Error retrieving calls:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteGuideCall = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Invalid request: Missing required fields' });
            return;
        }

        const callQuery = "SELECT tour_guide_id, client_id, event_date FROM calls WHERE id = $1";
        const callResult = await db.query(callQuery, [id]);
        if (callResult.rows.length === 0) {
            res.status(404).json({ message: 'Call not found' });
            return;
        }

        const guideQuery = "SELECT email, name, school FROM tour_guides WHERE id = $1";
        const clientQuery = "SELECT email, name, phone FROM clients WHERE id = $1";

        const guideResult = await db.query(guideQuery, [callResult.rows[0].tour_guide_id]);
        if (guideResult.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
            return;
        }
        const clientResult = await db.query(clientQuery, [callResult.rows[0].client_id]);
        if (clientResult.rows.length === 0) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }

        const deleteQuery = "DELETE FROM tours WHERE id = $1 RETURNING *";
        const deleteResult = await db.query(deleteQuery, [id]);
        if (deleteResult.rows.length === 0) {
            res.status(404).json({ message: 'Call not found' });
            return;
        }

        // Send email to the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: clientResult.rows[0].email,
            subject: "A student has declined your video chat request",
            html: `<p>Hey ${clientResult.rows[0].name},<br><br>
            Unfortunately, ${guideResult.rows[0].name}, is unable to chat 
            with you about ${guideResult.rows[0].school}.
            Our team will be in touch soon, though, and we assure you that we are 
            working hard on finding you a very similar match to talk to you about 
            ${guideResult.rows[0].school}!<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guideResult.rows[0].email,
            subject: "You have declined a video chat request",
            html: `<p>Hi ${guideResult.rows[0].name},<br><br>
            <em>Unfortunate to see you decline a video chat</em>, 
            but thank you for being proactive. <br><br>
            If you know anybody that could possibly take this video chat
            on your campus respond to this email or text 305-206-7966 
            for a quicker response. Thank you for your dedication and enthusiasm!<br><br>
            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);
        
        // Send email to team
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "A guide has declined a video chat request",
            html: `<p>Hi Team,<br><br>
            \t${guideResult.rows[0].name} has declined a video chat from ${clientResult.rows[0].name}
            on ${callResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            \t <strong> The client and call details </strong><br>\t\t
            - <strong> Client name:</strong> ${clientResult.rows[0].name}<br>\t\t
            - <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            - <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            - <strong> Call Date: </strong> ${callResult.rows[0].event_date}<br>\t\t
            - <strong> Call comments: </strong> ${deleteResult.rows[0].comments} <br><br>
            \t - <strong> The guide details </strong><br>\t\t
            - <strong> Guide name:</strong> ${guideResult.rows[0].name}<br>\t\t
            - <strong> Guide email:</strong> ${guideResult.rows[0].email}<br>\t\t
            - <strong> Guide school: </strong> ${guideResult.rows[0].school} <br><br>
            ${additionalText}<br>
            Let's get to work and secure some $$$!<br><br>

            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Chat deleted successfully', call: deleteResult.rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancelGuideCall = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Invalid request: Missing required fields' });
            return;
        }

        const callQuery = "SELECT tour_guide_id, client_id, event_date FROM tours WHERE id = $1";
        const callResult = await db.query(tourQuery, [id]);
        if (callResult.rows.length === 0) {
            res.status(404).json({ message: 'Tour not found' });
            return;
        }

        const guideQuery = "SELECT email, name, school FROM tour_guides WHERE id = $1";
        const clientQuery = "SELECT email, name, phone FROM clients WHERE id = $1";

        const guideResult = await db.query(guideQuery, [callResult.rows[0].tour_guide_id]);
        if (guideResult.rows.length === 0) {
            res.status(404).json({ message: 'Guide not found' });
            return;
        }
        const clientResult = await db.query(clientQuery, [callResult.rows[0].client_id]);
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
            on ${callResult.rows[0].event_date}. A member of our team will reach out to make sure you have a new match for that date.<br><br>
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
        let additionalText = "";
        if (callResult.rows[0].greek_life) {
            additionalText += "<br><br>They also opted into the <strong> greek life </strong> package for an extra $50.";
        }
        if (callResult.rows[0].student_athlete) {
            additionalText += "<br><br>They also opted into the <strong> student athlete </strong>package for an extra $50.";
        }
        if (callResult.rows[0].paid_internship) {
            additionalText += "<br><br>They also opted into the <strong> paid internship chat </strong> package for an extra $40.";
        }
        // Send email to Josh
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "A guide has canceled a tour request",
            html: `<p>Hi Josh,<br><br>
            \t${guideResult.rows[0].name} has canceled a tour request from ${clientResult.rows[0].name}
            on ${callResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            \t - <strong> The client and tour details </strong><br>\t\t
            - <strong> Client name:</strong> ${clientResult.rows[0].name}<br>\t\t
            - <strong> Client email:</strong> ${clientResult.rows[0].email}<br>\t\t
            - <strong> Client phone:</strong> ${clientResult.rows[0].phone}<br>\t\t
            - <strong> Tour Date: </strong> ${callResult.rows[0].event_date} <br>\t\t
            - <strong> Tour comments: </strong> ${deleteResult.rows[0].comments} <br><br>
            \t- <strong> The guide details </strong><br>\t\t
            - <strong> Guide name:</strong> ${guideResult.rows[0].name}<br>\t\t
            - <strong> Guide email:</strong> ${guideResult.rows[0].email}<br>\t\t
            - <strong> Guide School: </strong> ${guideResult.rows[0].school} <br><br>
            ${additionalText}<br>
            Let's get to work and secure some $$$!<br><br>

            Warmly,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Tour canceled successfully', tour: deleteResult.rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
