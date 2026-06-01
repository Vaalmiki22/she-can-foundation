const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Application form
router.get('/', (req, res) => res.render('apply'));

// Submit application
router.post('/', async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    req.flash('success', '🎉 Application submitted successfully! We will contact you soon.');
    res.redirect('/apply?success=1');
  } catch (err) {
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/apply');
  }
});

module.exports = router;
