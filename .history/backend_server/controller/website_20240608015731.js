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

        // Perform validation on the new account
        if (!account.email) {
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

}