const Post = require('../../posts/model/Post');
const errorHandler = require("../../utils/errorHandler/errorHandler");
const User = require('../../users/model/User');
const Comment = require("../model/Comment")


async function getAllComments(req, res, next) {

    let foundAllComments = await Comment.find({});
    res.json({ message: "success", foundAllComments })

};

async function createComment(req, res) {

    try {

        const { comment, postId } = req.body;

        const decodedData = res.locals.decodedData
        let foundUser = await User.findOne({ email: decodedData.email })

        const createdComment = new Comment({

            comment,
            postId, 
            userId: foundUser._id,
            username: foundUser.username

        })

        let savedComment = await createdComment.save();

        foundUser.commentHistory.push(savedComment._id);

        await foundUser.save();

        res.json({ message: "success", createdComment })

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }
};

async function updateComment(req, res) {

    try {

        let foundComment = await Comment.findById(req.params.id);

        if (!foundComment) {

            res.status(404).json({ message: "failure", error: "Post not found" });

        } else {

            let updatedComment = await Comment.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

            res.json({ message: "success", payload: updatedComment })

        }

    } catch (e) {

        res.status(500).json(errorHandler(e));
    }
};

async function deleteComment(req, res) {

    try {

        let deletedComment = await Comment.findByIdAndRemove(req.params.id);

        if (!deletedComment) {

            return res.status(404).json({ message: "failure", error: "comment not found" })

        } else {

            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({ email: decodedData.email });

            let userCommentHistoryArray = foundUser.commentHistory;

            let filteredCommentHistoryArray = userCommentHistoryArray.filter(
                (item) => item._id.toString() !== req.params.id);

            foundUser.commentHistory = filteredCommentHistoryArray;

            await foundUser.save();

            res.json({ message: "success", deletedComment })

        }

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }
};

module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment,
}