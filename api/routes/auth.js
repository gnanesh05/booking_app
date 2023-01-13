import express from "express";
const router = express.Router();
import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import {createError} from '../utils/error.js'
import jwt from 'jsonwebtoken'

//register
router.post("/register", async(req,res, next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User()
        newUser.username = req.body.username;
        newUser.email = req.body.email
        newUser.password = hash
        
        await newUser.save()
        return res.status(200).json("user created")
    } 
    catch (error) {
        next(error)
    }
})

//login
router.post("/login", async(req,res, next)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user)
          return  next(createError(404, "User not found"))

        const isPasswordRight = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordRight)
          return next(createError(400, "Username or Password is wrong"))
        
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin},process.env.JWT)

        const{isAdmin, password, ...otherDetails} = user._doc
        return res.cookie("access_token", token,{
            httpOnly: true                        //to avoid any scripting attacks
        }).status(200).json(otherDetails)
    } 
    catch (error) {
        next(error)
    }
})

export default router