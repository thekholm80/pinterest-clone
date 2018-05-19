const { MongoClient } = require('mongodb');

const { DB_URL } = require('./config');

module.exports = async () => {
  /**
   * Connects to database, returns an object with each collection
   *
   * @returns {object} object containing collection instances
   */

  const mongoOptions = { useNewUrlParser: true };
  const client = await MongoClient.connect(DB_URL, mongoOptions).catch(err => { throw err; });

  return {
    Users: client.db('pinterest').collection('users')
  };
};
