const User = require('../../models/Users');

const registerPostV1 = (async (req, res) => {
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

module.exports = registerPostV1;