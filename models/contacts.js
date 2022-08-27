 const fs = require('fs/promises');

 const path = require('path');

 const contactsPath = path.join('./models/contacts.json');

 const { v4 } = require('uuid');


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
  // return contactArr.find(contact => contact.id === id);
  // try {
  //   const contacts = await listContacts();
  //   const contact = contacts.find((contact) => contact.id.toString() === id);
  //   if (!contact) {
  //     return null;
  //   }
  //   return contact;
  // } catch (error) {
  //   console.log(error);
  // }
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



  // const contacts = await listContacts();
  // //const contactArr = contacts.contacts;

  // const updatedContacts = contacts.filter(
  //   contact => contact.id.toString() !== id,
  // );

  // await fs.writeFile(
  //   contactsPath,
  //   JSON.stringify({ contacts: updatedContacts }, null, 2),

  // );
  // const status = updatedContacts.length < contacts.length;
  // return status;
};

// POST
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

// UPDATE
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
