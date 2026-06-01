const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  role: { type: String, required: true, enum: ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Content Writing', 'Social Media', 'Data Analysis'] },
  experience: { type: String, default: 'Beginner' },
  motivation: { type: String, required: true },
  portfolio: { type: String, default: '' },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewing', 'Accepted', 'Rejected'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
