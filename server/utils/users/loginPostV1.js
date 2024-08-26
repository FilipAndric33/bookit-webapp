const User = require('../../models/Users');
const jwt = require('jsonwebtoken');

const loginPostV1 = (async (req, res) => {
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

module.exports = loginPostV1;