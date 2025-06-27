
# 📚 PHL2B5-Mission03-Assignment03-Solution

Welcome to the **Library Management System**, a robust backend API built with **Node.js**, **TypeScript**, **Express**, and **MongoDB (Mongoose)**. This system enables users to manage a collection of books and borrowing records efficiently.

🧠 Developed as part of **PHL2B5 - Mission 03 Assignment 03**, this project emphasizes real-world backend architecture, RESTful API design, and modular code practices.

🌐 **Live Demo**: [https://phl-2-b5-mission03-assignment03-sol.vercel.app](https://phl-2-b5-mission03-assignment03-sol.vercel.app)

---

## 📑 Table of Contents

- [📝 Introduction](#-introduction)
- [✨ Features](#-features)
- [📂 Project Structure](#-project-structure)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Live Deployment](#-live-deployment)
- [💾 GitHub Repository](#-github-repository)
- [👨‍💻 Author](#-author)

---

## 📝 Introduction

This backend API provides a simple and effective way to manage books and borrowing functionality in a library system. It includes features such as:

- Creating and managing book records
- Tracking borrowed books with quantity and due dates
- Filtering and sorting capabilities
- Data validation and error handling
- Real-time availability adjustments with Mongoose hooks

---

## ✨ Features

- 📖 **Book Management**: Add, retrieve, update, and delete books with key attributes like title, author, genre, ISBN, and available copies.
- 📚 **Borrow Tracking**: Log borrow records while validating availability, tracking due dates, and handling quantity limits.
- 🔍 **Advanced Queries**: Filter, sort, and limit results with intelligent genre capitalization corrections.
- 🔐 **Data Validation**: Ensures reliable structure with strict Mongoose schema validations.
- ⚙️ **Pre/Post Hooks**: Automatically adjust book availability when books are borrowed or returned.

---

## 📂 Project Structure

phl2b5-mission03-assignment03-solution/
├── src/
│   ├── app.ts               # Express app configuration
│   ├── config/              # Environment config (dotenv, db connection)
│   ├── models/              # Mongoose schemas (books.model.ts, borrows.model.ts)
│   ├── interfaces/          # TS interfaces for models
│   ├── controllers/         # Route handlers and logic
│   └── server.ts            # Entry point
├── dist/                    # Compiled JS output
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Deployment configuration
└── README.md                # Project documentation



---

## 🌐 API Endpoints

All routes return the following response format:

```json
{
  "success": true,
  "message": "Your message here",
  "data": { ... }
}
````

### 📘 Book Routes

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| POST   | `/books`         | Create a new book                  |
| GET    | `/books`         | Get all books (with query options) |
| GET    | `/books/:bookId` | Get a specific book by ID          |
| PUT    | `/books/:bookId` | Update an existing book            |
| DELETE | `/books/:bookId` | Delete a book by ID                |

**Book Payload Example**:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "isbn": "9780132350884",
  "description": "A Handbook of Agile Software Craftsmanship",
  "copies": 10
}
```

---

### 📗 Borrow Routes

| Method | Endpoint                    | Description                            |
| ------ | --------------------------- | -------------------------------------- |
| POST   | `/borrows`                  | Create a new borrow entry              |
| GET    | `/borrows/borrowed-summary` | Get total borrowed quantities per book |

**Borrow Payload Example**:

```json
{
  "book": "BOOK_ID_HERE",
  "quantity": 2,
  "dueDate": "2025-07-31"
}
```

---

## 🚀 Live Deployment

🔗 [Visit the Live API](https://phl-2-b5-mission03-assignment03-sol.vercel.app/)

You can access the API endpoints using tools like **Postman**, **Insomnia**, or directly from the browser (for GET routes).

---

## 💾 GitHub Repository

🔗 [GitHub Repo](https://github.com/MZahidKamal/PHL2B5-Mission03-Assignment03-Solution)

Clone the repo:

```bash
git clone https://github.com/MZahidKamal/PHL2B5-Mission03-Assignment03-Solution.git
cd PHL2B5-Mission03-Assignment03-Solution
npm install
```

---

## 👨‍💻 Author

**Mohammad Zahid Kamal**
🔗 GitHub: [@MZahidKamal](https://github.com/MZahidKamal)

---

> 🛠️ Built with **Node.js**, **Express**, **TypeScript**, **MongoDB (Mongoose)** and deployed on **Vercel** with ❤️.
