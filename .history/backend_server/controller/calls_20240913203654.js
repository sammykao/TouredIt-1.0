const db = require("./../database/db");
const process = require('process');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { Vonage } = require('@vonage/server-sdk');  // Vonage SDK
const { VideoSession } = require('@vonage/video-express'); // Vonage Video API

dotenv.config();

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APP_ID,
    privateKey: process.env.VONAGE_PRIVATE_KEY_PATH,
});

// Helper function to create a Vonage Video Session
const createVonageVideoSession = async () => {
    const session = new VideoSession(vonage);
    const sessionData = await session.createSession({
        mediaMode: 'routed', // For P2P, use 'relayed'
        archiveMode: 'always', // For recording purposes, optional
    });

    return sessionData; // Session data includes sessionId
};

// Helper function to generate a JWT token for the session
const generateVonageVideoToken = (sessionId) => {
    const token = vonage.video.generateToken(sessionId, {
        expireTime: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // Token expires in 7 days
        role: 'publisher', // Role can be 'publisher' or 'subscriber'
    });

    return token;
};

// Create a new Vonage Video session and return the token and session details
const createVonageVideoCall = async () => {
    try {
        const session = await createVonageVideoSession();
        const token = generateVonageVideoToken(session.sessionId);

        return {
            token,
            sessionId: session.sessionId, // Return sessionId and token
        };

    } catch (error) {
        console.error("Error creating Vonage Video session:", error);
        throw new Error("Could not create Vonage Video session.");
    }
};

// Email transport configuration
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

// Retry function for email
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

// Confirm Guide Call function (modified to use Vonage)
exports.confirmGuideCall = async (req, res) => {
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

        // Update call to confirmed in the database
        const updateQuery = "UPDATE calls SET confirmed = true WHERE id = $1 RETURNING *";
        const insertResult = await db.query(updateQuery, [id]);
        if (insertResult.rows.length === 0) {
            res.status(404).json({ message: 'Call not found' });
            return;
        }

        // Create a Vonage Video session for the guide and client
        const videoSession = await createVonageVideoCall();
        const emailLink = `https://your-app-url.com/video/${videoSession.sessionId}?token=${videoSession.token}`;

        // Send session token and info to the client via email
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: clientResult.rows[0].email,
            subject: "A guide has accepted your video chat request",
            html: `<p>Hey ${clientResult.rows[0].name},<br><br>
            Good news, ${guideResult.rows[0].name} has accepted your video chat request and
            will be in touch very soon! They are excited and ready to chat with you about ${guideResult.rows[0].school} 
            and will reach out about specific scheduling logistics. <br><br>
            &#8226; Vonage Video Call Link: <a href="${emailLink}">${emailLink}</a><br><br> 
            <br><br>If you have any questions or run into any issues, feel free to email info@touredit.com 
            and someone from our team will answer within 24 hours! Have a great chat!.<br><br>
            Warm regards,<br>
            <strong>TouredIt Team</strong>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send session token and info to the guide via email
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: guideResult.rows[0].email,
            subject: "Thanks for accepting a video chat",
            html: `<p>Hey ${guideResult.rows[0].name},<br><br>
            <em>Congratulations on being selected to video chat!</em> 
            Thank you for taking on this important role. Here are your next steps 
            to ensure a smooth and successful video chat experience: 
            <br><br>
            &#8226; Vonage Video Call Link: <a href="${emailLink}">${emailLink}</a><br><br> 
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        // Send email to TouredIt team
        mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: ["info@touredit.com", "joshua.bernstein@touredit.com", "sammy.kao@touredit.com"],
            subject: "A guide has accepted a video chat request",
            html: `<p>Hi Team,<br><br>
            ${guideResult.rows[0].name} has accepted a video chat request from ${clientResult.rows[0].name}
            on ${callResult.rows[0].event_date} for ${guideResult.rows[0].school}.<br><br>
            </p>`
        };

        await sendEmailWithRetry(mailOptions);

        res.status(200).json({ message: 'Call request confirmed successfully', call: insertResult.rows[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
