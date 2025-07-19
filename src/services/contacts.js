import { contactsCollection } from "../models/contacts.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (data) => {
    const newContact = await contactsCollection.create(data);
    return newContact;
};

export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findOneAndDelete({ _id: contactId });
    return contact;
};

export const updateContactById = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId },
        { $set: payload },
        {
            new: true,
            upsert: false,
            includeResultMetadata: true,
            ...options,
        },

    );

    if (!rawResult || !rawResult.value) return null;

    return rawResult.value;   
};

