const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Collection = require('../../../models/LoginData');
const OtpData = require('../../../models/OtpData')
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { UserName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Collection({ UserName, email, password: hashedPassword });
        await newUser.save();
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        const Info = new OtpData({ email, otp });
        await Info.save();
    
        // Create transporter using Gmail SMTP

        const mailOptions = {
            from: 'process.env.EMAIL_USER',
            to: email,
            subject: 'Verification OTP',
            text: `Your OTP for verification is ${otp}.`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error('Failed to send email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                return res.status(201).json({ message: "OTP sent successfully" });
            }
        });
        return res.status(201).json("User created successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = createUser;
