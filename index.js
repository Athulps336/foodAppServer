// importing express
const express=require('express')

// importing logic file
const logic= require('./service/logic')

// app creatiom

const app= express()

// to convert all js data to json
app.use(express.json())

// import jwt
const jwt=require('jsonwebtoken')
// middleware
const jwtMiddleWare=(req,res,next)=>{
    console.log(".....middleware.....");
    try{   
        
    // access token from request header
    const token=req.headers['access_token']  //[] is used to access token because "." cannot be used
    // verify
    jwt.verify(token,"secretkey123")

    next()  // next is a must function in middleware because without next, the compiler can't exit after finishing the fn
    }
    catch{
        res.status(404).json(
            {
                statusCode:404,
                status:false,
                message:"unauthorized user"
            }
        )
    }
}

// integrate frontend with server
const cors=require('cors')
app.use(cors({origin:'http://localhost:4200'}))

// register

app.post('/register/',(req,res)=>{
    logic.register(req.body.phone,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//login

app.post('/login',(req,res)=>{
    logic.login(req.body.phone,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// view all food menu










// port set 
app.listen(3000,()=>{
    console.log("server is on");
})