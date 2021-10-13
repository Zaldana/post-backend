var express = require('express');
var router = express.Router();
const { jwtMiddleware } = require("../utils");

const {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} = require("./controller/postController");

router.get('/', jwtMiddleware, getAllPosts);

router.post("/create-post", jwtMiddleware, createPost);

router.delete("/delete-post-by-id/:id", jwtMiddleware, deletePost);

router.put("/update-post-by-id/:id", jwtMiddleware, updatePost);

module.exports = router;