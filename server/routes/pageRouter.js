const router = require('express').Router()
const PageController = require('../controllers/pageCtrl');

router.post('/add-page', PageController.createPage);
router.get('/get-sections/:pageId', PageController.getListSectionOfPage)
router.get('/get-all-pages', PageController.getAllPage)

module.exports = router;