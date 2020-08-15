const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../model/User');



// register function
const register = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // get all fields from request body
    const { name , email , password , confirmPassword } = req.body;

    // check if password matches with confirmPassword
    if(password != confirmPassword ){
        return res.status(400).json({
            errors: [{
                msg: 'Password does not match.'
            }]
        })
    }

    // check if user already exists
    try {
        const user = await User.find({email});
        if(user.length != 0){
            return res.status(409).json({
                errors: [{
                    msg: 'User already exists.'
                }]
            })
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        // generate token
        const payload = {
            user: {
                _id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err , token) =>{
                if (err) throw err;
                res.status(200).json({ token })
            }
        )

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
    }
}



// login function
const login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // get all fields from request body
    const { email , password } = req.body;

    // check if user exists
    try {
        const user = await User.findOne({email});
        // if user does not exists
        if(user.length == 0){
            return res.status(400).json({
                errors: [{
                    msg: 'User does not exists.'
                }]
            })
        }
        
        // check for password
        const isEqual = await bcrypt.compare(password , user.password);
        if(!isEqual){
            return res.status(400).json({
                errors: [{
                    msg: 'Password is incorrect.'
                }]
            })
        }

        // generate token
        const payload = {
            user: {
                _id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err , token) =>{
                if (err) throw err;
                res.status(200).json({ token })
            }
        )


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
    }

}

module.exports = {
    register,
    login
}