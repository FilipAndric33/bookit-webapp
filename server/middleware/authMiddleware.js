const authenticate = (req, res, next) => {
    const token = req.body;
    
    if(!token) {
        res.status(400).json({ message: "the user is not verified."});
    }

        next();
} 

module.exports = authenticate;