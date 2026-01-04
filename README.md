# 🎟️ Swift-Tix – Online Ticket Booking Platform

## 📌 Overview

**Swift-Tix** is a full‑stack **Online Ticket Booking Platform** built with the **MERN stack**. The application enables users to discover, book, and securely pay for travel tickets including **Bus, Train, Launch, and Plane** services. It features a robust **role‑based system** (User, Vendor, Admin), real‑world booking workflows, and a modern UI.

🔗 **Live Site:** [https://assignment-11-2501.web.app/]

---

## 🧑‍🤝‍🧑 User Roles

* **User:** Browse tickets, book seats, complete payments, view bookings & transactions
* **Vendor:** Add/manage tickets, handle booking requests, view revenue insights
* **Admin:** Approve tickets, manage users & vendors, control homepage advertisements

---

## ✨ Key Features

### 🔐 Authentication & Security

* Email/Password login & registration
* Google social authentication
* Firebase Authentication
* JWT / Firebase token‑secured APIs
* Environment‑based configuration for Firebase & MongoDB
* Persistent private routes on page reload

### 🏠 Home Page

* Hero banner / slider
* Advertisement section (max 6 admin‑selected tickets)
* Latest tickets showcase
* Additional informative sections for user engagement

### 🎫 Ticket Booking System

* Admin‑approved tickets only
* Detailed ticket view with live countdown
* Booking modal with quantity validation
* Booking lifecycle: **pending → accepted → paid / rejected**
* Automatic seat reduction after successful payment

### 💳 Payments & Transactions

* Stripe payment integration
* Dynamic price calculation
* Secure checkout experience
* Transaction history for users

---

## 📊 Dashboards

### 👤 User Dashboard

* Profile overview
* My Booked Tickets with real‑time status & countdown
* Transaction history table

### 🧑‍💼 Vendor Dashboard

* Vendor profile
* Add / update / delete tickets
* Requested bookings (accept / reject)
* Revenue overview with interactive charts

### 🛡️ Admin Dashboard

* Admin profile
* Manage tickets (approve / reject)
* Manage users (role control & fraud marking)
* Advertise tickets on homepage (max 6 at a time)

---

## 🔍 Ticket Discovery Tools

* Search by **From → To location**
* Filter by transport type
* Sort by price (Low → High, High → Low)
* Pagination for better performance
* Dark / Light mode toggle

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Tailwind CSS, TanStack Query, React Hook Form, Recharts, Swiper.js, Lottie

**Backend:** Node.js, Express.js, MongoDB, JWT

**Services:** Firebase Auth, Stripe, imgbb, Axios, dotenv

---

## 📂 Source Code

* **Client:** [https://github.com/your-username/ticketbari-client](https://github.com/Adi-ops16/Swift-Tix-client)
* **Server:** [https://github.com/your-username/ticketbari-server](https://github.com/Adi-ops16/Swift-Tix-server)

---

## 🔑 Demo Credentials

**Admin**
Email: [admin@email.com](mailto:admin@email.com)
Password: Admin123

**Vendor**
Email: [vendor@email.com](mailto:vendor@email.com)
Password: Vendor123

---

## 👨‍💻 Author

**Abdul Hasib**
MERN Stack Developer
Focused on building scalable, secure, and user‑centric web applications.

---

## 📄 License

This project is developed for educational and assessment purposes.
