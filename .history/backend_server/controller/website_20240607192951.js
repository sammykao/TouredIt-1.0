const db = require("./../database/d")


exports.getClientAccounts = async (req, res) => {
    try {
        const account = req.body; // Assuming req.body contains the new listing data

        // Perform validation on the new listing data
        if (!isValidListing(newListing)) {
            res.status(400).json({ message: 'Invalid listing data' });
            return;
        }

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};