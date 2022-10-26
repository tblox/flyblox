const mongoose = require('mongoose')

const PagesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pageName:  {
    type: String,
    required: true,
  },
  pageSlug: {
    type: String,
  }
  
})


module.exports = Pages = mongoose.model('Pages', PagesSchema)
