import express from "express";
const router = express.Router();
import User from '../models/Users.js'
import {verifyAdmin, verifyToken, verifyUser} from '../utils/verifyToken.js'


// //check authentication
// router.get('/checkauthentication' , verifyToken, (req,res,next)=>{
//     res.send("You're logged in")
// })

// //checkuser
// router.get('/checkuser/:id', verifyUser, (req,res,next)=>{
//     res.send("you are authorized ")
// })

//update
router.put('/:id', verifyUser, async(req, res, next)=>{
    try
     {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        return res.status(200).json(updatedUser)
    } catch (error) { 
        next(error)
    }
})

//delete
router.delete('/:id', verifyAdmin, async(req, res, next)=>{
    try
     {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({"msg" : "User Deleted"})
    } catch (error) { 
        next(error)
    }
})

//get User
router.get('/:id', verifyUser, async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

//get all
router.get("/", verifyAdmin, async(req,res, next)=>{
    try {
        const Users = await User.find()
        return res.status(200).json(Users)
    } catch (error) {
        next(error)
    }
})


export default router