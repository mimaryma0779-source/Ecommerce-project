const express=require('express');

const app=express()

app.get("/",(req,res) =>{
  res.sendFile(__dirname + "/FrontEnd/FenetrePrincipale.html");
});

app.listen(3000,()=>{
    console.log("Im listening in port 3000");
});