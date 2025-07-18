import express from 'express';
import { getContact, getContacts } from '../controllers/contacts.controller.js'

const router = express.Router();
router.get('/contacts', getContacts);
router.get('/contacts/:contactId', getContact);
export default router;