var utils = require('./utils');
var db = require('./db');

var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){

    utils.collectData(request, function(message){
      console.log('controller post user');
      if(message['username']){
        db.storeUser(message['username'])
      }

      utils.sendResponse(response, {objectId: 1}, 201);
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response);
  }
};

exports.requestHandler = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
};







