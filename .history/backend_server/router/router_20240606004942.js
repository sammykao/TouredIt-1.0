const express = require('express');
const router = express.Router();



/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create
router.get('/', controller.frontpage);
router.get('/dashboard', controller.dashboard);
router.get('/dashboard/item/:id', loggedIn, controller.dashboardViewNote);
router.put('/dashboard/item/:id', loggedIn, controller.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', loggedIn, controller.dashboardDeleteNote);
router.get('/dashboard/add', loggedIn, controller.dashboardAddNote);
router.post('/dashboard/add', loggedIn, controller.dashboardAddNoteSubmit);
router.get('/dashboard/search', loggedIn, controller.dashboardSearch);
router.post('/dashboard/search', loggedIn, controller.dashboardSearchSubmit);

//Export for app.js
module.exports = router;