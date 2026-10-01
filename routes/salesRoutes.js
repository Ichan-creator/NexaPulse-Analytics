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

// ADD SALE
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

        try {

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
                                sale =>
                                    Number(sale.id)
                            )
                        ) + 1
                        : 1,

                month: month.trim(),

                customer: customer.trim(),

                region: region.trim(),

                category: category.trim(),

                product: product.trim(),

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
                ),
                "utf8"
            );


            console.log(
                "New sales record added:",
                newSale
            );


            res.redirect("/sales");

        } catch (error) {

            console.error(
                "ADD SALE ERROR:",
                error
            );

            res.status(500).send(
                "Unable to add sales record."
            );
        }

    }
);

// EDIT SALE PAGE
// ADMIN + ANALYST
router.get(
    "/edit/:id",
    requireRole("admin", "analyst"),
    (req, res) => {

        try {

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

        } catch (error) {

            console.error(
                "LOAD EDIT SALE ERROR:",
                error
            );

            res.status(500).send(
                "Unable to load sales record."
            );
        }

    }
);

// EDIT SALE
// ADMIN + ANALYST
router.post(
    "/edit/:id",
    requireRole("admin", "analyst"),
    (req, res) => {

        try {

            const sales = JSON.parse(
                fs.readFileSync(
                    salesPath,
                    "utf8"
                )
            );


            // Find the record being edited

            const saleIndex = sales.findIndex(
                item =>
                    String(item.id) ===
                    String(req.params.id)
            );


            if (saleIndex === -1) {

                return res.status(404).send(
                    "Sales record not found."
                );

            }


            // Get submitted form values

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


            // Convert numeric fields

            const updatedQuantity =
                Number(quantity);

            const updatedRevenue =
                Number(revenue);

            const updatedProfit =
                Number(profit);


            // Validate numeric values

            if (
                !Number.isFinite(updatedQuantity) ||
                !Number.isFinite(updatedRevenue) ||
                !Number.isFinite(updatedProfit)
            ) {

                return res.status(400).send(
                    "Quantity, revenue, and profit must be valid numbers."
                );

            }


            // Update the existing record

            sales[saleIndex].month =
                month.trim();

            sales[saleIndex].customer =
                customer.trim();

            sales[saleIndex].region =
                region.trim();

            sales[saleIndex].category =
                category.trim();

            sales[saleIndex].product =
                product.trim();


            // IMPORTANT:
            // These values are explicitly updated

            sales[saleIndex].quantity =
                updatedQuantity;

            sales[saleIndex].revenue =
                updatedRevenue;

            sales[saleIndex].profit =
                updatedProfit;


            // Save updated data

            fs.writeFileSync(
                salesPath,
                JSON.stringify(
                    sales,
                    null,
                    4
                ),
                "utf8"
            );


            // Show updated record in terminal

            console.log(
                "Sales record updated successfully:"
            );

            console.log(
                sales[saleIndex]
            );


            res.redirect("/sales");

        } catch (error) {

            console.error(
                "EDIT SALE ERROR:",
                error
            );

            res.status(500).send(
                "Unable to update sales record."
            );
        }

    }
);

// DELETE SALE
// ADMIN ONLY
router.post(
    "/delete/:id",
    requireRole("admin"),
    (req, res) => {

        try {

            const sales = JSON.parse(
                fs.readFileSync(
                    salesPath,
                    "utf8"
                )
            );


            const filteredSales =
                sales.filter(
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
                ),
                "utf8"
            );


            console.log(
                `Sales record ${req.params.id} deleted.`
            );


            res.redirect("/sales");

        } catch (error) {

            console.error(
                "DELETE SALE ERROR:",
                error
            );

            res.status(500).send(
                "Unable to delete sales record."
            );
        }

    }
);

// RENAME PRODUCT
// ADMIN ONLY
router.post(
    "/rename/:id",
    requireRole("admin"),
    (req, res) => {

        try {

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
                ),
                "utf8"
            );


            console.log(
                `Product for sales record ${req.params.id} renamed.`
            );


            res.redirect("/sales");

        } catch (error) {

            console.error(
                "RENAME PRODUCT ERROR:",
                error
            );

            res.status(500).send(
                "Unable to rename product."
            );
        }

    }
);


module.exports = router;