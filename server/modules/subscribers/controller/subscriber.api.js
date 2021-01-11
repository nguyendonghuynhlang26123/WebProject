const subscriberService = require('../services/subscriber.service');
const express = require('express');
const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    const subscriber = await subscriberService.createSubscriber(req.body.email);
    res.send(subscriber);
  } catch (err) {
    next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    const subscribers = await subscriberService.getAll(req.query);
    res.send({ data: subscribers });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
