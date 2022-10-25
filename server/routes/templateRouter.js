const router = require('express').Router()
const templateCtrl = require('../controllers/templatesCtrl');
const verifyAPIKey = require('../middlewares/verifyAPIKey');

router.post('/add__template', [verifyAPIKey], templateCtrl.addTemplate);
router.get('/get__template', templateCtrl.getInfoTemplate);

module.exports = router;