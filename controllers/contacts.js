const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=['Contacts']
  const response = await mongodb.getDatabase().db().collection('contacts').find();
  response.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts)
  });
}

const getSingle = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
  response.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  try {
    const collection = await mongodb.getDatabase().db().collection('contacts');

    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // 📄💡 insertOne() - https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
    const response = await collection.insertOne(newContact);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Contact successfully created',
        contactId: response.insertedId
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
  } catch (err) {
    res.status(400).send({ message: 'Error occurred while creating the contact' });
  }

};

const updateContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  try {
    const collection = await mongodb.getDatabase().db().collection('contacts');
    const contactId = new ObjectId(req.params.id);
    const updateContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }

    // 📄💡 updateOne() - https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/
    const response = await collection.updateOne({ _id: contactId }, { $set: updateContact });

    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: 'Contact successfully updated',
      });
    } else {
      res.status(404).json({
        message: 'Contact not found or no changes were made',
      });
    }

  } catch (err) {
    res.status(400).send({ message: 'Error occurred while updating the contact' });
  }

};

const deleteContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  try {

    const collection = await mongodb.getDatabase().db().collection('contacts');
    const contactId = new ObjectId(req.params.id);

    // 📄💡 deleteOne() - https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/
    const response = await collection.deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: 'Contact successfully deleted',
      });
    } else {
      res.status(404).json({
        message: 'Contact not found',
      });
    }

  } catch (err) {

    res.status(400).send('An error occurred while deleting the contact');

  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};