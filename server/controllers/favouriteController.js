const Post = require("../models/postModel")
const User = require("../models/userModel")
const HttpError = require("../models/errorModel")


const addToFavourite = async (req, res, next) => {
    try {
        const { postId } = req.params
        const id = req.user.id

        const user = await User.findOne({ _id: id })

        if (!user) {
            return next(new HttpError("Please Login First", 400))
        }

        const alreadyAdded = user.favourites.find(item => item == postId)

        if (alreadyAdded) {
            return res.status(200).json({ message: "Already added in favourites." })
        }

        user.favourites.push(postId)
        await user.save()

        res.status(200).json({
            message: "Added to favourites."
        });
    } catch (error) {
        console.log(error)
        return next(new HttpError("Failed to add as favourite", 500))
    }
}

const getAllFavourites = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id).populate("favourites");

        if (!user) {
            return next(new HttpError("Please Login First", 400));
        }

        res.status(200).json({
            favourites: user.favourites
        });
    } catch (error) {
        console.log(error);
        return next(new HttpError("Failed to fetch favourites", 500));
    }
};

const removeFromFavourite = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const id = req.user.id;

        const user = await User.findById(id);

        if (!user) {
            return next(new HttpError("Please Login First", 400));
        }

        user.favourites = user.favourites.filter(
            fav => fav.toString() !== postId
        );

        await user.save();

        res.status(200).json({
            message: "Removed from favourites."
        });
    } catch (error) {
        console.log(error);
        return next(new HttpError("Failed to remove from favourites", 500));
    }
};


module.exports = { addToFavourite, getAllFavourites, removeFromFavourite }