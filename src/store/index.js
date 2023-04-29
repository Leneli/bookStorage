const {createStore} = require('./createStore');
const {getStore} = require('./getStore');
const {updateStore} = require('./updateStore');
const redisClient = require('./redis');

module.exports = {
  redisClient,
  createStore,
  getStore,
  updateStore,
};
