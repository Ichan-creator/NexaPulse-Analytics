const express = require("express");
const fs = require("fs");
const path = require("path");

const {
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

const usersPath = path.join(
    __dirname,
    "../data/users.json"
);

// Users management page
router.get(
    "/",
    requireRole("admin"),
    (req, res) => {
        const users = JSON.parse(
            fs.readFileSync(usersPath, "utf8")
        );

        res.render("users", {
            users,
            user: req.session.user
        });
    }
);

// Activate / deactivate user
router.post(
    "/:id/status",
    requireRole("admin"),
    (req, res) => {
        const users = JSON.parse(
            fs.readFileSync(usersPath, "utf8")
        );

        const user = users.find(
            item => String(item.id) === String(req.params.id)
        );

        if (!user) {
            return res.status(404).send("User not found.");
        }

        user.status =
            user.status === "active"
                ? "inactive"
                : "active";

        fs.writeFileSync(
            usersPath,
            JSON.stringify(users, null, 4)
        );

        res.redirect("/users");
    }
);

module.exports = router;