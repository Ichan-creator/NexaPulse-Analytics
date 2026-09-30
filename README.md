# NexaPulse Analytics

**Business Intelligence & Sales Analytics Dashboard**

NexaPulse Analytics is a web-based Business Intelligence and Sales Analytics platform built with **Node.js, Express.js, EJS, and Chart.js**.

The project provides an interactive dashboard for monitoring sales performance, revenue, profit, customers, products, and regional performance. It also includes authentication and role-based access control for different types of users.

This project was developed as a portfolio project to demonstrate practical skills in **web development, data processing, dashboard development, authentication, authorization, and responsive UI design**.

---

## 🚀 Live Demo

**NexaPulse Analytics:**
https://nexapulse-analytics.onrender.com/

> The application is deployed on Render for demonstration and portfolio purposes.

---

## ✨ Features

### 📊 Business Intelligence Dashboard

* Total Revenue
* Total Profit
* Total Orders
* Total Customers
* Total Units
* Average Order Value
* Monthly Revenue Trends
* Sales by Category
* Regional Performance
* Top Products
* Interactive charts using Chart.js

### 🔐 Authentication

* User login
* Session-based authentication
* Password verification using bcrypt
* Logout functionality
* Inactive account protection
* Protected dashboard routes

### 👥 Role-Based Access Control

NexaPulse Analytics supports three user roles:

| Feature                   | Admin | Analyst | Viewer |
| ------------------------- | :---: | :-----: | :----: |
| Dashboard                 |   ✅   |    ✅    |    ✅   |
| View Sales                |   ✅   |    ✅    |    ✅   |
| View Customers            |   ✅   |    ✅    |    ✅   |
| View Products             |   ✅   |    ✅    |    ✅   |
| View Regions              |   ✅   |    ✅    |    ✅   |
| Add Sales                 |   ✅   |    ✅    |    ❌   |
| User Management           |   ✅   |    ❌    |    ❌   |
| Activate/Deactivate Users |   ✅   |    ❌    |    ❌   |

Unauthorized users receive an access-denied response when attempting to access restricted routes.

### 📈 Sales Management

Authorized users can add new sales records containing:

* Month
* Customer
* Region
* Category
* Product
* Quantity
* Revenue
* Profit

New records are automatically included in the analytics calculations.

### 👤 User Management

Administrators can:

* View system users
* View user roles
* View account status
* Activate user accounts
* Deactivate user accounts

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Chart.js
* Responsive Web Design

### Backend

* Node.js
* Express.js
* Express Session
* bcryptjs

### Data

* JSON-based data storage
* JavaScript data processing

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Nodemon

### Deployment

* Render

---

## 📁 Project Structure

```text
NexaPulse-Analytics/
│
├── app.js
├── package.json
├── README.md
│
├── data/
│   ├── sales.json
│   └── users.json
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── salesRoutes.js
│   └── userRoutes.js
│
├── views/
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── sales.ejs
│   ├── customers.ejs
│   ├── products.ejs
│   ├── regions.ejs
│   ├── add-sale.ejs
│   ├── users.ejs
│   └── 403.ejs
│
└── public/
    │
    ├── css/
    │   ├── dashboard.css
    │   ├── pages.css
    │   └── auth.css
    │
    └── js/
        ├── dashboard.js
        └── pages.js
```

---

## 🔑 Demo Accounts

The project includes three demo roles for testing the role-based access system.

| Role    | Username  | Password     |
| ------- | --------- | ------------ |
| Admin   | `admin`   | `admin123`   |
| Analyst | `analyst` | `analyst123` |
| Viewer  | `viewer`  | `viewer123`  |

> These credentials are for portfolio/demo purposes only and should not be used for production systems.

---

## 💻 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ichan-creator/NexaPulse-Analytics.git
```

### 2. Enter the project directory

```bash
cd NexaPulse-Analytics
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:8080
```

---

## ▶️ Production Start

To start the application normally:

```bash
npm start
```

---

## 🔐 Environment Variables

For local development, create a `.env` file:

```env
PORT=8080
SESSION_SECRET=your-secure-session-secret
```

Do not commit `.env` files or real credentials to GitHub.

The project should include `.env` in `.gitignore`:

```gitignore
node_modules/
.env
```

---

## 📊 Dashboard Analytics

NexaPulse processes sales records from:

```text
data/sales.json
```

The application dynamically calculates:

* Revenue
* Profit
* Orders
* Customers
* Units sold
* Average order value
* Category revenue
* Regional revenue
* Monthly revenue
* Product revenue

These values are displayed through dashboard cards, tables, and interactive Chart.js visualizations.

---

## 🔒 Authentication & Authorization

Authentication is handled using:

```text
express-session
bcryptjs
```

The application stores the authenticated user's information in the session.

Example session data:

```js
req.session.user = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    role: user.role
};
```

Role-based authorization is handled through middleware.

Example:

```js
requireRole("admin")
```

Multiple roles can also be allowed:

```js
requireRole("admin", "analyst")
```

This allows the application to control which users can access specific functionality.

---

## 🧩 Main Routes

| Route        | Purpose            | Access          |
| ------------ | ------------------ | --------------- |
| `/login`     | User login         | Public          |
| `/logout`    | End session        | Authenticated   |
| `/`          | Dashboard          | All roles       |
| `/sales`     | Sales data         | All roles       |
| `/customers` | Customer analytics | All roles       |
| `/products`  | Product analytics  | All roles       |
| `/regions`   | Regional analytics | All roles       |
| `/sales/new` | Add sales record   | Admin / Analyst |
| `/users`     | User management    | Admin           |

---

## 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The dashboard uses responsive CSS layouts so charts, KPI cards, navigation, and tables adapt to different screen sizes.

---

## 🧪 Testing

The application can be tested using the three demo accounts.

### Admin Testing

Verify that the Admin can:

* Access the dashboard
* View all analytics pages
* Add sales
* Access User Management
* Activate/deactivate users
* Logout

### Analyst Testing

Verify that the Analyst can:

* Access the dashboard
* View analytics
* Add sales
* Access customer/product/region data
* Cannot access User Management

### Viewer Testing

Verify that the Viewer can:

* Access the dashboard
* View analytics
* View sales
* View customers
* View products
* View regions
* Cannot add sales
* Cannot access User Management

---

## 🎯 Project Goals

This project was created to demonstrate practical experience with:

* Full-stack JavaScript development
* Express.js routing
* EJS server-side rendering
* Authentication
* Role-based authorization
* Session management
* Data processing
* Business intelligence dashboards
* Data visualization
* Responsive web design
* Git and GitHub workflow
* Cloud deployment

---

## 🔮 Future Improvements

Potential improvements include:

* MySQL or PostgreSQL database integration
* Advanced filtering and date ranges
* CSV/Excel import
* CSV/PDF report export
* User creation and editing
* Password reset functionality
* Audit logs
* Real-time analytics
* Advanced dashboard filters
* API integration
* Improved production session storage
* Automated testing

---

## 👨‍💻 Developer

**Christian Aquino**

Bachelor of Science in Information Technology
STI College Las Piñas

### Portfolio Project

**NexaPulse Analytics**
Business Intelligence & Sales Analytics Dashboard

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
