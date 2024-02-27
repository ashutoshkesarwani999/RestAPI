import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
});

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    if(user.isModified("password")){
        bcrypt.genSalt(10,function (err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
})