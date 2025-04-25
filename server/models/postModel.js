const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Agriculture', "Business", "Entertainment", "Education", "Art", "Investment", "Uncategorized", "Weather"],
        message: "{Value is not supported}",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        type: String,
    },
    ratings: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            value: { type: Number, required: true, min: 1, max: 5 }
        }
    ]
}, { timestamps: true })

postSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const total = this.ratings.reduce((acc, curr) => acc + curr.value, 0);
    return total / this.ratings.length;
});

module.exports = model("Post", postSchema)