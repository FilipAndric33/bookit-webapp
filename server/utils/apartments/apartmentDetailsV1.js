const Apartment = require('../../models/Apartments');

const apartmentDetailsV1 = (async (req, res) => {
    let { id } = req.body;
 
    try {
        let apartment = await Apartment.findById(id);
        if(!apartment) {
            res.status(500).json({ message: "internal server error " });
        }
        res.json(apartment);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "internal server error " });
    };
});

module.exports = apartmentDetailsV1;