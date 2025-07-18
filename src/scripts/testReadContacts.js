import { initMongoConnection } from "../db/initMongoConnection.js";
import { contactsCollection } from "../models/contacts.js";

const testReadContacts = async () => {
  try {
    // 1. Connect to MongoDB
    await initMongoConnection();

    // 2. Fetch all contacts
    const contacts = await contactsCollection.find();

    // 3. Print results
    console.log("Contacts from DB:", contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
  }
};

testReadContacts();
