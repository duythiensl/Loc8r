'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto'); //Node module for encryption
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    local:{
        email:{
            type:String,
            unique: true
            // ,
            // required:true
        },
        name:{
            type:String
            // ,
            // required:true
        },
        hash:String,
        salt:String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
userSchema.methods.setPassword = function(password){
   
    this.local.salt = crypto.randomBytes(16).toString('hex');
     
    this.local.hash = crypto.pbkdf2Sync(password,this.local.salt,1000,64,'sha512').toString('hex');

};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.local.salt,1000,64,'sha512').toString('hex');
    return this.local.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expriry = new Date();
    expriry.setDate(expriry.getDate() + 7);
    return jwt .sign({
        _id : this.local._id,
        email : this.local.email,
        name : this.local.name,
        exp : parseInt(expriry.getTime()/1000)
    },process.env.JWT_SECRET);
};
mongoose.model('User',userSchema);