const express = require('express');
const router = express.Router();

const portal_controls = require('./../controller/guide_portal');
const website_controls = require('./../controller/website')
cinst call

/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create#
// Ex: router.post('/user', controller.function <- so when 
// localhost:3001/api/getClient called with get request we want to return a function or page);

// client side
router.post('/accountInfo', website_controls.retrieveClientInfo);
router.post('/newClient', website_controls.insertClientAccounts);
router.post('/updateClient', website_controls.updateClientInfo);
router.post('/allGuides', website_controls.getAllGuides);
router.post('/guideInfo', website_controls.getGuideInfo);
router.post('/filterGuides', website_controls.getGuidesByFilter);
router.post('/schoolNames', website_controls.getAllSchoolNames);
router.post('/schoolInfo', website_controls.getSchoolInfo);
router.post('/allSchools', website_controls.getAllSchoolInfos);
router.post('/sendMail', website_controls.sendEmail);
router.post('/clientTours', website_controls.getClientTours);
router.post('/sendCustomRequest', website_controls.sendcustomtour);
router.post('/sendBookingRequest', website_controls.sendtour);
router.post('/addEmailToNewsletter', website_controls.insertNewsletter);

// guide portal 
router.post('/retGuideInfo', portal_controls.retrieveGuideInfo);
router.post('/newGuide', portal_controls.insertGuideAccounts);
router.post('/updateGuide', portal_controls.updateGuideAccounts);
router.post('/newHobby', portal_controls.addHobbies);
router.post('/newActivity', portal_controls.addInvolvement);
router.post('/newWorkExp', portal_controls.addWorkExp);
router.post('/remHobby', portal_controls.deleteHobby);
router.post('/remInvolvement', portal_controls.deleteInvolvement);
router.post('/remWorkExp', portal_controls.deleteWorkExp);
router.post('/retHobby', portal_controls.retrieveHobbies);
router.post('/retTours', portal_controls.retrieveTours);
router.post('/confirmTour', portal_controls.confirmTour);
router.post('/declineTour', portal_controls.deleteTour);
router.post('/cancelTour', portal_controls.cancelTour);








//Export for app.js
module.exports = router;
