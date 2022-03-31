/// conection to Mongodb using the Mongoose package
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const fruitSchema = new mongoose.Schema({
// adding validators
  name: {
    type: String,
    required: [true, "Put the name of the fruit"]
  }
  rating: {
    type: Number,
    max: 10,
    min: 1
  }
  review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Appel",
  rating: 5,
  review: "awsome fruit!"
});
//fruit.save();
// const kiwi =new Fruit ({
//   name:"kiwi",
//   rating: 10,
//   review: "i love kiwi!"
// });
//
const orange =new Fruit ({
  name:"orange",
  rating: 5,
  review: "i like it!"
});
// // insert many
// Fruit.insertMany ([orange,kiwi], function (err) {
//   if (err) {console.log(err);} else
//   {console.log("fruits added succesfully");}
// });
//update documents
Fruit.updateOne({
  _id: "5eb1e4aa8f854a01541925e3"
}, {
  name: "Peach"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("succesfully updated");
  }
})
// delete document
Fruit.deleteOne({ name: 'Peach' }, function (err) {});

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});
const People = mongoose.model("People", peopleSchema);
const people = new People({
  name: "Hichem",
  age: 36,
  favoriteFruit: orange
});
//people.save();
// find a document
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(f) {
      console.log(f.name);
    });
  }

});
// People.find( function (err,peoples) {
//   if (err) { console.log(err);} else { console.log(peoples);}
// } );
