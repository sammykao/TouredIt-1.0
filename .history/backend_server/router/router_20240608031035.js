const express = require('express');
const router = express.Router();

const portal_controls = require('./../controller/guide_portal')
const website_controls = require('./../controller/website')


/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create#
// Ex: router.get('/user', controller.function <- so when 
// localhost:3001/user called with get request we want to return a function or page);

router.get('/clie', portal_controls.client_data)
website_controls.

//Export for app.js
module.exports = router;