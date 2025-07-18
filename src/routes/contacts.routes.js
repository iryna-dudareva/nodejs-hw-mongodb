import express from 'express';
import { addContact, getContact, getContacts, deleteContactC, updateContact, patchUpdateContact } from '../controllers/contacts.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post('/contacts', ctrlWrapper(addContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactC));
router.put('/contacts/:contactId', ctrlWrapper(updateContact));
router.patch('/contacts/:contactId', ctrlWrapper(patchUpdateContact));


export default router;