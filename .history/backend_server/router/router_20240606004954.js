const express = require('express');
const router = express.Router();



/**
 * App Routes 
*/
//Super router, make sure that we have our functions from our module we create
router.get('/', controller.frontpage);

//Export for app.js
module.exports = router;