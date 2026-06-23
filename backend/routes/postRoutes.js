const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const post = await Post.create({
            title,
            content,
            image,
            author: req.user.id
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username email")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Only the author can delete their post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Only the author can edit their post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only edit your own posts" });
        }

        const { title, content, image } = req.body;
        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, image },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/like/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.id;
        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;