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

// client side
router.post('/accountInfo', website_controls.retrieveClientInfo);
router.post('/newClient', website_controls.insertClientAccounts);
router.post('/updateClient', website_controls.updateClientInfo);
router.post('/allGuides', website_controls.getAllGuides);
router.post('/guideInfo', website_controls.getGuideInfo);
router.post('/filterGuides', website_controls.getGuidesByFilter);
router.post('/', website_controls.getAllSchoolNames);
router.post('/', website_controls.getSchoolInfo);
router.post('/', website_controls.getGuidesByFilter);

getAllSchoolNames
getSchoolInfo
getAllSchoolInfos


// guide portal 
router.post('/retGuideInfo', portal_controls.retrieveGuideInfo);
router.post('/newGuide', portal_controls.insertGuideAccounts);
router.post('/updateGuide', portal_controls.updateGuideAccounts);
router.post('/newHobby', portal_controls.addHobbies);
router.post('/newInvolvement', portal_controls.addInvolvement);
router.post('/remHobby', portal_controls.deleteHobby);
router.post('/remInvolvement', portal_controls.deleteInvolvement);




//Export for app.js
module.exports = router;
