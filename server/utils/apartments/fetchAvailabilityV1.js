const Apartment = require ('../../models/Apartments');

const fetchAvailabilityV1 = (async (req, res) => {
    try {
        const locations = await Apartment.distinct("location");
        const guests = await Apartment.distinct("guests");
        res.json({locations, guests});
    } catch (err) {
        res.status(500).json({ message: "Server side error " });
    };
});

module.exports = fetchAvailabilityV1;