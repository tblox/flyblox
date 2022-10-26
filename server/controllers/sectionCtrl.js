const Section = require("../models/SectionsModel");
const ImageProps = require("../models/ImagePropsModel");
const Form = require("../models/FormModel");
const Template = require("../models/TemplatesModel")

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

      const [createdImageSec] = await Promise.all(
        createImageSections.map(async (creI) => {
          // logic check image ext
          const abc = await Section.find({ order: creI.order, PageId: pageId });

          if (abc.length) return res.json({ msg: "duplicate order" });
          const { order, typeSection, data } = creI;

          return await Section.create(
            { order: Number(order), typeSection, PageId: pageId },
            async (err, newImgSec) => {
              if (err) {
                console.log({ err });
              }

              //   save image url record
              const { imageUrl } = data;

              if (!imageUrl) {
                return res.status(400).json({ msg: "Image is required !" });
              }

              const newImageUrl = await ImageProps.create(
                { sectionID: newImgSec._id, imageUrl },
                (err, newImage) => {
                  if (err) {
                    console.log({ err });
                  }

                  return newImage;
                }
              );

              return {
                newImgSec,
                newImageUrl: newImageUrl,
              };
            }
          );
        }),
        updateImageSections.map(async (upI) => {
          // logic check image ext
          const { _id, order, data } = upI;

          return await Section.findByIdAndUpdate(
            _id,
            { order: Number(order) },
            async (err, updatedImgSec) => {
              if (err) {
                console.log({ err });
              }

              const { imageUrl } = data;
              if (imageUrl) {
                const updateImageUrl = await ImageProps.findOneAndUpdate(
                  { sectionID: updatedImgSec._id },
                  { imageUrl },
                  (err, newImage) => {
                    if (err) {
                      console.log(err);
                    }

                    return newImage;
                  }
                );

                return {
                  updatedImgSec,
                  updatedImageUrl: updateImageUrl,
                };
              }
            }
          );
        }),
        createFormSections.map(async (creF) => {
          const abc = await Section.find({ order: creF.order, PageId: pageId });

          if (abc.length) return res.json({ msg: "duplicate order" });

          const { order, typeSection, data } = creF;

          return await Section.create(
            { order: Number(order), typeSection, PageId: pageId },
            async (err, newFormSec) => {
              if (err) {
                console.log(err);
              }

              const { templateID, formProps } = data;

              const currentTemplate = await Template.findOne({ _id : templateID })

              // console.log(currentTemplate.template);

              const newProps = await Form.create(
                { sectionID: newFormSec._id, templateID, templateHTML: currentTemplate.template, formProps },
                (err, newForm) => {
                  if (err) {
                    console.log({ err });
                  }

                  console.log({ newForm });
                  return newForm;
                }
              );

              return {
                newFormSec,
                newProps: newProps,
              };
            }
          );
        }),
        updateFormSections.map(async (upF) => {
          const { _id, order, data } = upF;

          return await Section.findByIdAndUpdate(
            _id,
            { order: Number(order) },
            async (err, updateFormSec) => {
              if (err) {
                console.log(err);
              }

              const { templateID, formProps } = data;
              if (templateID || formProps) {
                const updateFormProps = await Form.findOneAndUpdate(
                  { sectionID: updateFormSec._id },
                  { templateID, formProps },
                  (err, newProps) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log({ newProps });

                    return newProps;
                  }
                );

                return {
                  updateFormSec,
                  updateFormProps: updateFormProps,
                };
              }
            }
          );
        })
      );

      const saveChangesValue = [...createImageSections, ...updateImageSections, ...createFormSections, ...updateFormSections];

    

      console.log({saveChangesValue});
      return res.send({
        // createImageSections,
        // updateImageSections,
        // createFormSections,
        // updateFormSections,
        // createdImageSec,

        saveChangesValue
      });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: `Save changes has an error ${error} !!!` });
    }
  },
};

module.exports = SectionController;


