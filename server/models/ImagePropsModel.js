const mongoose = require('mongoose')

const ImagePropsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sectionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sections'
  },
  imageUrl: {
    type: String,
    required: true,
  }
  
})

module.exports = ImageProps = mongoose.model('ImageProps', ImagePropsSchema)
