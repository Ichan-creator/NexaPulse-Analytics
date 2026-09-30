const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersPath = path.join(
    __dirname,
    "../data/users.json"
);

// Login page
router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }

    res.render("login", {
        error: null
    });
});

// Login
router.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body;

    const users = JSON.parse(
        fs.readFileSync(usersPath, "utf8")
    );

    const user = users.find(
        item =>
            item.username.toLowerCase() ===
            username.toLowerCase()
    );

    if (!user) {
        return res.render("login", {
            error: "Invalid username or password."
        });
    }

    if (user.status !== "active") {
        return res.render("login", {
            error: "This account is inactive."
        });
    }

    const passwordMatch =
        bcrypt.compareSync(
            password,
            user.password
        );

    if (!passwordMatch) {
        return res.render("login", {
            error: "Invalid username or password."
        });
    }

    req.session.user = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        role: user.role
    };

    res.redirect("/");
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Unable to log out.");
        }

        res.clearCookie("connect.sid");

        res.redirect("/login");
    });
});

module.exports = router;