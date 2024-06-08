
exports.getClientAccounts = async (req, res) => {
    try {
        const newListing = req.body; // Assuming req.body contains the new listing data

        // Perform validation on the new listing data
        if (!isValidListing(newListing)) {
            res.status(400).json({ message: 'Invalid listing data' });
            return;
        }

        PropertyListing.createListing(newListing, (error, savedListing) => {
            if (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(201).json(savedListing);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};