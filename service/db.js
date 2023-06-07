//  import mongoose
const mongoose=require('mongoose')

// connection string
// mongoose.connect('mongodb://localhost:27017')
mongoose.connect('mongodb://127.0.0.1:27017/foodApp')

// model - User to store user login and register data

const User= mongoose.model('User',{
    phone:Number,
    uname:String,
    psw:String,
    order:[]
})

// schema of food menu

const Food=mongoose.model('Food',{
    id:Number,
    foodName:String,
  image:String,
  categoryId:Number,
  price:String,
  decription:String,
 availability:Boolean

})


// export User

module.exports={
    User, Food
}