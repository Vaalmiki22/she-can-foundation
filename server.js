require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// ── Database ──
mongoose.connect('mongodb+srv://Vaalmiki:9ZPbcaXp7EQTGr9Z@vaalmiki.kupkv7b.mongodb.net/shecan?appName=Vaalmiki')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// ── Middleware ──
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'shecan2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(flash());

// ── Global vars ──
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.admin = req.session.admin || null;
  next();
});

// ── View Engine ──
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Routes ──
app.use('/', require('./routes/main'));
app.use('/apply', require('./routes/apply'));
app.use('/blog', require('./routes/blog'));
app.use('/contact', require('./routes/contact'));
app.use('/admin', require('./routes/admin'));

// ── 404 ──
app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 She Can Foundation running on http://localhost:${PORT}`));
