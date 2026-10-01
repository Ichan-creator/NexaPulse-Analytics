const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const {
    requireLogin
} = require("../middleware/authMiddleware");

const salesPath = path.join(
    __dirname,
    "../data/sales.json"
);

// READ SALES DATA
// Always read the latest version from sales.json
function getSalesData() {

    try {

        const data = fs.readFileSync(
            salesPath,
            "utf8"
        );

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "ERROR READING SALES DATA:",
            error
        );

        return [];

    }
}

// DASHBOARD DATA
function getDashboardData() {

    const sales = getSalesData();


    const totalRevenue = sales.reduce(
        (sum, item) =>
            sum + Number(item.revenue || 0),
        0
    );


    const totalProfit = sales.reduce(
        (sum, item) =>
            sum + Number(item.profit || 0),
        0
    );


    const totalOrders = sales.length;


    const totalCustomers = new Set(
        sales.map(item => item.customer)
    ).size;


    const totalUnits = sales.reduce(
        (sum, item) =>
            sum + Number(item.quantity || 0),
        0
    );


    const averageOrderValue =
        totalOrders > 0
            ? totalRevenue / totalOrders
            : 0;

    // CATEGORY DATA
    const categoryData = {};

    sales.forEach(item => {

        if (!categoryData[item.category]) {
            categoryData[item.category] = 0;
        }

        categoryData[item.category] +=
            Number(item.revenue || 0);

    });

    // REGION DATA
    const regionData = {};

    sales.forEach(item => {

        if (!regionData[item.region]) {
            regionData[item.region] = 0;
        }

        regionData[item.region] +=
            Number(item.revenue || 0);

    });

    // MONTHLY DATA
    const monthlyData = {};

    sales.forEach(item => {

        if (!monthlyData[item.month]) {
            monthlyData[item.month] = 0;
        }

        monthlyData[item.month] +=
            Number(item.revenue || 0);

    });

    // PRODUCT DATA
    const productData = {};

    sales.forEach(item => {

        if (!productData[item.product]) {
            productData[item.product] = 0;
        }

        productData[item.product] +=
            Number(item.revenue || 0);

    });


    // =================================================
    // TOP PRODUCTS
    // =================================================

    const topProducts =
        Object.entries(productData)
            .sort(
                (a, b) => b[1] - a[1]
            )
            .slice(0, 5);


    return {

        totalRevenue,

        totalProfit,

        totalOrders,

        totalCustomers,

        totalUnits,

        averageOrderValue,

        categoryData,

        regionData,

        monthlyData,

        productData,

        topProducts

    };

}

// DASHBOARD
router.get(
    "/",
    requireLogin,
    (req, res) => {

        const data =
            getDashboardData();


        res.render(
            "dashboard",
            {
                ...data,

                user: req.session.user
            }
        );

    }
);

// SALES
router.get(
    "/sales",
    requireLogin,
    (req, res) => {

        // IMPORTANT:
        // Get the latest sales data every time
        // the Sales page is opened.

        const sales =
            getSalesData();


        const data =
            getDashboardData();


        res.render(
            "sales",
            {

                sales,

                ...data,

                user: req.session.user

            }
        );

    }
);

// CUSTOMERS
router.get(
    "/customers",
    requireLogin,
    (req, res) => {

        const sales =
            getSalesData();


        const customers = {};


        sales.forEach(item => {

            if (!customers[item.customer]) {

                customers[item.customer] = {

                    name: item.customer,

                    orders: 0,

                    revenue: 0,

                    units: 0

                };

            }


            customers[item.customer].orders += 1;


            customers[item.customer].revenue +=
                Number(item.revenue || 0);


            customers[item.customer].units +=
                Number(item.quantity || 0);

        });


        const customerList =
            Object.values(customers)
                .sort(
                    (a, b) =>
                        b.revenue - a.revenue
                );


        res.render(
            "customers",
            {

                customers: customerList,

                totalCustomers:
                    customerList.length,

                user: req.session.user

            }
        );

    }
);

// PRODUCTS
router.get(
    "/products",
    requireLogin,
    (req, res) => {

        const sales =
            getSalesData();


        const products = {};


        sales.forEach(item => {

            if (!products[item.product]) {

                products[item.product] = {

                    name: item.product,

                    category: item.category,

                    orders: 0,

                    units: 0,

                    revenue: 0,

                    profit: 0

                };

            }


            products[item.product].orders += 1;


            products[item.product].units +=
                Number(item.quantity || 0);


            products[item.product].revenue +=
                Number(item.revenue || 0);


            products[item.product].profit +=
                Number(item.profit || 0);

        });


        const productList =
            Object.values(products)
                .sort(
                    (a, b) =>
                        b.revenue - a.revenue
                );


        res.render(
            "products",
            {

                products: productList,

                user: req.session.user

            }
        );

    }
);

// REGIONS
router.get(
    "/regions",
    requireLogin,
    (req, res) => {

        const sales =
            getSalesData();


        const regions = {};


        sales.forEach(item => {

            if (!regions[item.region]) {

                regions[item.region] = {

                    name: item.region,

                    orders: 0,

                    customers: new Set(),

                    revenue: 0,

                    profit: 0,

                    units: 0

                };

            }


            regions[item.region].orders += 1;


            regions[item.region].customers.add(
                item.customer
            );


            regions[item.region].revenue +=
                Number(item.revenue || 0);


            regions[item.region].profit +=
                Number(item.profit || 0);


            regions[item.region].units +=
                Number(item.quantity || 0);

        });


        const regionList =
            Object.values(regions)

                .map(region => ({

                    name: region.name,

                    orders: region.orders,

                    customers:
                        region.customers.size,

                    revenue:
                        region.revenue,

                    profit:
                        region.profit,

                    units:
                        region.units

                }))

                .sort(
                    (a, b) =>
                        b.revenue - a.revenue
                );


        res.render(
            "regions",
            {

                regions: regionList,

                user: req.session.user

            }
        );

    }
);


module.exports = router;