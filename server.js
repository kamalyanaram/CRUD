var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://aram:admin1234@cluster0.lm98xcg.mongodb.net/Tumo';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('films').find().toArray()
            res.render('../public/form.ejs', {
                info: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post('/addFilm', (req, res) => {
    const name = req.body.name;
    const data = req.body.data;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('films').insertOne({
                name: name,
                data: data
            })
            res.json(result);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});

