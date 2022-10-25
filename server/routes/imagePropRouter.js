const router = require('express').Router()
const ImagePropsController = require('../controllers/imagePropsCtrl');
const upload = require('../middlewares/multer/landingPageMulter')

router.post('/upload__image', upload.single("image"), ImagePropsController.addOrUpdateProps);

module.exports = router;