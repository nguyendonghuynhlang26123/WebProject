const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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
  });
});

module.exports = router;
