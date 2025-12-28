//heder
const express=require("express");
const app=express();
var methodoverride=require('method-override');
const { v4: uuidv4 } = require('uuid');
const path=require("path");
app.use(express.urlencoded({extended:true}))
// uuidv4();

//using metod
app.use(methodoverride('_method'));
app.set("view engine","views");
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")))


//create an arry

let posts=[{
    id:uuidv4(),
    username:"Sachin kumar",
    content:"Do Your Work Well!"
}]

//get,post,putch,delete function
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/new/post",(req,res)=>{
    res.render("new.ejs");
})
app.post("/new/post",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/");
})

app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let pos=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
  let {Newcont}=req.body;
  console.log(Newcont);
    let post=posts.find((p)=>id===p.id);
    post.content=Newcont;
    res.redirect("/");
})

app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/");
})


app.get("/post/:id/detail",(req,res)=>{
    let ids=req.params
    let pos=posts.find((p)=>ids===p.id);
    res.render("post.ejs",{post});
})

//port for listener
let port=3000;
app.listen(port,()=>{
    console.log(`app is runing on port${port}`);
})