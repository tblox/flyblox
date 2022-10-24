const mongoose = require('mongoose')

const SectionItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  typeSection: {
    type: String,
    enum: ['Form', 'Image'], default: 'Image'
  },
  order: {
    type: Number,
    required: true,
  }
  
})
const SectionSchema = new mongoose.Schema({
  SectionItems: [SectionItemSchema],
  PageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages'
  }
})

module.exports = Sections = mongoose.model('Sections', SectionSchema)
