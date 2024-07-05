const express = require('express');
const router = express.Router();

const portal_controls = require('./../controller/guide_portal')
const website_controls = require('./../controller/website')


/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create#
// Ex: router.get('/user', controller.function <- so when 
// localhost:3001/api/getClient called with get request we want to return a function or page);

// client side
router.get('/accountInfo', website_controls.retrieveClientInfo);
router.get('/newClient', website_controls.insertClientAccounts);
router.get('/updateClient', website_controls.updateClientInfo);
router.get('/allGuides', website_controls.getAllGuides);
router.get('/guideInfo', website_controls.getGuideInfo);
router.get('/filterGuides', website_controls.getGuidesByFilter);
router.get('/schoolNames', website_controls.getAllSchoolNames);
router.get('/schoolInfo', website_controls.getSchoolInfo);
router.get('/allSchools', website_controls.getAllSchoolInfos);



// guide portal 
router.post('/retGuideInfo', portal_controls.retrieveGuideInfo);
router.post('/newGuide', portal_controls.insertGuideAccounts);
router.post('/updateGuide', portal_controls.updateGuideAccounts);
router.post('/newHobby', portal_controls.addHobbies);
router.post('/newInvolvement', portal_controls.addInvolvement);
router.post('/remHobby', portal_controls.deleteHobby);
router.post('/remInvolvement', portal_controls.deleteInvolvement);
router.post('/newAvailability', portal_controls.addAvailability);
router.post('/newMetrics', portal_controls.addMetrics);
// router.post('/remAvailability', portal_controls.deleteAvailability);
// router.post('/retAvailability', portal_controls.retrieveAvailability);
// router.post('/retHobby', portal_controls.retrieveHobby);
// router.post('/retInvolvement', portal_controls.retrieveInvolvement);
// router.post('/retTours', portal_controls.retrieveTours);
// router.post('/retMetrics', portal_controls.retrieveMetrics);






//Export for app.js
module.exports = router;
