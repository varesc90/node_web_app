const express = require('express');
const app = express(); // create server
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const host = "0.0.0.0";
app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) =>{
        if(err){
            console.log("unable to append file");
        }
    });

    next();
}); // Middleware


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         title:"Home Page",
//         welcome_message: "Welcome Home",
//     });
//
// });

app.use(express.static(__dirname + '/public')); // Middleware

app.get('/', (req,res) => {
    // res.send('<h1>Hello Express !</h1>');

    res.render('about.hbs',{
        title:"Home Page",
        welcome_message: "Welcome Home",
    });
});



app.get('/about',(req,res) => {
    res.render('about.hbs',{
        title:"About Page",
    });
});

app.get('/bad',(req,res) => {
   res.send({
       errorMessage:'Unable to handle request',
   });
});


app.listen(port,host);

console.log(`Server is up on ${port} ${host}`);

