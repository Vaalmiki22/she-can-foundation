const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// All blogs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    const categories = await Blog.distinct('category');
    res.render('blog', { blogs, categories, activeCategory: category || 'All' });
  } catch (err) {
    res.render('blog', { blogs: [], categories: [], activeCategory: 'All' });
  }
});

// Single blog
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.redirect('/blog');
    const related = await Blog.find({ category: blog.category, _id: { $ne: blog._id }, published: true }).limit(3);
    res.render('blog-single', { blog, related });
  } catch (err) {
    res.redirect('/blog');
  }
});

module.exports = router;
