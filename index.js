const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
const users = require('./routes/api/users')

// ab-user || BristolAerospace1234
// const MONGODB_URI = 'mongodb+srv://aerospace-admin:BristolAerospace1234@aerospacedb.al5th.mongodb.net/AerospaceDB?retryWrites=true&w=majority'

mongoose.connect('mongodb://localhost/ab_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Verify Mongoose connection
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected")
});

// Parses incoming JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// HTTP Request Logger
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/api/users', users)

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
