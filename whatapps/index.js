const express=require('express');
const app=express();
const path=require('path');
const chat=require('./model');

app.set("views enging","views");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,("/public"))));
var methodoverride=require('method-override');
app.use(express.urlencoded({extended:true}))

app.use(methodoverride('_method'));


//index route
app.get("/",async(req,res)=>{
    const chats=await chat.find();
    res.render("index.ejs",{chats});
})
//new msg route
app.get("/new",(req,res)=>{
res.render("new.ejs");
})
app.post("/new",(req,res)=>{
    const{from,msg,to}=req.body;
    const chat1=new chat({
        from:from,
        msg:msg,
        to:to
    })
    chat1.save();
    res.redirect("/");
})
//delete route
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const deletchat= await chat.findByIdAndDelete(id);
    res.redirect("/");
})
//edit route
app.get("/chat/:id/edit",async(req,res)=>{
    const {id}=req.params;
    const Newchat= await chat.findById(id);
    res.render("edit.ejs",{Newchat});
})
app.patch("/chat/:id/edit",async(req,res)=>{
    let {id}=req.params;
  let {Newmsg}=req.body;
  const Newch=await chat.findByIdAndUpdate(id,{msg:Newmsg});
    res.redirect("/");
})


app.listen(8080,()=>{
    console.log("server runing...")
})