require("dotenv").config(); // Load .env variables

const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("employeeDirectory");
  return db;
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
