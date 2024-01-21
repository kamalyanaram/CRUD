// var express = require("express");
// var path = require("path");
// const bodyParser = require('body-parser');
// var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname,'./public/form.html'));
// });

// app.post('/addName', (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     console.log('Received data:', name , age );
//     res.redirect('/');
//  });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });

const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://aram:admin1234@cluster0.lm98xcg.mongodb.net/sample_mflix';

mongoose.connect(connectionString, { useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
console.log('Connected to MongoDB!');

const userSchema = new mongoose.Schema( 
    { name: String, age: Number, id: Number } 
) 
  
// Defining User model 
const Card = mongoose.model('Card', userSchema); 
  
// Create collection of Model 
Card.createCollection().then(function (collection) { 
    console.log('Collection is created!'); 
});

try {
    const allSessions = await mongoose.connection.db.collection('sessions').find().toArray();
    console.log('All Movies', allSessions);
} catch (error) {
    console.error('Error retrieving movies:', error);
} finally {
    mongoose.connection.close();
}

});