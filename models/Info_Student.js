const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true,
    unique: true
  },
  section: {
    type: String,
    required: true
  },
  Image: {
    type: String // Assuming you're storing the image URL as a string
  }
});

const StudentInfo = mongoose.model('StudentInfo', studentSchema);

module.exports = StudentInfo;
