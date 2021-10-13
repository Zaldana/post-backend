const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },

        lastName: {
            type: String,
        },

        username: {
            type: String,
            unique: true,
        },

        email: {
            type: String,
            unique: true,
        },

        password: {
            type: String,
        },

        posts: [{ type: mongoose.Schema.ObjectId, ref: "post" }],

        comments: [{ type: mongoose.Schema.ObjectId, ref: "comment" }]

    }
);

module.exports = mongoose.model("user", userSchema);