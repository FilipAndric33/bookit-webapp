const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    images: {
        type: [ String ],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    apartmentSize: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    airConditioning: {
        type: Boolean, 
        required: true,
        default: false 
    },
    heating: {
        type: Boolean, 
        required: true,
        default: false 
    }, 
    balcony: {
        type: Boolean, 
        required: true,
        default: false 
    },
    parking: {
        type: Boolean, 
        required: true,
        default: false 
    },
    freeWifi: {
        type: Boolean, 
        required: true,
        default: false 
    },
    privateBathroom: {
        type: Boolean, 
        required: true,
        default: false 
    },
    smoking: {
        type: Boolean, 
        required: true,
        default: false 
    },
    kitchen: {
        type: Boolean, 
        required: true,
        default: false 
    },
    description: {
        type: String,
        required: true
    },
    availability: {
            type: [Date],
            required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Apartments', apartmentSchema);