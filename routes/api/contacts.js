const express = require('express')

const router = express.Router()

const Contacts = require('../../models/contacts');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactName,
} = require('./validation');

//GET
router.get('/', async (req, res, next) => {
  try {
    const data = await Contacts.getAll();

    return res.status(200).json({ status: 'success', code:200, data });
  } catch (error) {
    next(error);
  }
})

// GET by Id
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id);

    if (contact) {
      return res.status.(200).json({ status: 'success', code: 200, contact });
    }
    return res
      .status(404);
      .json({ status: 'error', code: 404, message: 'Not Found' });

  } catch (error) {
    next(error);
  }
})

//POST
router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body);
  return res
    .status (201)
    .json({ status: 'success', code: 201, data: { contact }})
  } catch (error) {
    next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
