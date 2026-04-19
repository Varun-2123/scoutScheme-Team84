const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },

//   Additional Details or form me bharne wali cheezes
  age:          { type: Number },
  gender:       { type: String, enum: ['Male', 'Female', 'Other'] },
  state:        { type: String },
  occupation:   { type: String },
  annualIncome: { type: Number },
  category:     { type: String, enum: ['General', 'OBC', 'SC', 'ST'] },
  profileDone:  { type: Boolean, default: false },
  savedSchemes: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);