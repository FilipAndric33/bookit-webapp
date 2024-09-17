const Apartment = require ('../../models/Apartments');

const locateApartmentsV1 = (async (req, res) => {
    const location = decodeURIComponent(req.query.location);
    const guests = decodeURIComponent(req.query.guests);
    const priceRange = decodeURIComponent(req.query.priceRange);
    const selectedDate = decodeURIComponent(req.query.selectedDate);
    const dates = selectedDate.split(",");
    const queryDates = dates.map(date => (new Date (date)));

    const query = {};

    if(location) {
        query.location = location;
    }; 
    if(guests) {
        query.guests = { $gte: parseInt(guests)};
    }; 
    if(priceRange) {
        query.startPrice = { $lte: parseFloat(priceRange) };
    }; 
    if(selectedDate) {
        query.availability = { $all: queryDates };
    }; 

    try {
        console.log(query);
        const apartments = await Apartment.find(query);
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: "server error: " , err });
    }
})

module.exports = locateApartmentsV1;