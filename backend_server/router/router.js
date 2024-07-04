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
router.get('/retGuideInfo', portal_controls.retrieveGuideInfo);
router.get('/newGuide', portal_controls.insertGuideAccounts);
router.get('/updateGuide', portal_controls.updateGuideAccounts);
router.get('/newHobby', portal_controls.addHobbies);
router.get('/newInvolvement', portal_controls.addInvolvement);
router.get('/remHobby', portal_controls.deleteHobby);
router.get('/remInvolvement', portal_controls.deleteInvolvement);
router.get('/newAvailability', portal_controls.addAvailability);
router.get('/newMetrics', portal_controls.addMetrics);
router.get('/remAvailability', portal_controls.deleteAvailability);
router.get('/retAvailability', portal_controls.retrieveAvailability);
router.get('/retHobby', portal_controls.retrieveHobbies);
router.get('/retInvolvement', portal_controls.retrieveInvolvement);
router.get('/retTours', portal_controls.retrieveTours);
router.get('/retMetrics', portal_controls.retrieveMetrics);






//Export for app.js
module.exports = router;
