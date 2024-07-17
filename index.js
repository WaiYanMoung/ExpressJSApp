import express from "express";
import bodyParser from "body-parser";
import {name} from "ejs";
import session from "express-session";
const app = express();



const port = 3000;
app.use(session({
    secret: 'my-secret',  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
  }))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    if(!req.session.names){
        req.session.names = [];
    }else{
        req.session.names = req.session.names;
    }
    res.render("index.ejs",{names: req.session.names});
});

app.post("/submit",(req,res)=>{
    if(req.session.names){
    req.session.names.push({firstName: req.body.fName , lastName:req.body.lName});
    }
    else {
        req.session.names = [];
        req.session.names.push({firstName: req.body.fName , lastName:req.body.lName});
    }
    res.render("index.ejs",{names: req.session.names});
})

app.post("/edit",(req,res)=>{
    var array = req.session.names;
    console.log(req.body);
    req.session.names =  array;
    res.render("index.ejs",{
        names: array,
        id:req.body.id, 
        fName: array[req.body.id].firstName,
        lName : array[req.body.id].lastName
      });
});

app.post("/update",(req,res)=>{
   var id = req.body.id.trim();
   var array = req.session.names;
   console.log(req.body);

   console.log(array[id]);
    array[id].firstName = req.body.fName;
    array[id].lastName = req.body.lName;
   req.session.names = array;

    res.render("index.ejs",{names: array});
})
app.post("/delete",(req,res)=>{
        var array = req.session.names;
     array.splice(req.body.id,1);
     req.session.names = array;
     res.render("index.ejs",{names: array});
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

