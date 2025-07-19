import express from 'express';
import { addContact, getContact, getContacts, deleteContactC, updateContact, patchUpdateContact } from '../controllers/contacts.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactValidation.js';
import { isValidId } from '../middlewares/isValid.js';

const router = express.Router();
router.get('/contacts', ctrlWrapper(getContacts));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContact));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(addContact));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactC));
router.put('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchUpdateContact));


export default router;