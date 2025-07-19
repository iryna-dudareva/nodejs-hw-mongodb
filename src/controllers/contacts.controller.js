import { getAllContacts, getContactById, createContact, deleteContact, updateContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContacts = async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
};

export const getContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact under ${contactId}`,
        data: contact,
    });

   
};

export const addContact = async (req, res) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    if (!name || !phoneNumber || !contactType) {
        throw createHttpError(400, 'Empty required field(s)');
    }

    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact',
        data: newContact,
    });
};


export const deleteContactC = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Not found'));
        return;
    }

    res.status(204).send();
};


export const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body, {
        upsert: true,
    });

    if (!result) {
        next(createHttpError(404, 'Not found'));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: 'Successfully updated the contact',
        data: result.contact,
    });
};


export const patchUpdateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body); 

    if (!result) {
        next(createHttpError(404, 'Not found'));
        return;
    }


    res.status(200).json({
        status: 200,
        message: 'Successfully updated contact',
        data: result,
    });
};