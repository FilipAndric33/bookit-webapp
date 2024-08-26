const Apartment = require('../../models/Apartments');

const removeDatesV1 = (async (req, res) => {
    const { dates, id } = req.body;
    
    try {
        const apartment = await Apartment.findById(id);
        if(!apartment) {
            res.status(500).json({ message: "internal server error" });
            return;
        };
        
        const dateObjects = dates.map(date => (new Date(date))); 
        
        apartment.availability = apartment.availability.filter((availableDate) => {
            const availableDateObject = new Date(availableDate);

            return !dateObjects.some(date => date.getTime() === availableDateObject.getTime());
        });

        if (apartment.availability.length === 0) {
            await Apartment.findByIdAndDelete(id);
            return res.status(200).json({ message: "Apartment deleted as no dates are available" });
        }

        await apartment.save();
        return res.status(200).json({ message: "success" });
    } catch(err) {
        return res.status(500).json({ message: "internal server error" });

    };
});

module.exports = removeDatesV1;