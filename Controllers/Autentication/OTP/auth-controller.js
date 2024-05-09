const { validationResult } = require('express-validator');
const OTP = require('../../../models/OtpData');
const User = require('../../../models/LoginData');

const verifyOtp = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, otp } = req.body;

        const OTPverify = await OTP.findOne({ email: email });

        if (!OTPverify) {
            return res.status(400).json({ error: 'OTP not found. Please sign up again.' });
        }

        if (OTPverify.otp === otp) {
            res.json("OTP verified successfully");
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = verifyOtp;
