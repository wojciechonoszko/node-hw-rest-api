//  const fs = require('fs/promises');

//  const path = require('path');

//  const contactsPath = path.join('./models/contacts.json');

//  const { v4 } = require('uuid');

 const Contact = require ('./schemas/contact');


// GET
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return await JSON.parse(contacts);
};

// GET by Id
const getContactById = async id => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === id);

  console.log(id);
  return contact;
};

// DELETE
const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
  } catch (error) {
    console.error(error);
  }
};

// POST
const addContact = async (body) => {
  const id = v4();

  const record = {
    id,
    ...body,
  };

  const contacts = await listContacts();
  
  contacts.push(record);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return record;
}

// UPDATE
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
