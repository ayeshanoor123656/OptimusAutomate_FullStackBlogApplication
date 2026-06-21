const express = require("express");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { image } = req.body;

        const result = await cloudinary.uploader.upload(
            image,
            {
                folder: "blog-images"
            }
        );

        res.json({
            imageUrl: result.secure_url
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;