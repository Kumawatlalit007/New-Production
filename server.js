const express=require('express');
const app=express();
const connectdb=require('./db');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
app.use(bodyParser.json());
dotenv.config();
connectdb();

//creating a schema

const users=mongoose.Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
        unique:true,
    },

    email:{
        type:String
    },


    age:{
        type:Number

    }

});

//creating a model 

const userChat=mongoose.model("userChat",users);


//connecting to a server


const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json({message:"hey,this is home page"});
})
app.post('/user',(req,res)=>{
    const newuser=new userChat({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
    })
    if(!newuser){
        return res.json({message:"no new user has been added"});
    }
    // let userExist=userChat.find({newuser});
    // if(userExist){
    //     return res.status(202).json({message:"user already exists"})
    // }
    newuser.save();
    res.json(newuser);
})
app.get('/user',async(req,res)=>{
    const getUser=await userChat.find({});
    if(getUser){
       return res.status(200).json(getUser);
    }
    else {
        return res.status(404).json({message:"no message found"});
    }


})
app.delete('/user/:id',(req,res)=>{
    userChat.deleteOne({id:req.params.id}).then(()=>{
        return res.status(200).json({message:"user deleted successfully"});
    }).catch((error)=>{
        res.status(404).json({message:"user not found"});
    })
})

app.put('/user/:id',(req,res)=>{
    const user=userChat.find({id:req.params.id}).then(()=>{
        id:req.params.id;
        name:req.params.name;
        age:req.params.age;
        email:req.params.email;
        res.status(200).json({message:"user updated successfully"});
        user.save();
    }).catch((err)=>{
        return req.status(400).json({message:"Server error"});
    })
})


app.listen(PORT,console.log(`Server is Listening on ${PORT}`));


