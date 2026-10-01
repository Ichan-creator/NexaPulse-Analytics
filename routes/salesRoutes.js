const express = require("express");
const fs = require("fs");
const path = require("path");

const {
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

const salesPath = path.join(
    __dirname,
    "../data/sales.json"
);

// ADD / DATA INGESTION
// ADMIN + ANALYST
router.get(
    "/new",
    requireRole("admin", "analyst"),
    (req, res) => {

        res.render("add-sale", {
            user: req.session.user
        });

    }
);


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
                sales.length > 0
                    ? Math.max(
                        ...sales.map(
                            sale => Number(sale.id)
                        )
                    ) + 1
                    : 1,

            month,

            customer,

            region,

            category,

            product,

            quantity: Number(quantity),

            revenue: Number(revenue),

            profit: Number(profit)

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

// EDIT DATA
// ADMIN + ANALYST
router.get(
    "/edit/:id",
    requireRole("admin", "analyst"),
    (req, res) => {

        const sales = JSON.parse(
            fs.readFileSync(
                salesPath,
                "utf8"
            )
        );


        const sale = sales.find(
            item =>
                String(item.id) ===
                String(req.params.id)
        );


        if (!sale) {

            return res.status(404).send(
                "Sales record not found."
            );

        }


        res.render(
            "edit-sale",
            {
                sale,
                user: req.session.user
            }
        );

    }
);


router.post(
    "/edit/:id",
    requireRole("admin", "analyst"),
    (req, res) => {

        const sales = JSON.parse(
            fs.readFileSync(
                salesPath,
                "utf8"
            )
        );


        const sale = sales.find(
            item =>
                String(item.id) ===
                String(req.params.id)
        );


        if (!sale) {

            return res.status(404).send(
                "Sales record not found."
            );

        }


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


        sale.month = month;

        sale.customer = customer;

        sale.region = region;

        sale.category = category;

        sale.product = product;

        sale.quantity = Number(quantity);

        sale.revenue = Number(revenue);

        sale.profit = Number(profit);


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

// DELETE DATA
// ADMIN ONLY
router.post(
    "/delete/:id",
    requireRole("admin"),
    (req, res) => {

        const sales = JSON.parse(
            fs.readFileSync(
                salesPath,
                "utf8"
            )
        );


        const filteredSales = sales.filter(
            item =>
                String(item.id) !==
                String(req.params.id)
        );


        fs.writeFileSync(
            salesPath,
            JSON.stringify(
                filteredSales,
                null,
                4
            )
        );


        res.redirect("/sales");

    }
);

// RENAME DATA
// ADMIN ONLY
router.post(
    "/rename/:id",
    requireRole("admin"),
    (req, res) => {

        const sales = JSON.parse(
            fs.readFileSync(
                salesPath,
                "utf8"
            )
        );


        const sale = sales.find(
            item =>
                String(item.id) ===
                String(req.params.id)
        );


        if (!sale) {

            return res.status(404).send(
                "Sales record not found."
            );

        }


        const {
            product
        } = req.body;


        if (
            product &&
            product.trim() !== ""
        ) {

            sale.product =
                product.trim();

        }


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