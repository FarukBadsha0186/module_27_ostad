# 📰 News Portal (MERN Stack)

A full-stack News Portal web application built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, and interact with news content.

---

## 🚀 Live Demo

🔗

---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* 🪪 JWT-based Authorization
* 📰 News API (Create / Read)
* 🌐 RESTful API integration
* ⚡ Fast frontend with React + Vite
* ☁️ Deployed on Render

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## 📁 Project Structure

```
news-portal/
│
├── client/        # React frontend
│   └── dist/      # Production build
│
├── server/        # Backend (Node + Express)
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository


---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 4️⃣ Environment Variables

Create a `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🔌 API Endpoints

### Auth Routes

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/profile`

### News Routes

* GET `/api/news`
* POST `/api/news`

---

## 🧪 Testing

Use Postman to test API:

```
POST https://module-27-ostad.onrender.com/api/auth/register
```


---

## 🙋‍♂️ Author

**Faruk Badsha**

* GitHub: https://github.com/FarukBadsha0186

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
