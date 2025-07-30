📚 Book Club Library Management System
🌟 Modern Full-Stack Solution for Book Club Library – Colombo, Sri Lanka</h3> <p>Effortlessly manage books, readers, and lending operations with a responsive web application</p> </div>
📌 Overview
Book Club Library is a full-stack web application built to digitize and streamline operations for the Book Club Library in Colombo. It features modules for managing books, readers, lending, returns, and overdue notifications with modern, scalable technologies.

✨ Features
📖 Library Management
🔹 Add, update, delete, and view books

🔹 Search and filter book inventory

🔹 Categorize by genre, author, and more

👥 Reader Management
🔹 Manage library members with CRUD operations

🔹 View lending history per reader

🔁 Lending System
🔹 Lend books to readers

🔹 Automatic due date calculation

🔹 Return books and mark as complete

⏰ Overdue Notifications
🔹 Automatically detect overdue books

🔹 Send email reminders using Nodemailer

🔐 Secure Authentication
🔹 JWT-based auth system

🔹 Role-based access control

🔹 Secure password hashing with bcrypt

📊 Dashboard & Analytics
🔹 Lending status and book usage overview

🔹 Overdue tracking with summaries

🧰 Tech Stack
Layer	Technology
Frontend	React, TypeScript, Tailwind CSS
Backend	Node.js, Express.js, TypeScript
Database	MongoDB + Mongoose
Authentication	JWT, bcrypt
Email System	Nodemailer
Dev Tools	Vite, Nodemon

📁 Project Structure
bash
Copy
Edit
Book-Club-Library/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── router.tsx
│   └── ...
├── server/             # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.ts
│   └── ...
└── postman/
    └── Book-Club-API.json
🚀 Getting Started
📦 Prerequisites
Node.js v16+

MongoDB (local or Atlas)

npm or yarn

🔧 Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/book-club-library.git
cd book-club-library
Setup Backend

bash
Copy
Edit
cd server
npm install
Configure .env

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/book-club-library
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
NODE_ENV=development
Setup Frontend

bash
Copy
Edit
cd ../client
npm install
Run the app

bash
Copy
Edit
# Start backend
cd ../server
npm run dev

# Start frontend
cd ../client
npm run dev
📡 API Documentation
Use Postman to test endpoints.

✅ Import: Book-Club-API.json

Base URL: http://localhost:3000/api

🔑 Authentication
Method	Endpoint	Description
POST	/auth/login	Login user
POST	/auth/register	Register new user

📚 Books
Method	Endpoint	Description
GET	/books	List all books
POST	/books	Create new book
PUT	/books/:id	Update book
DELETE	/books/:id	Delete book

👤 Readers
Method	Endpoint	Description
GET	/readers	List all readers
POST	/readers	Add new reader
PUT	/readers/:id	Update reader
DELETE	/readers/:id	Delete reader

📘 Lending
Method	Endpoint	Description
GET	/lending	List all lendings
POST	/lending	Lend a book
PUT	/lending/:id/return	Mark book as returned
GET	/lending/overdue	Get overdue lendings

🔐 Security Features
Passwords hashed with bcrypt

JWT tokens for session management

Middleware-based route protection

Email & role-based verification

🧪 Development Scripts
Backend
bash
Copy
Edit
npm run dev       # Start with Nodemon
npm run build     # Compile TypeScript
npm start         # Run production server
Frontend
bash
Copy
Edit
npm run dev       # Start Vite dev server
npm run build     # Build production version
npm run preview   # Preview build
npm run lint      # Lint the codebase
🌍 Deployment Notes
Make sure to configure .env properly in both environments

Use PM2 or Docker for backend in production

Use Nginx/Apache to serve frontend (after npm run build)

🤝 Contributing
Contributions are welcome! Follow these steps:

bash
Copy
Edit
git checkout -b feature/your-feature
git commit -m "✨ Add your feature"
git push origin feature/your-feature
Then open a Pull Request.

🧾 License
This project is licensed under the MIT License.

👤 Author
pasindu Priyanjana