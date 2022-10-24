const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  SectionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sections",
  },
  TemplateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Templates",
  },
  FormProps: {
    type: Array
  }
  
})


module.exports = From = mongoose.model('Form', FormSchema)
