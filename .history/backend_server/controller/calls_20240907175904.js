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
                c.event_date AS date, t.school, tg.name AS guide, t.confirmed, 
                t.greek_life, t.student_athlete, t.paid_internship
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