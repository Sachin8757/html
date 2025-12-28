const mongoose=require('mongoose');
main().then(()=>{
    console.log("connection successfull");
}).catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://sachin:8757887103@shopdata.shpwbu2.mongodb.net/?retryWrites=true&w=majority&appName=whatapp");
    
}

const chats=new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("chat",chats);
