 const fs = require('fs/promises');

 const path = require('path');

 const contactsPath = path.join('./models/contacts.json');

 const { uuid } = require('uuid');


// GET
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return await JSON.parse(contacts);
};

// GET by Id
const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactArr = contacts.contacts;

  return contactArr.find(contact => contact.id === id);
};

//DELETE
const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactArr = contacts.contacts;

  const updatedContacts = contactArr.filter(
    contact => contact.id.toString() !== id,
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify({ contacts: updatedContacts }, null, 2),

  );
  const status = updatedContacts.length < contactArr.length;
  return status;
}

//POST
const addContact = async (body) => {
  const id = uuid();

  const record = {
    id,
    ...body,
  };

  const contacts = await listContacts();
  const contactArr = contacts.contacts;
  contactArr.push(record);

  await fs.writerFile(contactsPath, JSON.stringify(contacts, null, 2));

  return record;
}

//UPDATE
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contactArr = contacts.contacts;

  const contact = contactArr.find(contact => contact.id === id);
  const updatedContact = Object.assign(contact, body);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact.id ? updatedContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
