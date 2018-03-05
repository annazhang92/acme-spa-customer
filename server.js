const express=require('express');
const app =express();
const path = require("path");
const db=require('./db')
// const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const Email=db.models.Email;

const port =process.env.PORT || 3000;

// logging and body-parsing
// app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, ".", "public")));

app.listen(port,()=>console.log(`listening on port ${port}`))

db.sync()
.then(()=>db.seed());


app.get('/api/email',(req,res,next)=>{
    Email.findAll()
    .then(email=>res.send(email))
});

app.post('/api/createemail',(req,res,next)=>{
    console.log(req.body)
    Email.create(req.body)
});

app.delete('/api/:id',(req,res,next)=>{
    console.log("Ich hab gedrueckt!!")
    console.log(req.params.id)
    Email.findOne({ where: {id:req.params.id} })
    .then(email=>email.destroy()
    )
    
});