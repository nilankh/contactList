const mongoose = require('mongoose');
//creating a schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required:true
    }
});
//since we have created a schema, we need to tell whats would be the name of collection which will be using the schema

const Contact = mongoose.model('Contact', contactSchema);
//finally we need to export this
module.exports = Contact;