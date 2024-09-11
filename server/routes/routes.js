const express = require('express');
const router = express.Router();
const controller = require('../controller');
const upload = require('../middleware/uploadMiddleware');
const authenticate = require('../middleware/authMiddleware');

router.get('/home', controller.homeGet);
router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);
router.post('/user',  authenticate, controller.userGet);
router.post('/add', authenticate,  upload.array('images', 10), controller.add);
router.post('/apartmentDetails', controller.apartmentDetails);
router.post('/ownerNumber', controller.ownerNumber);
router.post('/removeDates', controller.removeDates);

module.exports= router;