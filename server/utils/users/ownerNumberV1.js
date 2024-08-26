const User = require('../../models/Users');

const ownerNumberV1 = (async (req, res) => {
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

module.exports = ownerNumberV1;