var models = require('../models');
var bluebird = require('bluebird');
var handler = require('../request-handler');


module.exports = {
  messages: {
    get: function (req, res) {
      console.log('controller get mess');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('controller post mess');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('controller get user');
    },
    post: function (req, res) {
      handler.requestHandler(req, res);
    }
  }
};

