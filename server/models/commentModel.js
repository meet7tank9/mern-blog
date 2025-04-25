const { Schema, model, default: mongoose } = require('mongoose')

const commentSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = model("Comment", commentSchema)