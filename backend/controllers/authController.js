const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn : '7d'});
}

const registerUser = async (req , res) => {
    try{
        const {name , email , password , profileImageUrl} = req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(401).json({message : "User Already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            profileImageUrl
        });

        const token = generateToken(user._id)

        return res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profileImageUrl : profileImageUrl,
            token : token
        });
    }
    catch(err){
        return res.status(401).json({message : "Server Error" , error : err.message});
    }
}

const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message : "User Doesnot Exists"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(401).json({message : "Incorrect Password"});
        }

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profileImageUrl : user.profileImageUrl,
            token : generateToken(user._id)
        })
    }
    catch (err) {
        res.status(401).json({message : "Server Error" , error : err.message});
    }
}

const getUserProfile = async (req , res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(401).json({message : "User Doesnot Exists"})
        }
        res.json(user);
    }
    catch (err) {
        res.status(401).json({message : "Server Error" , error : err.message});
    }
}

module.exports = {registerUser , loginUser , getUserProfile}