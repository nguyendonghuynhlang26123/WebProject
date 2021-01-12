const contactService = require('../services/contact.service');
const express = require('express');
const router = express.Router();

router.get('/form', (req, res) => {
  let data = {
    contactUs: ['Contact us', 'Ask us anything!', 'How can I join your team?'],
    advertise: [
      'Advertising',
      'Our mission is to help brands make an impact in the world!',
      'How much it takes to put an ad on our site?',
    ],
    tip: ['Tipping us', 'Your contribution makes the world better!', ''],
    correction: [
      'Correcting a post',
      'We apologize for these mistakes!',
      'This post seem to be outdated or inappropriate!',
    ],
  };
  let type = req.query.type || 'contactUs';
  res.render('contact_pages/contact', {
    link: '/style/css/advertise.css',
    contact: { title: data[type][0], desc: data[type][1], hint: data[type][2] },
    type: type,
  });
});

router.get('/:contactId', async function (req, res, next) {
  try {
    let contact = await contactService.getContactById(req.params.contactId);
    res.send(contact);
  } catch (err) {
    next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    let contacts = await contactService.getAllContact();
    res.send({ data: contacts });
  } catch (err) {
    next(err);
  }
});

router.post('/', async function (req, res) {
  const contact = await contactService.createContact(
    req.body.type,
    req.body.name,
    req.body.email,
    req.body.title,
    req.body.description
  );
  res.send(contact);
});

router.put('/:contactId', async function (req, res, next) {
  try {
    const result = await contactService.updateStatusContact(
      req.params.contactId,
      req.body.status
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async function (req, res) {
  const result = await contactService.deleteContact(req.params.contactId);
  res.send({ result });
});

module.exports = router;
