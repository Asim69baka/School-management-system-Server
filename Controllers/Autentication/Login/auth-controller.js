
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Collection = require('../../../models/LoginData');

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if the user exists
        const user = await Collection.findOne({ email });
        if (!user) {
            return res.status(404).json( "User not found" );
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = loginUser
