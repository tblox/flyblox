const mongoose = require('mongoose')

const TemplateItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  template: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  defaultValues: {
    type: Object,
  },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
})

module.exports = Templates = mongoose.model('Templates', TemplateItemSchema)
