const Section = require("../models/SectionsModel");
const ImageProps = require("../models/ImagePropsModel");
const Form = require("../models/FormModel");
const Template = require("../models/TemplatesModel");
const cloudinary = require("../config/cloudinary.config");

const SectionController = {
  addNewSection: async (req, res) => {
    try {
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
          const { order, typeSection, data } = creI;

          // if (order === 0)
          //   return res.status(400).json({ msg: "Order already exists !!!" });

          const tmp = await Section.findOne({ order });

          if (tmp)
            return res.status(400).json({ msg: "Order already exists !!!" });

          return await Section.create(
            { order: Number(order), typeSection },
            async (err, newImgSec) => {
              if (err) {
                console.log({ err });
              }
              console.log({ newImgSec });

              //   save image url record
              const { imageUrl } = data;
              // check image is correct or not

              console.log('aaaaaaaa', imageUrl);

              //  end check image is correct or not
              if(!imageUrl) {
                return res.status(400).json({ msg: 'Image is required !'})
              } 

              const newImageUrl = await ImageProps.create(
                { sectionID: newImgSec._id, imageUrl },
                (err, newImage) => {
                  if (err) {
                    console.log({ err });
                  }
                  console.log({ newImage });

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
              console.log({ updatedImgSec });
              // updaye image url record if have
              //  end check image url record if have

              const { imageUrl } = data;
              if (imageUrl) {
                const updateImageUrl = await ImageProps.findOneAndUpdate(
                  { sectionID: updatedImgSec._id },
                  { imageUrl },
                  (err, newImage) => {
                    if (err) {
                      console.log({ err });
                    }
                    console.log({ newImage });

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
          const { order, typeSection, data } = creF;

          const tmp = await Section.findOne({ order });

          if (tmp)
            return res.status(400).json({ msg: "Order already exists !!!" });

          return await Section.create(
            { order: Number(order), typeSection },
            async (err, newFormSec) => {
              if (err) {
                console.log({ err });
              }

              console.log({ newFormSec });

              const { templateID, formProps } = data;

              const newProps = await Form.create(
                { sectionID: newFormSec._id, templateID, formProps },
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
            { order: Number(order)},
            async (err, updateFormSec) => {
              if(err) {
                console.log({ err });
              }
              console.log({ updateFormSec });

              const { templateID, formProps} = data;
              if(templateID || formProps) {
                const updateFormProps = await Form.findOneAndUpdate(
                  { sectionID: updateFormSec._id },
                  { templateID, formProps },
                  (err, newProps) => {
                    if(err) {
                      console.log({ err });
                    }
                    console.log({ newProps });

                    return newProps;
                  }
                );

                return {
                  updateFormSec,
                  updateFormProps: updateFormProps,
                }
              }

            }
          )
        })
      );

      // console.log({ createdImageSec });

      // const [createdFormSec] = await Promise.all(
      //   createFormSections.map(async (creF) => {
      //     const { order, typeSection, data } = creF;

      //   })
      // )

      return res.send({
        createImageSections,
        updateImageSections,
        createFormSections,
        updateFormSections,
        createdImageSec,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ msg: `Save changes has an error ${error} !!!` });
    }
  },
};

module.exports = SectionController;
