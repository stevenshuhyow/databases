// YOUR CODE HERE:
//Display messages retrieved from the parse server
var dataRetrieved;
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};
var friendList = {};
var information = [];
var roomNames = {FriendList: "FriendList"};
var currentRoom;
var currUser;

//Define the initialization function
app.init = function() {
   app.fetch();



  $(document).ready(function(){
    currUser = prompt("Please enter your username");

    $('body').on("click", "#main .username", function(){
      var specificUser = $(this).text();
      var stopPoint = specificUser.indexOf(":");
      specificUser = specificUser.slice(0,stopPoint-1);
      app.addFriend(specificUser);
    });


    $('#send').on("click", ".submit", function(evt){
      var newPost = {};
      newPost.text = $('textarea#message').val();
      newPost.username = currUser;
      newPost.roomname = currentRoom;
      newPost.createdAt = new Date();
      newPost.updatedAt = new Date();
      information.push(newPost);
      $('.username').remove();
      filter(information);
      // app.handleSubmit(newPost.message);
      evt.preventDefault();
      $('textarea#message').val('')
    });

    $('select').on('change', function (e) {
      $('.username').remove();
      app.createRoomBar(roomNames);
      currentRoom = $('select :selected').text();
      if(currentRoom === "FriendList"){
        friendFilter(information)
      } else{
      filter(information);
      }


    });

    $('.addRoom').on('click', function (e) {
      var newRoom = prompt("Please enter the new chat room name: ");
      $('.username').remove();
      roomNames[newRoom] = newRoom;
      app.createRoomBar(roomNames);
      currentRoom = $('select :selected').text();
      filter(information);
    });
  })

};


//Define the send/POST function
app.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};



var getData = function(data){
  _.each(data, function(element){
    _.each(element, function(elem){
      information.push(elem);
      roomNames[elem.roomname] = elem.roomname;
    })
  })
}

var filter = function(objectList){

  _.each(objectList, function(elem){
    if(elem.roomname === currentRoom){
      $('#main #chats').append("<a class='username'>" + elem.username +" : " + elem.text+ "</a>");
    }

  });

}

var friendFilter = function(information){
  _.each(information, function(elem){
    if(friendList[elem.username]){
      $('#main #chats').append("<a class='username'>" + elem.username +" : " + elem.text+ "</a>");
    }
  })
}

//Define the fetch/GET function
app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {limit: 10},
    contentType: 'application/json',
    calledOnce: true,
    success: function (data) {
      getData(data);
      app.createRoomBar(roomNames);
      currentRoom = $('select :selected').text();
      filter(information);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

app.createRoomBar = function(roomObject){
  _.each(roomObject, function(roomname){
    if(roomname !== undefined && $('option').text().indexOf(roomname)===-1){
    var room = $('<option></option>');
    // room.val(roomname);
    room.text(roomname);
    $('select').append(room);
    }
  })
}





app.clearMessages = function(){
  $('#chats').html('');
};

app.addMessage = function(message){
  //$('#chats').append("<p class = username></p>");
  //$('#chats p').text(message.username);
  $('#chats').append("<p class = 'message username'></p>");
  $('#chats p').text(message.username + " - " + message.text);
}

// app.handleSubmit = function(message) {
//   $('#main').append("<p></p>");
//   $('#main p').text(message);
// }

// app.addRoom = function(roomName) {
//   $('#roomSelect').append("<p></p>");
//   $('#roomSelect p').text(roomName);
// }



app.addFriend = function(username){
  console.log(username);
  if(username !== undefined && !friendList.hasOwnProperty(username)){
    friendList[username] = username;
    // room.val(roomname);
    var list = $('<div class="friendList"></div>');
    list.text(username);
    $('#friendList').append(list);
  }
};



app.init();




