const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Home
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).limit(3);
    res.render('index', { blogs });
  } catch (err) {
    res.render('index', { blogs: [] });
  }
});

// About
router.get('/about', (req, res) => res.render('about'));

// Programs
router.get('/programs', (req, res) => res.render('programs'));

module.exports = router;
