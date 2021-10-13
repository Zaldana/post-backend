const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },

        post: {
            type: String
        },

        user: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
        
        comments: [{ type: mongoose.Schema.ObjectId, ref: "comment" }]

    },

);

module.exports = mongoose.model("post", postSchema);