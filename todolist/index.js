const express=require('express');
const app=express();
const path=require("path")

app.use(express.urlencoded({extended:true}))
var methodoverride=require('method-override');
app.set("view enging","views")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodoverride('_method'));


app.get("/",async(req,res)=>{
    
    res.render("index.ejs");
})
app.get("/new",async(req,res)=>{
    res.render("new.ejs");
})
app.post("/new",async(req,res)=>{
    const {workname,workDate}=req.body;
    const newwork=new todolist({
        workname:workname,
    })
    await newwork.save();
    res.redirect("/");
})

//delete route
app.post("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    res.redirect("/")
})

const port=3000;
app.listen(port,()=>{
    console.log("app is running on port 3000");
})