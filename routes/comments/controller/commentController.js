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

// async function updatePost(req, res) {

//     try {

//         let foundPost = await Post.findById(req.params.id);

//         if (!foundPost) {

//             res.status(404).json({ message: "failure", error: "Post not found" });

//         } else {

//             let updatedPost = await Post.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 {
//                     new: true
//                 }
//             );

//             res.json({ message: "success", payload: updatedPost })

//         }

//     } catch (e) {

//         res.status(500).json(errorHandler(e));
//     }
// };

// async function deletePost(req, res) {

//     try {

//         let deletedPost = await Post.findByIdAndRemove(req.params.id);

//         if (!deletedPost) {

//             return res.status(404).json({ message: "failure", error: "post not found" })

//         } else {

//             const decodedData = res.locals.decodedData;

//             let foundUser = await User.findOne({ email: decodedData.email });

//             let userPostHistoryArray = foundUser.postHistory;

//             let filteredPostHistoryArray = userPostHistoryArray.filter(
//                 (item) => item._id.toString() !== req.params.id);

//             foundUser.postHistory = filteredPostHistoryArray;

//             await foundUser.save();

//             res.json({ message: "success", deletedPost })

//         }

//     } catch (e) {

//         res.status(500).json(errorHandler(e));

//     }
// };

module.exports = {
    getAllComments,
    createComment,
    // updatePost,
    // deletePost,
}