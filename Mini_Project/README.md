# 🛒 Amazon Clone — Full-Stack E-Commerce Platform

A fully functional e-commerce web application that closely replicates Amazon's design and
user experience. Built as an SDE Intern Fullstack Assignment.

![Amazon Clone](https://img.shields.io/badge/Status-Complete-green)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

---

## 🚀 Live Demo

- **Frontend**: [Deployed URL]
- **Backend API**: [Deployed URL]

---

## 🛠 Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React.js 18, React Router v6 |
| Backend    | Node.js, Express.js          |
| Database   | PostgreSQL                    |
| ORM        | Sequelize                     |
| Styling    | Custom CSS (Amazon-inspired)  |
| State Mgmt | React Context API             |
| HTTP       | Axios                         |
| Toasts     | React Toastify                |
| Icons      | React Icons                   |

---

## 📁 Database Schema (ERD)
┌──────────┐ ┌────────────┐ ┌───────────┐
│ users │ │ categories │ │ products │
├──────────┤ ├────────────┤ ├───────────┤
│ id (PK) │ │ id (PK) │────▷│ id (PK) │
│ name │ │ name │ │ name │
│ email │ │ slug │ │ price │
│ password │ │ image_url │ │ orig_price│
└──────────┘ └────────────┘ │ cat_id(FK)│
│ │ stock_qty │
│ │ rating │
│ ┌────────────┐ │ images │
│ │ cart_items │ │ specs │
│ ├────────────┤ └───────────┘
├───▷│ id (PK) │ │
│ │ user_id(FK)│ │
│ │ prod_id(FK)│◁─────────────────┘
│ │ quantity │
│ └────────────┘
│
│ ┌──────────┐ ┌──────────────┐
│ │ orders │ │ order_items │
│ ├──────────┤ ├──────────────┤
├───▷│ id (PK) │────▷│ id (PK) │
│ │ user_id │ │ order_id(FK) │
│ │ total │ │ prod_id(FK) │
│ │ status │ │ quantity │
│ │ ship_* │ │ price_at_buy │
│ └──────────┘ └──────────────┘
│
│ ┌────────────┐
└───▷│ wishlists │
├────────────┤
│ id (PK) │
│ user_id(FK)│
│ prod_id(FK)│
└────────────┘


### Key Design Decisions:
- **`price_at_purchase`** in `order_items` captures the price at transaction time (prices may change)
- **`images`** and **`specifications`** stored as JSON for flexibility
- **`original_price`** allows displaying discounts
- **`stock_quantity`** is decremented atomically inside a DB transaction on order placement
- Enum-based **`status`** on orders enables order lifecycle tracking

---

## ✅ Features

### Core Features
- [x] **Product Listing** — Grid layout, search by name, filter by category, sort options
- [x] **Product Detail** — Image carousel, specs table, price with discount, stock status
- [x] **Shopping Cart** — Add/remove items, update quantity, subtotal calculation
- [x] **Order Placement** — Shipping form, order summary, stock validation, order confirmation

### Bonus Features
- [x] **Responsive Design** — Mobile, tablet, desktop
- [x] **Order History** — View all past orders with details
- [x] **Amazon-inspired UI** — Navigation bar, product cards, buy-box, footer

---

## 🏗 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/amazon-clone.git
cd amazon-clone