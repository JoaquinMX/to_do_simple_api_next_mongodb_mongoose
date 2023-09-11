
 const express = require('express');
 const router = express.Router();
 
 //router.use('/incidences', require('./routes/incidences')); 
 router.use('/users', require('./routes/users'));
 router.use('/to_do', require('./routes/to_do')); 

 module.exports = router;