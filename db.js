const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/outlier',
  { useNewUrlParser: true, useCreateIndex: true }
)

module.exports = mongoose