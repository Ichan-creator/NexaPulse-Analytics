const express = require("express");
const fs = require("fs");
const path = require("path");

const {
    requireLogin,
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

const salesPath = path.join(
    __dirname,
    "../data/sales.json"
);

// SALES INPUT PAGE
router.get(
    "/new",
    requireRole("admin", "analyst"),
    (req, res) => {

        res.render("add-sale", {
            user: req.session.user
        });

    }
);

// ADD SALE
router.post(
    "/new",
    requireRole("admin", "analyst"),
    (req, res) => {

        const sales = JSON.parse(
            fs.readFileSync(
                salesPath,
                "utf8"
            )
        );

        const {
            month,
            customer,
            region,
            category,
            product,
            quantity,
            revenue,
            profit
        } = req.body;


        const newSale = {

            id:
                Math.max(
                    ...sales.map(
                        sale => Number(sale.id)
                    )
                ) + 1,

            month,
            customer,
            region,
            category,
            product,

            quantity:
                Number(quantity),

            revenue:
                Number(revenue),

            profit:
                Number(profit)

        };


        sales.push(newSale);


        fs.writeFileSync(
            salesPath,
            JSON.stringify(
                sales,
                null,
                4
            )
        );


        res.redirect("/sales");

    }
);


module.exports = router;