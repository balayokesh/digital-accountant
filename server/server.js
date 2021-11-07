const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json())

// Mongoose connection
const uri = 'mongodb+srv://balayokesh:strongpassword@cluster0.plvzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.use(cors());
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose connection success');
})

// Routes
const main = require('./Routes/main');
app.use('/', main);
const login = require('./Routes/Login');
app.use('/login', login);
const signup = require('./Routes/Signup');
app.use('/signup', signup);

// Run server
app.listen(port, () => {
    console.log(`Server connection success at port ${port}`);
});