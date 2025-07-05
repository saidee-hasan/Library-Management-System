# 📚 Minimal Library Management System

### A clean and responsive library management system built using **React**, **Redux Toolkit Query**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**.

> ⚡ All features are public—no login required.

 ###  🔗 Live Demo
👉 **Client:** https://l2-a4-client.vercel.app </br>
👉 **Server:** https://l2-a3-brown.vercel.app

---

## 🚀 Features

- 🔍 View All Books
- ➕ Add Book
- 📝 Edit Book
- ❌ Delete Book
- 📥 Borrow Book
- 📊 Borrow Summary View
- ✅ Real-time Updates via RTK Query
- 🌐 Backend: Express + MongoDB
- 💡 Toast Notifications with Sonner
- 🎨 TailwindCSS UI (fully responsive)

---

## 🧩 Tech Stack

| Layer      | Tech                      |
|------------|---------------------------|
| Frontend   | React + TypeScript        |
| API        | Redux Toolkit Query       |
| Styling    | Tailwind CSS              |
| Backend    | Node.js + Express.js      |
| Database   | MongoDB (Mongoose)        |
| Toast UI   | Sonner                    |

---

## 🔧 Installation

```bash
# Clone this repo
git clone https://github.com/saidee-hasan/Library-Management-System.git
cd Library-Management-System
```


```bash
# Install dependencies
npm install
```


### 🧪 Environment Variables

Create a `.env` file in the root of your frontend project:

```bash
VITE_BASE_URL=https://l2-a3-brown.vercel.app
```

### 📦 You can also clone the backend server from here:  
👉 [Backend Repo](https://github.com/saidee-hasan/library-management-api.git)



## Start client
```bash
npm run dev
```

### Backend API Endpoints (Server)

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | /api/books          | Get all books         |
| GET    | /api/books/\:id     | Get a single book     |
| POST   | /api/books          | Add a new book        |
| PATCH  | /api/books/\:id     | Update a book         |
| DELETE | /api/books/\:id     | Delete a book         |
| POST   | /api/borrow         | Borrow a book         |
| GET    | /api/borrow/summary | Borrow summary report |


---
## Contact

For any questions, feel free to reach out:

* Name: Saidee Hasan
* Email: [mdsaideehasan@email.com](mailto:mdsaideehasan@email.com)
* GitHub: [Mostary Jahan](https://github.com/saidee-hasan)

# Library-Management-System
