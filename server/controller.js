require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/Users');
const Apartment = require('./models/Apartments');

const homeGet = (async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: err });
    };
});

const registerPost = (async (req, res) => {
    const { username, password, phoneNumber, cardNumber, expiryDate, cvv } = req.body;

    try {
        let user = await User.findOne({ username })
        if (user){ 
            res.status(409).json({ message: "This username already exists." });
        }

        let card = {
            phoneNumber: phoneNumber,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv
        };

        user = new User({ username, password, phoneNumber, card });
        await user.save();
        res.status(200).json({ message: "Account saved successfully" });
    } 
    catch (err) {
        res.status(500).json({ message: "Server side error while making account." });
    };
});

const loginPost = (async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ message: "this user does not exist." });
        };
        
        let match = await user.matchPassword(password);
        if(!match) {
            return res.status(400).json({ message: "the password is incorrect." });
        }   

        const payload = {
            id: user._id,
            name: user.username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
        return res.json({ token });
    } catch(err) {
        res.status(500).json({ message: "server side error while logging in." });
    }
});

const userGet = (async (req, res) => {
    let {id} = req.body;

    try {
        let user = await User.findById(id);
        if(!user) {
            res.status(500).json({ message: "Internal server error." });
        } 
        res.json(user);
    } catch(err) {
        console.error(err);
    };
});

const add = (async (req, res) => {
    try {
        const{
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

const apartmentDetails = (async (req, res) => {
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

const ownerNumber = (async (req, res) => {
    const { id } = req.body;

    try {
        const owner = await User.findById(id);
        if(!owner) {
            res.status(500).json({ message: "internal server error " });
        } 
        res.json(owner.phoneNumber);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "internal server error " });
    };
});

const removeDates = (async (req, res) => {
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

module.exports= {
    homeGet,
    registerPost,
    loginPost,
    userGet,
    add,
    apartmentDetails,
    ownerNumber,
    removeDates
};