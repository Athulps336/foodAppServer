// to access db
const db= require('./db')

// import jwt to user authentication

const jwt= require('jsonwebtoken')


// middleware creation


// function to register new user
register=(phone,uname,psw)=>{
    return db.User.findOne({phone}).then(user=>{
        if(user){
            return{
                message:"User already exist",
                status:false,
                statusCode:404
            }
        }
        else{
            // creating new object for new user
            newUser= new db.User({
                phone:phone,
                uname:uname,
                psw:psw,
                order:[]
                
            })
            // save new data in db
            newUser.save()
            console.log(newUser);
            return{
                message:"Registered Successfully",
                status:true,
                statusCode:200
            }
        }
    })
}


// login logic

login=(phone,psw)=>{
    return db.User.findOne({phone,psw}).then(user=>{
        if(user){
            // if there is a user generate token for authentication
            const token=jwt.sign({currentPhone:phone},"secretkey123")
            return{
                message:"Login Success",
                status:true,
                statusCode:200,
                currentUser:user.uname,
                currentPhone:user.phone,
                token   // send to client
            }
        }
        else{
            return{
                message:"Incorrect Phone number or Password",
                status:false,
                statusCode:401

            }
        }
    })
}



// export functions
module.exports={register,login}