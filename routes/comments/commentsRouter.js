var express = require('express');
var router = express.Router();

const { jwtMiddleware } = require("../utils");


const {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
} = require("./controller/commentController");


router.get('/', jwtMiddleware, getAllComments);

router.post("/create-comment", jwtMiddleware, createComment);

router.delete("/delete-comment-by-id/:id", jwtMiddleware, deleteComment);

router.put("/update-comment-by-id/:id", jwtMiddleware, updateComment);

module.exports = router;