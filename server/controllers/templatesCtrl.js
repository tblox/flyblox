const Template = require("../models/TemplatesModel");
const Users = require("../models/User");

const templateController = {
  getInfoTemplate: async (req, res) => {
    try {
      const template = await Template.find();

      return res.json(template);
    } catch (error) {
      return res.error({ msg: error.message });
    }
  },
  addTemplate: async (req, res) => {
    try {
      const { template, defaultValues } = req.body;


      console.log(req.body);

      const newTemplate = new Template({
        template,
        defaultValues
      });

      //  console.log(newTemplate);
      await newTemplate.save();

      res.json({ newTemplate , msg: "Upload new Template Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

//   followTemplate: async (req, res) => {
//     try {
//         const user = await Template.find({_id: req.params.id, followers: req.body})
//         await Template.findOneAndUpdate({_id: req.id}, {
//             following: 
//         })
//     } catch () {
        
//     }
//   }
};

module.exports = templateController;
