CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  uid int NOT NULL,
  username VARCHAR(255),
  PRIMARY KEY (uid)
);

CREATE TABLE rooms (
  uid int NOT NULL,
  roomname VARCHAR(255),
  PRIMARY KEY (uid)
  -- FOREIGN KEY (author) REFERENCES users(uid)
);

CREATE TABLE messages (
  message  VARCHAR(255),
  author int,
  room int,
  FOREIGN KEY (author) REFERENCES users(uid),
  FOREIGN KEY (room) REFERENCES rooms(uid)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

