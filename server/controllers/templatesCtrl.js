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
      const { name, template, defaultValues } = req.body;

      const isDoubleName = await Template.findOne({ name });

      if (isDoubleName) {
        return res
          .status(400)
          .json({ msg: "The template name already exists !" });
      }

      const newTemplate = new Template({
        name,
        template,
        defaultValues: JSON.parse(defaultValues),
      });

      //  console.log(newTemplate);
      await newTemplate.save();

      res.json({ newTemplate, msg: "Upload new Template Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteTemplate: async (req, res) => {
    const { _id } = req.params.id;

    try {
      const template = await Template.findOneAndDelete({ _id: _id });
      return res.json({ template, msg: " Delete successful" });
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
