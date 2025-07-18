import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

export const getContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact under ${contactId}`,
            data: contact,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
};