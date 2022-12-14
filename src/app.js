const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');


const port = process.env.PORT || 9000;


const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));
app.set('view engine','hbs');

const template_path = path.join(__dirname,"../templates/views");
app.set('views',template_path)


const partials_path = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partials_path)
//routing

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/about',(req,res)=>{
    res.render("about");
})

app.get('/weather',(req,res)=>{
    res.render("weather");
})

app.get('*',(req,res)=>{ // if nothing is found in url
    res.render("404ErrorPage",{
        errorMsg: 'Oops! Page Not Found'
    });
})


app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);
})