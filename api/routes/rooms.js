import express from 'express'
import Hotel from '../models/Hotels.js'
import Room from '../models/Rooms.js'
import { createError } from '../utils/error.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router()


//create room
router.post('/:hotelId', async (req, res, next)=>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        } 
        catch (error) {
            next(error)
        }

        return res.status(200).json(savedRoom)
    } 
    catch (error) {
        next(error)
    }
} )

//update
router.put('/:id', verifyAdmin, async(req, res, next)=>{
    try 
     {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        return res.status(200).json(updatedRoom)
    } catch (error) { 
        next(error)
    }
})

//delete
router.delete('/:roomid/:hotelid', verifyAdmin, async(req, res, next)=>{
    try
     {
        await Room.findByIdAndDelete(req.params.roomid)
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelid, {$pull: {rooms: req.params.roomid}})
        } 
        catch (error) {
            next(error)
        }
        return res.status(200).json({"msg" : "room Deleted"})
    } catch (error) { 
        next(error)
    }
})

//get hotel
router.get('/:id', async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        return res.status(200).json(room)
    } catch (error) {
        next(error)
    }
})

//get all
router.get("/",async(req,res, next)=>{
    try {
        const rooms = await Room.find()
        return res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
})


export default router
