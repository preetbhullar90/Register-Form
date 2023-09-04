const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const userSchema = new mongoose.Schema({
   firstName:{
    type:String,
    required:true
   },
   lastName:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   isConfirmed: {
    type: Boolean,
    default: false,
},
confirmationToken: {
    type: String,
},
});
userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:'7d'})
    return token

}
const User = mongoose.model('user',userSchema);

const validate = (data)=>{
    const schema = joi.object({
        firstName:joi.string().label('First Name'),
        lastName:joi.string().label('Last Name'),
        email:joi.string().email().required().label('Email'),
        password:passwordComplexity().required().label('Password'),

    });
    return schema.validate(data)
}

module.exports = {User, validate};