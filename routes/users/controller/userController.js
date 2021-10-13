const User = require("../model/User");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/errorHandler/errorHandler');

async function createUser(req, res) {

    const { firstName, lastName, username, email, password } = req.body;

    try {

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed,
        });

        let savedUser = await createdUser.save();

        res.json({ message: "success", payload: savedUser });

    } catch (error) {

        res.status(500).json({ message: "error", error: errorHandler(error) });

    }
}

module.exports = {
    createUser,
}