const mongoose = require('mongoose')

const PageItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sections: {
    type: Array,
  }
  
})
const PagesSchema = new mongoose.Schema({
  PageItems: [PageItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = Pages = mongoose.model('Pages', PagesSchema)
