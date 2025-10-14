
<a href="https://ddshop-frontend.onrender.com/">🍰 Dessert E-Commerce Frontend</a>

<img width="1552" height="931" alt="Screenshot 2025-10-14 at 10 14 57 AM" src="https://github.com/user-attachments/assets/d38bd405-ae29-4790-9730-6caeec842bda" />


A modern and responsive dessert **e-commerce web app** built with Nuxt.js and Tailwind CSS, allowing users to browse desserts, add them to a cart, and place orders securely.
This repository contains the frontend code — the user interface of the application.

##🚀 Features

🧁 Browse desserts with images, names, and prices

🛒 Add items to cart, update quantities, and remove products

💳 Multi-step checkout (Billing → Shipping → Confirmation)

📧 Email confirmation after successful order

🔐 JWT-based authentication (login/register)

👩‍💼 Admin functionality: add, update, or delete products

💬 Contact form for sending messages

📱 Fully responsive UI with Tailwind CSS

##🧩 Tech Stack
Category	Technology: Framework	Nuxt.js 3
Styling:	Tailwind CSS
Routing:	Nuxt Pages System
Backend:	Spring Boot 

##🧠 Project Structure
.
├── assets/              # Images, fonts, CSS, and other static assets
├── components/          # Reusable UI elements (footer,navbar,cartDisplay, checkout)
├── composables/         # Reusable logic functions (useCart(), useAuth(), ...)
├── layouts/             # Global page layouts (checkout )
├── middleware/          # Route guards (auth, admin, order success)
├── pages/               # Nuxt pages (Home, Products, Cart, Checkout, About, Contact,...)
├── public/              # Public/static files (favicon, images, ...)
├── store/               # State management (cart)
└── .env                 # Environment variables (API base URL, keys)

---
