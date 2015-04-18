var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

module.exports.connect = connection.connect(function(err){
  console.log("i'm connected");
  if(err){
    console.log(err);
  }
});

module.exports.storeUser = function (username){
  connection.query('INSERT into users (username)'
                    + ' values (' + username + ');');
  getUserID(username);
};

module.exports.storeMessage = function (message, username, roomname ){
  getUserID(username);
  connection.query('INSERT into messages (message, author, room)'
                    + ' values (' + message + ', ' + author + ','+ room + ');');
};

module.exports.storeRoom = function (roomname){
  connection.query('INSERT into rooms (roomname)'
                    + ' values (' + roomname + ');');
};

var getUserID = function(username){

  console.log(connection.query('SELECT uid FROM users WHERE username = "' + username + '";'), '======================');
};
