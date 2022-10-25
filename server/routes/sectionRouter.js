const router = require('express').Router()
const SectionController = require('../controllers/sectionCtrl');


// router.post('/save-changes', [verifyAPIKey], templateCtrl.addTemplate);

router.post('/save-changes',  SectionController.addNewSection);
// router.get('/get-section', templateCtrl.getInfoTemplate);

module.exports = router;