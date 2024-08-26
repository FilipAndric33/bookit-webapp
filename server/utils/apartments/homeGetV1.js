const Apartment = require('../../models/Apartments');

const homeGetV1 = (async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: err });
    };
});

module.exports = homeGetV1;