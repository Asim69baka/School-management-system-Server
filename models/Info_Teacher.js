// Import mongoose
const mongoose = require('mongoose');

// Define schema
const teacherInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  Image:{
    type: String
  }
});

// Create model
const TeacherInfo = mongoose.model('TeacherInfo', teacherInfoSchema);

// Export model
module.exports = TeacherInfo;
