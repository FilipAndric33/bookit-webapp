const Apartment = require('../../models/Apartments');
const User = require('../../models/Users');

const addV1 = (async (req, res) => {
    try {
        const{
            location,
            guests,
            apartmentSize,
            airConditioning,
            heating,
            balcony,
            parking,
            freeWifi,
            privateBathroom,
            smoking,
            kitchen,
            description,
            owner,
            startPrice,
            availability
        } = req.body;

        const availableDates = JSON.parse(availability).map(date => new Date(date));
        const images = req.files.map(file => (file.path));;

        const apartment = new Apartment({
            location,
            guests,
            apartmentSize: parseFloat(apartmentSize),
            airConditioning: airConditioning === "false",
            heating: heating === "false",
            balcony: balcony === "false",
            parking: parking === "false",
            freeWifi: freeWifi === "false",
            privateBathroom: privateBathroom === "false",
            smoking: smoking === "false",
            kitchen: kitchen === "false",
            owner,
            description,
            images,
            startPrice: parseFloat(startPrice),
            availability: availableDates
        });

        await apartment.save();

        await User.findByIdAndUpdate(req.body.owner, {
            $push: { apartments: apartment._id }
        });

        res.status(200).json({ message: "Property added successfully!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "internal server error" });
    }
});

module.exports = addV1;