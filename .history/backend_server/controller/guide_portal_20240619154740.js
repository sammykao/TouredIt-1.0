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
        const values = [account.email, account.name, account.school, account.phone, account.hometown,
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
        const query = `INSERT INTO hobbies (tourguide_id, hobby_name, description) VALUES ($1, $2, $3) RETURNING *`;
            const values = [account.tourguide_id, account.hobby_name, account.description];

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
            INSERT INTO campus_involvement (tourguide_id, activity_name, description) VALUES ($1, $2, $3) RETURNING *`;
            const values = [account.tourguide_id, account.activity_name, account.description];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Involvement added', account: result.rows[0] });
        
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
            DELETE FROM hobbies where id = $1`;
            const values = [account.id];

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
                instagram = ()

            WHERE 
                email = $2
            Returning
                *`;
            const values = [ account.name, account.email, account.school, account.phone, account.hometown, account.bio, account.major, account.secondary_major, account.minor, account.secondary_minor, account.profile_image_url];

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
                tg.profile_image_url, tg.num_tours,
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
