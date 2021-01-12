const Contact = require('../../../models/contact.schema');

async function createContact(type, name, email, title, description) {
  let data = {
    type: type,
    name: name,
    email: email,
    title: title,
    description: description,
    status: 'waiting',
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  contact = await Contact.create(data);
  return contact;
}

async function getContactById(contactId) {
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) throw new Error('Not Found Contact!');
  return contact;
}

async function getAllContact(select, limit) {
  const contacts = await Contact.find({}, select, { limit: limit });
  return contacts;
}

async function updateStatusContact(contactId, status) {
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) return;
  contact.status = status;
  contact.updated_at = Date.now();
  const result = await Contact.updateOne({ _id: contact._id }, contact);
  return result;
}

async function deleteContact(contactId) {
  const result = await Contact.deleteOne({ _id: contactId }).exec();
  return result;
}

module.exports = {
  createContact: createContact,
  getAllContact: getAllContact,
  getContactById: getContactById,
  updateStatusContact: updateStatusContact,
  deleteContact: deleteContact,
};
