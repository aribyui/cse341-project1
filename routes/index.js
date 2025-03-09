const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(400).send('Hello World');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
