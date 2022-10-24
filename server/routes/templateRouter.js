const router = require('express').Router()
const templateCtrl = require('../controllers/templatesCtrl')

router.post('/add__template', templateCtrl.addTemplate);
router.get('/get__template', templateCtrl.getInfoTemplate);

module.exports = router;