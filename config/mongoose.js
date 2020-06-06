//1step requrie the library
const mongoose = require('mongoose');

//2nd step it connects mongoose with db
mongoose.connect('mongodb://localhost/contacts_list_db');
//this is how mongoose will connect to database


//3rd step acquire the conncection to check if it is successfull
//to verify whether it is connected or not
// this db is used to accessing a database, this connection gives connection to variable db
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));
//finaly if connection is successful
db.once('open', function() {
    // we're connected!
    console.log('Successfully connected to database');
  });