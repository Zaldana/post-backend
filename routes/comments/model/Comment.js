const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },

        postId: {
            type: mongoose.Schema.ObjectId,
            ref: "post"
        },

        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "username"
        },
        
        username: {
            type: String,
            ref: "user"
        },

        comment: {
            type: String
        }

    }
);

module.exports = mongoose.model("comment", commentSchema);