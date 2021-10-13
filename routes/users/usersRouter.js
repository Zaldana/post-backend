var express = require('express');
var router = express.Router();

const {
    createUser,
} = require("./controller/userController");

const {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    // validateLoginData,
    // validateUpdateData,
    // jwtMiddleware
} = require("../utils");

router.post(
    "/create-user",
    checkIsUndefined,
    checkIsEmpty,
    validateCreateData,
    createUser
);

module.exports = router;