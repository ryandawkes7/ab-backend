const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP Request Logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
