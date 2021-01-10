const contactService = require("../services/contact.service");
const express = require("express");
const router = express.Router();

router.get("/:contactId", async function (req, res, next) {
  try {
    let contact = await contactService.getContactById(req.params.contactId);
    res.send(contact);
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    let contacts = await contactService.getAllContact();
    res.send(contacts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res) {
  const contact = await contactService.createContact(
    req.body.name,
    req.body.email,
    req.body.title,
    req.body.description
  );
  res.send(contact);
});

router.put("/:contactId", async function (req, res, next) {
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

router.delete("/:contactId", async function (req, res) {
  const result = await contactService.deleteContact(req.params.contactId);
  res.send(result);
});

module.exports = router;
