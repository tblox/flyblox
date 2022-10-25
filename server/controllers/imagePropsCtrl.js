const ImageProps = require('../models/ImagePropsModel')
const cloudinary = require("../config/cloudinary.config")


const ImagePropsController = {
    getInfoImageProp: async (req, res) => {
        try {
            const imageProps = await ImageProps.find();

            return res.json(imageProps);
        } catch (err) {
            return res.err({ msg: err.message })
        }
    },

    addOrUpdateProps: async(req, res) => {
       try {
        // const imageProps = await ImageProps.find

        const result = await cloudinary.uploader.upload(req.file.path);

        let imageProps = new ImageProps({
            imageUrl: result.secure_url,
            // cloundinary_id
        })
        await imageProps.save();
        res.json(imageProps)
        
       } catch (error) {
         json.status(400).json({ msg: 'Can not upload props'})
       }
    }

}

module.exports = ImagePropsController;