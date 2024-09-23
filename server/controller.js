const homeGetV1 = require('./utils/apartments/homeGetV1');
const registerPostV1 = require('./utils/users/registerPostV1');
const loginPostV1 = require('./utils/users/loginPostV1');
const userGetV1 = require('./utils/users/userGetV1');
const addV1 = require('./utils/apartments/addV1');
const apartmentDetailsV1 = require('./utils/apartments/apartmentDetailsV1');
const ownerNumberV1 = require('./utils/users/ownerNumberV1');
const removeDatesV1 = require('./utils/apartments/removeDatesV1');
const locateApartmentsV1 = require('./utils/apartments/locateApartmentsV1');
const fetchAvailabilityV1 = require('./utils/apartments/fetchAvailabilityV1');
const deleteApartmentV1 = require('./utils/apartments/deleteApartmentV1');

const homeGet = async (req, res) => homeGetV1(req,res);
const registerPost = async (req, res) => registerPostV1(req, res);
const loginPost = async (req, res) => loginPostV1(req, res);
const userGet = async (req, res) => userGetV1(req, res);
const add = async (req, res) => addV1(req, res);
const apartmentDetails = async (req, res) => apartmentDetailsV1(req, res);
const ownerNumber = async (req, res) => ownerNumberV1(req, res);
const removeDates = async (req, res) => removeDatesV1(req, res);
const locateApartments = async (req, res) => locateApartmentsV1(req, res);
const fetchAvailability = async (req, res) => fetchAvailabilityV1(req, res);
const deleteApartment = async (req, res) => deleteApartmentV1(req, res);

module.exports= {
    homeGet,
    registerPost,
    loginPost,
    userGet,
    add,
    apartmentDetails,
    ownerNumber,
    removeDates,
    locateApartments,
    fetchAvailability,
    deleteApartment
};