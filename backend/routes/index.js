const express = require('express');

const router = express.Router();

const controller = require('../contoller/Controller');

router.get('/GetRomainNumber', controller.GetRomainNumber);

router.post('/ConvertNumber', controller.ConvertNumber);

router.get('/status', controller.status);

module.exports = router;
