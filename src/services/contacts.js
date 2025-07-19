import { contactsCollection } from "../models/contacts.js";

export const getAllContacts = async (query) => {
    const { page = 1, perPage = 10, sortBy, sortOrder = 'asc', type, isFavourite } = query;

    const filter = {};
    if (query.type) {
        filter.contactType = query.type;
    }
    if (query.isFavourite !== undefined) {
        filter.isFavourite = query.isFavourite === 'true';
    }

    const skip = (page - 1) * perPage;

    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const totalItems = await contactsCollection.countDocuments(filter);
    const contacts = await contactsCollection
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(perPage));
    
    const totalPages = Math.ceil(totalItems / perPage);
    return {
        contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
    };
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

