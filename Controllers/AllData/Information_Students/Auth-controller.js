const { validationResult } = require('express-validator');
const StudentInfo = require('../../../models/Info_Student'); // Assuming there's a model for student information
const fs = require('fs');

const sendInfoStudents = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, className, roll, section, Image } = req.body; // Changed `class` to `className`

        // Check if the roll number already exists in the database
        const existingInfo = await StudentInfo.findOne({ roll });
        if (existingInfo) {
            return res.json('Roll number already exists');
        }

        // If the roll number is unique, save the new information
        const information = new StudentInfo({ name, className, roll, section, Image }); // Changed `class` to `className`
        await information.save();
        res.status(201).json({ message: 'Information uploaded successfully' });
    } catch (error) {
        console.error('Error uploading information:', error);
        res.status(500).json({ error: 'Failed to upload information. Please try again later.' });
    }
};

const getInfoStudents = async (req, res) => {
    try {
        const information = await StudentInfo.find();
        res.status(200).json(information);
    } catch (error) {
        console.error('Error fetching information:', error);
        res.status(500).json({ error: 'Failed to fetch information. Please try again later.' });
    }
};

module.exports = {
    sendInfoStudents,
    getInfoStudents,
};
