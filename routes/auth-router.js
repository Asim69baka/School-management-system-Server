const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





const createUser = require('../Controllers/Autentication/register/auth-controller')
router.post('/signup', [
    body('UserName').isLength({ min: 3 }), // Adjusted field name and validation
    body('email').isEmail(),
    body('password').isLength({ min: 5 }) // Adjusted minimum password length
], createUser)

const loginUser = require('../Controllers/Autentication/Login/auth-controller')
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], loginUser)

const verifyOtp = require("../Controllers/Autentication/OTP/auth-controller");


router.post('/verifyOTP', [body('email')], verifyOtp)

//Teachers data

const { sendInfoTeachers, getInfoTeachers } = require("../Controllers/AllData/Information_Teachers/auth-controller")

router.post(
    '/sendDataTeachers', upload.single('image'), sendInfoTeachers
);

router.get('/getDataTeachers', getInfoTeachers);

const { deleteInfoTeachers } = require('../Controllers/AllData/DeleteInfo/auth-controller');
router.delete('/deleteInfoTeachers/:id', deleteInfoTeachers);

//Students Data

const { sendInfoStudents, getInfoStudents } = require('../Controllers/AllData/Information_Students/Auth-controller')

router.post(
    '/sendDataStudents', upload.single('image'), sendInfoStudents
)

router.get('/getDataStudents', getInfoStudents)

const { deleteInfoStudents } = require('../Controllers/AllData/DeleteInfo/auth-controller')
router.delete('/deleteInfoStudents/:id', deleteInfoStudents);







module.exports = router