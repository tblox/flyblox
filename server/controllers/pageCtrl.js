const Pages = require("../models/PagesModel");
const Sections = require("../models/SectionsModel");
const ImageProps = require("../models/ImagePropsModel");
const Form = require("../models/FormModel");

const PageCtl = {
  createPage: async (req, res) => {
    try {
      const { pageName, pageSlug } = req.body;

      const isDoubleName = await Pages.findOne({ pageName });

      if (isDoubleName) {
        return res.status(400).json({ msg: "The page name already exists !" });
      }

      const newPage = new Pages({ pageName, pageSlug });

      await newPage.save();

      return res.status(200).json({ msg: `Add new Page successful !!!` });
    } catch (error) {
      return res.status(400).json({ msg: `Has some error ${error}` });
    }
  },

  getAllPage: async (req, res) => {
    try {
      const pages = await Pages.find();

      return res.json(pages);
    } catch (error) {
      return res.status(400).json({ msg: `Has some error ${error}` });
    }
  },

  getListSectionOfPage: async (req, res) => {
    try {
      const { pageId } = req.params;

      if (!pageId) return res.status(400).json({ msg: "Missing page ID" });

      const currentPage = await Pages.findOne({ _id: pageId});
      

      console.log(currentPage) 

      Sections.find({ PageId: pageId }, async (err, listSec) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: `Get list sections fail ${err}`, error: err });
        }
        // logic get props

        console.log(listSec)

        const allSecId = listSec.map((item) => item._id);

        const allImgPropsNeed = await ImageProps.find({ sectionID: allSecId });
        const allFormPropsNeed = await Form.find({ sectionID: allSecId });

        const listSectionWithData = listSec.map((item) => {
          return {
            ...item._doc,
            data: (item._doc.typeSection == "Image"
              ? allImgPropsNeed
              : allFormPropsNeed
            ).find((itemWithUrl) => {
              return String(itemWithUrl.sectionID) == String(item._id);
            }),
          };
        });

        return res.json({
          msg: "Get list section success",
          pageId: currentPage._id,
          pageName: currentPage.pageName,
          pageSlug: currentPage.pageSlug,
          listSection: listSectionWithData,
        });

      });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  },
};

module.exports = PageCtl;
