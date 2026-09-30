# NexaPulse Analytics

> A Power BI-inspired business intelligence and sales analytics dashboard built with Node.js, Express, EJS, and Chart.js.

## 📊 Overview

**NexaPulse Analytics** is a business intelligence and sales analytics dashboard designed to provide a clear overview of business performance through interactive dashboards, KPIs, charts, and data tables.

The project analyzes sales data across different areas such as revenue, profit, orders, customers, products, and regions.

It was developed as a portfolio project to demonstrate practical skills in:

- Business Intelligence
- Data Analytics
- Dashboard Development
- Data Visualization
- JavaScript
- Node.js
- Express.js
- EJS
- Responsive Web Design

---

## ✨ Features

### Dashboard

The main dashboard provides an overview of business performance through:

- Total Revenue
- Total Profit
- Total Orders
- Total Customers
- Average Order Value
- Revenue by Month
- Revenue by Category
- Revenue by Region
- Top Products

### Sales Analytics

The Sales page provides detailed transaction-level information including:

- Order ID
- Month
- Customer
- Region
- Category
- Product
- Quantity
- Revenue
- Profit

### Customer Analytics

The Customers page provides:

- Customer list
- Number of orders
- Units purchased
- Revenue generated
- Customer performance comparison

### Product Analytics

The Products page provides:

- Product name
- Product category
- Number of orders
- Units sold
- Revenue
- Profit

### Regional Analytics

The Regions page provides:

- Region
- Number of customers
- Orders
- Units sold
- Revenue
- Profit

---

## 🖥️ Dashboard

The application includes a responsive dashboard designed for desktop, tablet, and mobile devices.

### Main Navigation

- Dashboard
- Sales
- Customers
- Products
- Regions

### Responsive Design

The interface adapts to different screen sizes:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web application framework |
| EJS | Server-side HTML templating |
| Chart.js | Data visualization |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | UI and responsive design |
| JSON | Sample analytics dataset |

---

## 📁 Project Structure

```text
NexaPulse-Analytics/
│
├── app.js
├── package.json
├── package-lock.json
│
├── data/
│   └── sales.json
│
├── routes/
│   └── dashboardRoutes.js
│
├── views/
│   ├── dashboard.ejs
│   ├── sales.ejs
│   ├── customers.ejs
│   ├── products.ejs
│   └── regions.ejs
│
└── public/
    ├── css/
    │   ├── dashboard.css
    │   └── pages.css
    │
    └── js/
        ├── dashboard.js
        └── pages.js