const mongoose = require('mongoose')

const formPropsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  formID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form'
  },
  imageUrl: {
    type: String,
  },
  textBtn: {
    type: String,
  },
  textColor: {
    type: String,
  },
  fillColor: {
    type: String,
  },
  colorHex: {
    type: String,
  },
  location: {
    type: String,
  }
  
})


module.exports = ImageProps = mongoose.model('ImageProps', formPropsSchema)
