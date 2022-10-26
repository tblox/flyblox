const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
  typeSection: {
    type: String,
    enum: ['Form', 'Image'], default: 'Image',
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  PageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages',
    required: true,
  },
  
})

module.exports = Sections = mongoose.model('Sections', SectionSchema)


