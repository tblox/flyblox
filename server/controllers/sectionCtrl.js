const Section = require("../models/SectionsModel");
const ImageProps = require("../models/ImagePropsModel");
const Form = require("../models/FormModel");
const Template = require("../models/TemplatesModel");

const SectionController = {
  saveChanges: async (req, res) => {
    try {
      const pageId = req.params.pageId;

      if (!pageId) return res.status(400).json({ msg: "Missing page ID" });

      const { changesValues } = req.body;

      // check logic order

      // end check logic order
      const createImageSections = changesValues.filter(
        (chaI) => chaI.typeSection == "Image" && !chaI._id
      );
      const updateImageSections = changesValues.filter(
        (chaI) => chaI.typeSection == "Image" && chaI._id
      );
      const createFormSections = changesValues.filter(
        (chaI) => chaI.typeSection == "Form" && !chaI._id
      );
      const updateFormSections = changesValues.filter(
        (chaI) => chaI.typeSection == "Form" && chaI._id
      );

      // let result = [];

      const values = await Promise.all([
        ...createImageSections.map(async (creI) => {
          // logic check image ext
          const abc = await Section.find({ order: creI.order, PageId: pageId });

          if (abc.length) return res.json({ msg: "duplicate order" });
          const { order, typeSection, data } = creI;

          return await Section.create({
            order: Number(order),
            typeSection,
            PageId: pageId,
          }).then(async (newImgSec) => {
            const { imageUrl } = data;

            if (!imageUrl) {
              return res.status(400).json({ msg: "Image is required !" });
            }

            const newImageUrl = await ImageProps.create({
              sectionID: newImgSec._id,
              imageUrl,
            });

            console.log({
              ...newImgSec._doc,
              data: { imageUrl: newImageUrl.imageUrl },
            });

            return {
              ...newImgSec._doc,
              data: { imageUrl: newImageUrl.imageUrl },
            };
          });
        }),
        ...updateImageSections.map(async (upI) => {
          // logic check image ext
          const { _id, order, data } = upI;

          return Section.findByIdAndUpdate(_id, {
            order: Number(order)
          }, {new: true}).then(async (updatedImgSec) => {
            const { imageUrl } = data;

            console.log({ updatedImgSec });

            if (imageUrl) {
              const updateImageUrl = await ImageProps.findOneAndUpdate(
                { sectionID: updatedImgSec._id },
                { imageUrl }, {new: true }, 
              );

              console.log('aaaaa', {...updatedImgSec._doc})

              return {
                ...updatedImgSec._doc,
                data: { imageUrl: updateImageUrl.imageUrl },
              };
            }
          });
        }),

        ...createFormSections.map(async (creF) => {
          const abc = await Section.find({ order: creF.order, PageId: pageId });

          if (abc.length) return res.json({ msg: "duplicate order" });

          console.log({ creF });

          const { order, typeSection, data } = creF;

          return await Section.create({
            order: Number(order),
            typeSection,
            PageId: pageId,
          }).then(async (newFormSec) => {
            const { templateID, formProps } = data;
            const currentTemplate = await Template.findOne({
              _id: templateID,
            });

            const newProps = await Form.create({
              sectionID: newFormSec._id,
              templateID,
              template: currentTemplate.template,
              formProps,
            });

            return {
              ...newFormSec._doc,
              data: newProps,
            };
          });
        }),
        ...updateFormSections.map(async (upF) => {
          const { _id, order, data } = upF;

          return await Section.findByIdAndUpdate(_id, {
            order: Number(order),
          }, {new: true }).then(async (updateFormSec) => {
            const { templateID, formProps } = data;

            const updateFormProps = await Form.findOneAndUpdate(
              { sectionID: updateFormSec._id },
              { templateID, formProps }, {new: true }
            );

            return {
              ...updateFormSec._doc,
              data: updateFormProps,
            };
          });
        }),
      ]);

      // console.log({ result1: result });

      // console.log({ createdImageSec });
      return res.send({
        msg: 'Save changes successful',
        values,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: `Save changes has an error ${error} !!!` });
    }
  },
};

module.exports = SectionController;
