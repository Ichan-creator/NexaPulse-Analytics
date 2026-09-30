const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const salesRoutes = require("./routes/salesRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// SESSION
app.use(
    session({
        secret: process.env.SESSION_SECRET || "nexapulse-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax"
        }
    })
);

// ROUTES
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/sales", salesRoutes);
app.use("/users", userRoutes);

// 404
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// SERVER
app.listen(PORT, HOST, () => {
    console.log(
        `NexaPulse Analytics running on port ${PORT}`
    );
});