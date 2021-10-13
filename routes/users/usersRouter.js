var express = require('express');
var router = express.Router();

const {
    createUser,
    login,
    updateUser
} = require("./controller/userController");

const {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData,
    jwtMiddleware
} = require("../utils");

router.post(
    "/create-user",
    checkIsUndefined,
    checkIsEmpty,
    validateCreateData,
    createUser
);

router.post(
    "/login",
    checkIsUndefined,
    checkIsEmpty,
    validateLoginData,
    login
);

router.put(
    "/user-update",
    jwtMiddleware,
    checkIsUndefined,
    checkIsEmpty,
    validateUpdateData,
    updateUser
)

module.exports = router;