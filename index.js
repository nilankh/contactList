const express = require('express');
const path = require('path');
const port = 8000;

//ye acquire kr rhe h libarary database wala
const db = require('./config/mongoose');

//if i need to use contact
const Contact = require('./models/contact');


const app = express();
// to get the functionality of express, so this app variable has all the functionality of express

//How to set up use EJS first you have to tell express that ejs will be the view engine or template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use signifies it is a middleware bcz the parser is being put in the middle of a before my controller access the data it is called middleware
app.use(express.urlencoded());
//middleware has capcity to pass or return error form here only 
//key vale pair me lefa, ye convert krega req ko key n value me or pass kr dega
//jb form submit hoga we need kye value n pair, encode kia h use deocde krne hoga key value pair me
//express.urlenocde sbse pehle call hoga saare controller se pehle,express.urlencodedt takess the request reads the data and analyse and convert it into key and value
//urlenocaded only reads form data which is usbmitted
//static files are very core of ur web app y bcz they provide functionality using js they beautify ur page using image nd css so we need to include them in web page how to do that again middleware

app.use(express.static('assets'));




//creatinf another middleware
// app.use(function(req, res, next){
//     // console.log('middleware 1 called');
//     req.myName="Arpan";
//     next();
// });

//middleware2
// app.use(function(req, res, next){
//     // console.log("middleware 2called");
//     console.log('My name for MW1', req.myName);
//     next();
// });


var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone:"2316354838"
    }
]

// returning a response whencver a request come we are returning this
app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');

    //ye view ka file render kr rha h
    // console.log("from the get route controller ",req.myName);



    //database mongo se conncet krne ke baad fetch krna hoga contact ko
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "My Contacts List",
            //ye contactList ab change ho ke contacts hoga
            contact_list: contacts
        });
        // return res.render('home', {
        //     title: "My Contacts List",
        //     contact_list: contactList
        // });
    });
    
});

app.get('/practise', function(req, res){
    // console.log(req);
    return res.render('practise',{
        title:"Let us play with EJS"
    });
});

//ye controller h jo form banaye ho na usi ke lia ye usi ke lia kaam krega
app.post('/create-contact', function(req, res){
    // console.log(req);
    //avi kya h ye encode kia hua h avi hme parese krke chahiye jo ise parse krke show kre, expres already create krke rkha h we want to learn how to use it
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.name);
    // now ise hi append krna hme contact_list me jisse wo hme screen par show krega how we are going to append>???iske neeche
    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // });iske badle
//ye contactList comment kr rhe h server se connect krne baad
    //contactList.push(req.body);

    //push into database
    Contact.create({
        //create function y does it take name and phone as parameterts bcz we have deifned as in schema
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        //ye newContact koi v naam ho skta tha
        if(err){console.log('error in creating a contact!'); return;}

        console.log('************', newContact);
        res.redirect('back');
    });

    // return res.redirect('/');


    // return res.redirect('/practise');
});


//for deleting a contact
// app.get('/delete-contact', function(req, res){
//     //get the query from the url 
//     // console.log(req.query);
//     let phone = req.query.phone;

//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }
//     return res.redirect('back');
// });
//ye database se connect krne ke baad jo change kr rhe h islia hmne same upar wala fir se copy krke neeche wale me jor rhe h jb hm mongo se concefct kr lia h isia alag krkr kr rhe h
app.get('/delete-contact', function(req, res){
    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        //y in if there is not second argument bcz we are delting something thats y, q ki hm kch create ni kr rhe h jo return krega, so we will not get anything from that side only error milega, hm srf databse ko bol rhe h jao delete krke aa jao islia kch ni exceot for success or error, 
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    
});
app.listen(port, function(err){
    if(err){console.log('Error in running the server', err);}

    console.log('Yup!My express Servr is running on port:', port);
});




