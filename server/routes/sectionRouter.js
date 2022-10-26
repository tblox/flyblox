const router = require('express').Router()
const SectionController = require('../controllers/sectionCtrl');


// router.post('/save-changes', [verifyAPIKey], templateCtrl.addTemplate);

router.post('/save-changes/:pageId',  SectionController.saveChanges);
// router.get('/get-section', templateCtrl.getInfoTemplate);

module.exports = router;