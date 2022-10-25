const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sectionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sections",
  },
  templateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Templates",
  },
  formProps: {
    type: Object
  }
  
})


module.exports = From = mongoose.model('Form', FormSchema)
