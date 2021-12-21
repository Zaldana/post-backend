const Post = require('../model/Post');
const errorHandler = require("../../utils/errorHandler/errorHandler");
const User = require('../../users/model/User');


async function getAllPosts(req, res, next) {

    let foundAllPosts = await Post.find({}).populate("owner", "username")
    res.json({ message: "success", payload: foundAllPosts })

};

async function createPost(req, res) {

    try {
        const { post } = req.body;

        const decodedData = res.locals.decodedData
        let foundUser = await User.findOne({ email: decodedData.email })
        
        const createdPost = new Post({
            
            post,
            userId: foundUser._id
        
        })

        let savedPost = await createdPost.save();

        foundUser.postHistory.push(savedPost._id);

        await foundUser.save();

        res.json({ message: "success", createdPost })

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }
};

async function updatePost(req, res) {

    try {

        let foundPost = await Post.findById(req.params.id);

        if (!foundPost) {

            res.status(404).json({ message: "failure", error: "Post not found" });

        } else {

            let updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

            res.json({ message: "success", payload: updatedPost })

        }

    } catch (e) {

        res.status(500).json(errorHandler(e));
    }
};

async function deletePost(req, res) {

    try {

        let deletedPost = await Post.findByIdAndRemove(req.params.id);

        if (!deletedPost) {

            return res.status(404).json({ message: "failure", error: "post not found" })

        } else {

            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({ email: decodedData.email });

            let userPostHistoryArray = foundUser.postHistory;

            let filteredPostHistoryArray = userPostHistoryArray.filter(
                (item) => item._id.toString() !== req.params.id);

            foundUser.postHistory = filteredPostHistoryArray;

            await foundUser.save();

            res.json({ message: "success", payload: deletedPost })

        }

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
}