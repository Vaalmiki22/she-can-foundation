const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Contact = require('../models/Contact');
const Blog = require('../models/Blog');

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@shecan.org',
  password: process.env.ADMIN_PASSWORD || 'admin123'
};

// Login page
router.get('/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin');
  res.render('admin/login');
});

// Login POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN.email && password === ADMIN.password) {
    req.session.admin = { email };
    return res.redirect('/admin');
  }
  req.flash('error', 'Invalid credentials');
  res.redirect('/admin/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Dashboard
router.get('/', auth, async (req, res) => {
  try {
    const [totalApps, pendingApps, totalContacts, unreadContacts, totalBlogs, recentApps] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'Pending' }),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      Blog.countDocuments(),
      Application.find().sort({ createdAt: -1 }).limit(5)
    ]);
    res.render('admin/dashboard', { totalApps, pendingApps, totalContacts, unreadContacts, totalBlogs, recentApps });
  } catch (err) {
    res.render('admin/dashboard', { totalApps:0, pendingApps:0, totalContacts:0, unreadContacts:0, totalBlogs:0, recentApps:[] });
  }
});

// Applications list
router.get('/applications', auth, async (req, res) => {
  const { status, role } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (role) filter.role = role;
  const applications = await Application.find(filter).sort({ createdAt: -1 });
  res.render('admin/applications', { applications, filter });
});

// Update application status
router.post('/applications/:id/status', auth, async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, { status: req.body.status });
  req.flash('success', 'Application status updated');
  res.redirect('/admin/applications');
});

// Delete application
router.delete('/applications/:id', auth, async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  req.flash('success', 'Application deleted');
  res.redirect('/admin/applications');
});

// Messages
router.get('/messages', auth, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  await Contact.updateMany({ read: false }, { read: true });
  res.render('admin/messages', { contacts });
});

// Delete message
router.delete('/messages/:id', auth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  req.flash('success', 'Message deleted');
  res.redirect('/admin/messages');
});

// Blog list
router.get('/blogs', auth, async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('admin/blogs', { blogs });
});

// New blog form
router.get('/blogs/new', auth, (req, res) => res.render('admin/blog-form', { blog: null }));

// Create blog
router.post('/blogs', auth, async (req, res) => {
  try {
    const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blog = new Blog({ ...req.body, slug, published: req.body.published === 'on' });
    await blog.save();
    req.flash('success', 'Blog post created!');
    res.redirect('/admin/blogs');
  } catch (err) {
    req.flash('error', 'Error creating blog: ' + err.message);
    res.redirect('/admin/blogs/new');
  }
});

// Edit blog form
router.get('/blogs/:id/edit', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('admin/blog-form', { blog });
});

// Update blog
router.put('/blogs/:id', auth, async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, { ...req.body, published: req.body.published === 'on' });
  req.flash('success', 'Blog updated!');
  res.redirect('/admin/blogs');
});

// Delete blog
router.delete('/blogs/:id', auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  req.flash('success', 'Blog deleted');
  res.redirect('/admin/blogs');
});

module.exports = router;
