const router = require('express').Router()
const PageController = require('../controllers/pageCtrl');

router.get('/get-all-pages', PageController.getAllPage);
router.post('/add-page', PageController.createPage);
router.get('/:pageId', PageController.getListSectionOfPage);


module.exports = router;