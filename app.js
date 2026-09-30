const express = require("express");
const path = require("path");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/", dashboardRoutes);

// 404
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`NexaPulse Analytics running on port ${PORT}`);
});