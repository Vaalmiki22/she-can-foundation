const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', (req, res) => res.render('contact'));

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    req.flash('success', '✅ Message sent! We will get back to you within 24 hours.');
    res.redirect('/contact?success=1');
  } catch (err) {
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
});

module.exports = router;
