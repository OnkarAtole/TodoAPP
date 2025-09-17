📝 MERN Todo List Application

A full-stack Todo List Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This app allows users to sign up, sign in, and manage their own personal Todo list securely using JWT authentication.

🚀 Features

✅ User authentication (Signup & Login) with JWT
✅ Each user has their own private Todo list
✅ Add, Edit, Delete Todos
✅ Mark tasks as completed or pending
✅ Secure password storage with bcrypt.js
✅ Protected routes (only logged-in users can access their todos)
✅ Responsive React frontend with .jsx components
✅ MongoDB database for persistent storage

🛠️ Tech Stack

Frontend:

React.js (with .jsx components)

React Router v6

Axios for API calls

Tailwind CSS / basic CSS (your choice for styling)

Backend:

Node.js

Express.js

MongoDB & Mongoose

JWT (jsonwebtoken)

bcrypt.js (password hashing)

dotenv (environment variables)

📂 Project Structure
mern-todo-app/
│
├── backend/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routes
│   ├── middleware/    # Auth middleware
│   ├── controllers/   # Business logic
│   ├── server.js      # Main server file
│   └── .env           # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Navbar, TodoItem, etc.
│   │   ├── pages/      # Home, Login, Signup, Todos
│   │   ├── App.jsx     # Main App
│   │   └── index.js    # Entry point
│   └── package.json
│
└── README.md

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in /backend with:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todoApp
JWT_SECRET=your_super_secret_key_here


Run backend:

npm start

3️⃣ Setup Frontend
cd frontend
npm install
npm start

Usage

Open frontend at http://localhost:3000

Sign up for a new account

Log in with your credentials

Add, edit, and delete todos

Enjoy your own personal Todo list!
