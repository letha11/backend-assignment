const express = require('express');
const router = express.Router();
const userRoute = require('./user');

router.use('/users', userRoute);
// router.use('/posts', postRoute);

module.exports = router;