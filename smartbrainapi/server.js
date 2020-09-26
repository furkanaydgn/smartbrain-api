const express=require("express");
const bodyparser=require("body-parser")
const bcrypt =require("bcrypt-nodejs");
var cors = require('cors')
const app=express()
const knex = require('knex')
const register=require("./controller/register");
const signin=require("./controller/signin");
const profile =require("./controller/profile")
const image =require("./controller/image")



const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'deneme'
  }
});
/*
db.select('*').from('users').then(data => {
	//console.log("database verileri",data);
});
*/
app.use(bodyparser.json())
app.use(cors())

app.get("/",(req,res)=>{res.send(database.users);})
app.get("/profile/:id",(req,res) => {profile.profileHandler(req,res,db)})
app.post("/signin",(req,res)=> {signin.signinHandler(req,res,db,bcrypt)})
app.post("/register",(req,res)=> {register.handleRegister(req,res,db,bcrypt)})
app.put("/image",(req,res)=> {image.imageHandler(req,res,db)})
app.post("/imageurl",(req,res)=> {image.handleApicall(req,res)})

app.listen(3001,()=>{
	console.log("it is running")

});
/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

