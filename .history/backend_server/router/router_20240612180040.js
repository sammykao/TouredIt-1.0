const express = require('express');
const router = express.Router();

const portal_controls = require('./../controller/guide_portal')
const website_controls = require('./../controller/website')


/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create#
// Ex: router.get('/user', controller.function <- so when 
// localhost:3001/api/getClietn called with get request we want to return a function or page);

router.get('/accountInfo', website_controls.retrieveClientInfo);
router.post('/newClient', website_controls.insertClientAccounts);
router.post('/updateClient', website_controls.updateClientInfo);
router.post('/allGuides', website_controls.getAllGuides);
router.post('/guideInfo', website_controls.getGuideInfo);
router.post('')
//Export for app.js
module.exports = router;