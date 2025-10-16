<a href="https://ddshop-frontend.onrender.com/">🍰 Dessert E-Commerce Frontend</a>

<img width="1552" height="931" alt="Screenshot 2025-10-16 at 9 13 02 AM" src="https://github.com/user-attachments/assets/4615f9af-1418-4bee-afb0-40332a71ae06" />

A modern and responsive dessert e-commerce web app built with Nuxt.js and Tailwind CSS, allowing users to browse desserts, add them to a cart, and place orders securely.
This repository contains the frontend code — the user interface of the application.

## **🚀 Features**

🧁 Browse Desserts – View desserts with images, names, and prices

🛒 Shopping Cart – Add items to cart, update quantities, and remove products

💳 Multi-Step Checkout – Billing → Shipping → Confirmation flow

📧 Email Confirmation – Users receive an email after successful orders

🔐 JWT Authentication – Secure login/register system

👩‍💼 Admin Functionality – Add, update, or delete products

💬 Contact Form – Users can send messages to the admin

📱 Responsive UI – Works on desktop, tablet, and mobile


## **🧩 Tech Stack**

Frontend: Nuxt.js 3

Styling: Tailwind CSS


## **🧠 Project Structure**

assets/ – Images, fonts, CSS, and other static assets

components/ – Reusable UI elements (footer, navbar, cart display, checkout)

composables/ – Reusable logic functions (useCart(), useAuth(), etc.)

layouts/ – Global page layouts (main layout, checkout)

middleware/ – Route guards (auth, admin, order success)

pages/ – Nuxt pages (Home, Products, Cart, Checkout, About, Contact, etc.)

public/ – Static/public files (favicon, images, etc.)

store/ – State management (cart, user)

.env – Environment variables (API base URL, keys)

Routing: Nuxt Pages System

Backend: Spring Boot (handles APIs, authentication, orders, and email)
