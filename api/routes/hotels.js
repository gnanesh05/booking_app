import express from "express";
const router = express.Router();
import Hotel from '../models/Hotels.js'
import {verifyAdmin} from '../utils/verifyToken.js'

//create
router.post("/", verifyAdmin, async(req, res, next)=>{
    const newHotel = new Hotel(req.body)
    try {
      const savedHotel = await newHotel.save()
      console.log(savedHotel)
      return res.status(200).json(savedHotel)
    } catch (error) {
       next(error)
    }
})

//update
router.put('/:id', verifyAdmin, async(req, res, next)=>{
    try 
     {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        return res.status(200).json(updatedHotel)
    } catch (error) { 
        next(error)
    }
})

//delete
router.delete('/:id', verifyAdmin, async(req, res, next)=>{
    try
     {
        await Hotel.findByIdAndDelete(req.params.id)
        return res.status(200).json({"msg" : "Hotel Deleted"})
    } catch (error) { 
        next(error)
    }
})

//get hotel
router.get('/find/:id', async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        return res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
})

//get all
router.get("/",async(req,res, next)=>{
    const {min, max , ...others} = req.query
    try {
        const hotels = await Hotel.find({...others, cheapestPrice:{$gt:min||1, $lt:max||9990}}).limit(req.query.limit)
        return res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
})

//get count by city
router.get("/countByCity",async(req,res,next)=>{
    console.log(req.query.cities)
    const cities = req.query.cities.split(',')
    console.log(cities)
    try{
        const hotelsList = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        return res.status(200).json(hotelsList)
    }
    catch (error) {
        next(error)
    }
})

//get count by type
router.get("/countByType",async(req,res,next)=>{
   
    try{
        const hotels = await Hotel.countDocuments({type: "hotel"})
        const apartments = await Hotel.countDocuments({type: "apartment"})
        const resorts = await Hotel.countDocuments({type: "resort"})
        const villas = await Hotel.countDocuments({type: "villa"})
        const cabins = await Hotel.countDocuments({type: "cabin"})
        return res.status(200).json([
            {type:"hotels", count: hotels},
            {type: "apartments", count: apartments},
            {type:"resorts", count: resorts},
            {type:"villas", count:villas},
            {type:"cabins", count:cabins}
        ])
    }
    catch (error) {
        next(error)
    }
})

export default router