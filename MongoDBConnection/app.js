
 //connection to MongoDb using the native driver
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  // Insert a single document
  // db.collection('fruits').insertOne({a:1}, function(err, r) {
  //   assert.equal(null, err);
  //   assert.equal(1, r.insertedCount);

    // Insert multiple documents
    db.collection('fruits').insertMany([
      {name:"orange", score:4, review: "i like it"},
      {name:"Banana", score:8, review: "i like it"},
      {name:"kiwi", score:9, review: "i like it"}
    ], function(err, r) {
      assert.equal(null, err);
      assert.equal(3, r.insertedCount);
      console.log("insert of documents done successfully");
      client.close();
    });
  });
