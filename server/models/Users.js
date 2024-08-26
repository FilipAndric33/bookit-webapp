const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    card: {
        cardNumber: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
        cvv: {
            type: String,
            required: true
        }
    }, 
    apartments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartments'
    }]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    };
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);