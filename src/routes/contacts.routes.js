import express from 'express';
import { addContact, getContact, getContacts, deleteContactC, updateContact, patchUpdateContact } from '../controllers/contacts.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactValidation.js';
import { isValidId } from '../middlewares/isValid.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContact));

router.post('/', validateBody(createContactSchema), ctrlWrapper(addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactC));
router.put('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchUpdateContact));


export default router;