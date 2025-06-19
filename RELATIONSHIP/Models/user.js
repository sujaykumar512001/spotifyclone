const mongoose = require('mongoose');
const{Schema}=mongoose;
main()
.then(()=>console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema=new Schema({
    username:String,
    addresses:[{
        location:String,
        city:String,
    },],


});
const User=mongoose.model("User",userSchema);

const addUsers=async()=>{
    let user1=new User({
        username:"amit",
        addresses:[{
            location:"chap and dona",
            city:"bengaluru",
        },],

    });
    user1.addresses.push({location:"jaipur",city:"delhi"});
    let result=await user1.save();
    console.log(result);
};
addUsers();