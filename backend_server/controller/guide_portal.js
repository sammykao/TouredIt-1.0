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
        const query = "INSERT INTO tour_guides (name, email, hometown, phone, bio, major, secondary_major, minor, secondary_minor, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
        const values = [account.email, account.name, account.phone];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Account created', account: result.rows[0] });
        
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
        const query = "UPDATE tour_guides  SET  (name, email, hometown, phone, bio, major, secondary_major, minor, secondary_minor, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE email = $1";
        const values = [account.email, account.name, account.phone];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'Account updated', account: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isValidAccount = (account) => {
    return (account.email && account.name && account.phone && account.hometown && account.bio && account.major && account.profile_image_url);
};

exports.retrieveGuideInfo = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new account data

        // Perform validation on the  account
        if (!account.email) {
            res.status(400).json({ message: 'Invalid account data' });
            return;
        }

        // Retrieve the account from the database
        const query = "SELECT name, email, hometown, phone, bio, major, secondary_major, minor, secondary_minor, profile_image_url FROM tour_guides WHERE email = $1";
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

}

exports.retrieveGuideTours = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the tour guides

        // Perform validation on the  account
        if (!account.tour_guide_id) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }

        // Retrieve the account from the database
        const query = "SELECT event_date, event_time, school, completed, confirmed FROM tours WHERE tour_guide_id = $1";
        const values = [account.email];

        const result = await db.query(query, values);

        if (result == 0) {
            res.status(404).json({ message: "No tours found"});
        } else {
            res.status(201).json({ account: result.rows[0] });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}