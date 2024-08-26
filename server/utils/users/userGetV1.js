const User = require('../../models/Users');

const userGetV1 = (async (req, res) => {
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

module.exports = userGetV1;