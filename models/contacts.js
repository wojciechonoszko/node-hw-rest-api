
 const Contact = require ('./schemas/contact');


// GET
const listContacts = async () => {
  return result = Contact.find().lean();
  
  
};

// GET by Id
const getContactById = async id => {
  return result = Contact.findOne({ _id: id}).lean();
  
  
};

// DELETE
const removeContact = async (id) => {
  return result = Contact.findByIdAndRemove({_id: id});
};

// POST
const addContact = async (body) => {
  return result = Contact.create(body);
  
}

// UPDATE
const updateContact = async (id, body) => {
  return result = Contact.findOneAndUpdate(
    {
      _id: id,
    },
    { ...body },
    { new: true },
  );
  
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
