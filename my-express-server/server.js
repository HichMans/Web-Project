const express = require('express');
const app =express();
app.get("/",(req,res)=> {
  res.send ("<h1>HELLO, THAT Hichem</h1>");
});
app.get("/contact",(req,res)=> {
  res.send ("<h2>Contact me at : hicmans2013@gmail.com</h2>");
});
app.get("/about",(req,res)=> {
  res.send ("<h2>Hichem Mansour, Blockchain Software Developer </h2>");
});
app.get("/hobbies",(req,res)=> {
  res.send ("<h2>Playing Violin, and Painting </h2>");
});
app.get("/",(req,res)=> {
  res.send ();
});
app.listen(3000,()=>{console.log("Server started on port 3000")});
