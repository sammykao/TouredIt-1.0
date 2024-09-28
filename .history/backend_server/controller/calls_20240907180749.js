const db = require("./../database/db");

exports.getClientCalls = async (req, res) => {
    try {
        const { email } = req.body; // Assuming req.body contains the client email 
        if (!email) {
            res.status(400).json({ message: 'Invalid client email' });
            return;
        }

        // Query to get the tours for the specific client including the tour guide's name and confirmation status
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
            // Separate the tours into confirmed and non-confirmed arrays
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
            Thank you for submitting a request for a call. Our team moves very quickly and will make sure a match 
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

        // Insert tour details into the Tours table
        const insertQuery = `
            INSERT INTO Calls (event_date, tour_guide_id, client_id, school, comments)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.date, tour_guide_id, client_id, school, data.comments, data.greek_life, data.student_athlete, data.paid_internship];

        const insertResult = await db.query(insertQuery, values);

        // Prepare the additional text based on the selections
        let additionalText = "";
        if (data.greek_life) {
            additionalText += "<br><br>You also requested the <strong> greek life experience</strong> add-on package for an extra $50, we'll add that to the request.";
        }
        if (data.student_athlete) {
            additionalText += "<br><br>You also requested the <strong> student athlete life</strong> add-on package for an extra $50, we'll add that to the request.";
        }
        if (data.paid_internship) {
            additionalText += "<br><br>You also opted into the <strong> internship insights </strong> add-on package for an extra $40, we'll add that to the request.";
        }

        // Prepare email options for the client
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Thanks for sending a request",
            html: `<p>Hi there!<br><br>
            Thank you for submitting a request for a tour. Our team moves very quickly 
            and will make sure that the requested guide responds soon. We normally price
            tours at $150 for a 90 minute session. ${additionalText}<br><br>We appreciate your support 
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


        additionalText = "";
        if (data.greek_life) {
            additionalText += "<br><br>The client also requested the <strong> greek life experience</strong> add-on package, that would pay you another $25. \
            You would spend an extra 30 minutes helping them learn about the greek life on campus, the rush process, and even see your respective frat or sorority \
            house(s).";
        }
        if (data.student_athlete) {
            additionalText += "<br><br>The client also requested the <strong> student athlete life</strong> add-on package, that would pay you another $25. \
            You would spend an extra 30 minutes helping them learn about the recruiting process, balancing academics and athletics, and even see athlete \
            facilities.";
        }
        if (data.paid_internship) {
            additionalText += "<br><br>The client also opted into the <strong> internship insights </strong> add-on package, that would pay you another $20. \
            You would spend an extra 30 minutes helping them learn about the internship recruitment process, how to get internships as a college student, and \
            resume/linkedIn review.";
        }
        // Prepare email options for the guide
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guide_email,
            subject: "You have a new tour request",
            html: `<p>Hi there!<br><br>
            Congratulations! You have a new tour guide request through TouredIt.
            ${additionalText}<br><br>Please visit your tour guide portal at https://www.toureditguides.com/sign-in 
            to accept or decline the request. There you can also see any added package 
            requests that you will be paid extra for. If you accept, you'll receive an email with the next steps. 
            Then, our team will confirm with both parties about the details of the tour 
            and how much to pay you.<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        emailResult = await sendEmailWithRetry(mailOptions);
        if (!emailResult.success) {
            res.status(500).json({ message: 'Error sending email to guide', error: emailResult.error });
            return;
        }

        additionalText = "";
        if (data.greek_life) {
            additionalText += "<br><br>The client also requested the <strong> greek life experience</strong> add-on package for another $50.";
        }
        if (data.student_athlete) {
            additionalText += "<br><br>The client also requested the <strong> student athlete life</strong> add-on package for another $50.";
        }
        if (data.paid_internship) {
            additionalText += "<br><br>The client also opted into the <strong> internship insights </strong> add-on package fpr another $40.";
        } 
        if (data.referral_code) {
            additionalText += "<br><br>The client also used a referral code. Here is the information about the code - " + data.referral_code;
        }
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "A guide got a tour request",
            html: `<p>Hi there!<br><br>
            ${guide_email} got a tour request for ${school} on ${data.date}. ${additionalText}<br><br> 
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

        res.status(200).json({ message: 'Tour request submitted successfully', tour: insertResult.rows[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
