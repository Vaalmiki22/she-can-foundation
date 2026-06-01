# 🌸 She Can Foundation — Full Stack Website

A complete full-stack NGO website built with **Node.js + Express + MongoDB**.

---

## 🗂️ Project Structure

```
she-can-foundation/
├── server.js              # Main server
├── .env                   # Environment variables
├── seed.js                # Sample data seeder
├── models/
│   ├── Application.js     # Internship applications
│   ├── Blog.js            # Blog posts
│   └── Contact.js         # Contact messages
├── routes/
│   ├── main.js            # Home, About, Programs
│   ├── apply.js           # Internship applications
│   ├── blog.js            # Blog pages
│   ├── contact.js         # Contact form
│   └── admin.js           # Admin dashboard
├── views/
│   ├── index.ejs          # Home page
│   ├── about.ejs          # About page
│   ├── programs.ejs       # Programs page
│   ├── apply.ejs          # Application form
│   ├── blog.ejs           # Blog listing
│   ├── blog-single.ejs    # Single blog post
│   ├── contact.ejs        # Contact page
│   ├── 404.ejs            # 404 page
│   ├── admin/             # Admin panel views
│   └── partials/          # Header & Footer
├── public/
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript
└── middleware/
    └── auth.js            # Admin authentication
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (running locally) OR MongoDB Atlas (free cloud)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Edit `.env` file:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shecan
SESSION_SECRET=your_secret_key
ADMIN_EMAIL=admin@shecan.org
ADMIN_PASSWORD=admin123
```

### 4. Seed Sample Blog Posts
```bash
node seed.js
```

### 5. Start the Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 6. Open in Browser
```
http://localhost:3000
```

---

## 🔐 Admin Panel

Access at: `http://localhost:3000/admin`

**Default credentials:**
- Email: `admin@shecan.org`
- Password: `admin123`

> ⚠️ Change these in `.env` before deploying!

---

## ✨ Features

### Public Website
- 🏠 **Home Page** — Hero, Stats, About preview, Blog preview, CTA
- ℹ️ **About Page** — NGO story, values, team
- 📚 **Programs Page** — All programs listed
- 📝 **Blog** — Listing + Single post with views counter
- 📋 **Apply** — Full internship application form
- 📧 **Contact** — Contact form with database storage

### Admin Dashboard
- 📊 **Dashboard** — Stats overview
- 📋 **Applications** — View, filter by status, update status, delete
- 💬 **Messages** — Read contact messages, reply via email
- 📝 **Blog Manager** — Create, edit, delete, publish/draft blog posts

### Technical Features
- 🌙 Dark / Light Mode
- 📱 Fully Responsive
- ✨ Scroll animations
- 🖱️ Custom cursor
- 📊 Animated counters
- 🔒 Session-based admin auth

---

## 🌐 Deploy to Render (Free Hosting)

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set environment variables
5. Use MongoDB Atlas for the database
6. Deploy! ✅

---

*Built with ❤️ for She Can Foundation*
