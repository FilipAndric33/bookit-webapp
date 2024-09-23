const Apartment = require('../../models/Apartments');
const User = require("../../models/Users");
const fs = require("fs");
const path = require('path');

const deleteApartmentV1 = async (req, res) => {
    const apartmentID = decodeURIComponent(req.query.apartment);
    const userID = decodeURIComponent(req.query.user);

    try {
        const apartment = await Apartment.findById(apartmentID);

        if(apartment.images && apartment.images.length > 0) {
            apartment.images.forEach(imagePath => {
                fs.unlink(imagePath, (err) => {
                    if(err) {
                        console.error(`Error deleting image: ${imagePath}`);
                    };
                });
            });
        };

        await Apartment.findByIdAndDelete(apartmentID);
        const user = await User.findById(userID);
        if(!user) {
            res.status(401).json({ message: "non existent user."});
        };
        user.apartments = user.apartments.filter(apartment => apartment.toString() !== apartmentID);
        user.save();

        res.status(200).json({ message: apartmentID});
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

module.exports = deleteApartmentV1;