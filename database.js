const { Client } = require("pg");

const chatStatement = `CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE 
  )`;

const userStatement = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE
  )`;

const messageStatement = `CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    receiver TEXT,
    message TEXT,
    sender_id TEXT,
    room_name TEXT, 
    room_id INTEGER,
    date TEXT,
    time TEXT
  )`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString:
    "postgres://jjlooifdgjmkuh:3165b52699d61300a402141a41428163265af6ab589763d1d0dc4728c1bd5d7b@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d33g92k7arlkf2",
});

db.connect();

db.query(chatStatement, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  const insertChatRooms = `INSERT INTO chats (name) VALUES (?)`;
  db.query(insertChatRooms, ["Music"]);
  db.query(insertChatRooms, ["Movies"]);
});

db.query(userStatement, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }
  const insertUser = `INSERT INTO users (username) VALUES (?)`;
  db.query(insertUser, ["Admin"]);
});

db.query(messageStatement, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }
});

module.exports = db;
