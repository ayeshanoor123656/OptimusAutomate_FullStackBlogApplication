const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json({
    limit: "50mb"
}));

app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));

app.get("/", (req, res) => {
    res.send("Blog API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});