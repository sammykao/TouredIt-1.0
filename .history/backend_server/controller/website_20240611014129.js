const db = require("./../database/db")


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
        const query = "SELECT email, name, phone FROM clients WHERE email = $1";
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

exports.getAllGuides = aync (req, res) => {
    const search = req.body; // Says search, but filter by colleges for now

    if (!search.school) {
        res.status(400).json({ message: 'Must provide a school to get guides for' });
        return;
    }





};