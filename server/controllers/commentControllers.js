const Comment = require("../models/commentModel")
const Post = require("../models/postModel")
const User = require("../models/userModel")
const HttpError = require("../models/errorModel")


const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params
        const { description } = req.body

        if (!postId || !description) {
            return next(new HttpError("Post and comment description required", 422))
        }

        const post = await Post.findById(postId)
        if (!post) {
            return next(new HttpError("Post not found", 404))
        }

        const newComment = await Comment.create({
            user: req.user.id,
            post: postId,
            description
        })

        res.status(201).json(newComment)
    } catch (error) {
        console.log(error);
        return next(new HttpError("Failed to add comment", 500))
    }
}


const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ post: postId }).populate("user", "name _id")
            .sort({ createdAt: -1 })

        res.status(200).json(comments)
    } catch (error) {
        console.log(error);
        return next(new HttpError("Failed to fetch comments", 500))
    }
}


const editComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const comment = await Comment.findById(id)
        if (!comment) {
            return next(new HttpError("Comment not found", 404))
        }

        if (comment.user.toString() !== req.user.id) {
            return next(new HttpError("Not authorized to edit this comment", 403))
        }

        comment.description = description
        await comment.save()

        res.status(200).json(comment)
    } catch (error) {
        return next(new HttpError("Failed to edit comment", 500))
    }
}

// DELETE A COMMENT
// DELETE: api/comments/:postId
// Protected
const deleteComment = async (req, res, next) => {
    try {
        const { postId } = req.params

        const comment = await Comment.findById(postId)
        if (!comment) {
            return next(new HttpError("Comment not found", 404))
        }

        if (comment.user.toString() !== req.user.id) {
            return next(new HttpError("You are not authorized to delete this comment", 403))
        }

        await comment.deleteOne()
        res.status(200).json({ message: "Comment deleted successfully" })
    } catch (error) {
        return next(new HttpError("Failed to delete comment", 500))
    }
}

module.exports = { createComment, getComments, editComment, deleteComment }
