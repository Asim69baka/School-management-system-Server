const { validationResult } = require('express-validator');
const TeacherInfo = require('../../../models/Info_Teacher');
const fs = require('fs');

const sendInfoTeachers = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, department, phoneNumber, Image } = req.body;

        // Check if the phone number already exists in the database
        const existingInfo = await TeacherInfo.findOne({ phoneNumber });
        if (existingInfo) {
            return res.json('Phone number already exists');
        }

        // If the phone number is unique, save the new information
        const information = new TeacherInfo({ name, department, phoneNumber, Image });
        await information.save();
        res.status(201).json({ message: 'Information uploaded successfully' });
    } catch (error) {
        console.error('Error uploading information:', error);
        res.status(500).json({ error: 'Failed to upload information. Please try again later.' });
    }
};

const getInfoTeachers = async (req, res) => {
    try {
        const information = await TeacherInfo.find();
        res.status(200).json(information);
    } catch (error) {
        console.error('Error fetching information:', error);
        res.status(500).json({ error: 'Failed to fetch information. Please try again later.' });
    }
};
module.exports = {
    sendInfoTeachers,
    getInfoTeachers,
};
