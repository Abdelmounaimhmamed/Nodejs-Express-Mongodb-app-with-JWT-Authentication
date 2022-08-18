const asyncHandler = require("express-async-handler");
const Goal = require("./../models/Goals");
const User = require("../models/UserModel");

// get all goals
const GetGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user : req.user.id});
    res.status(200).json(goals);
})
// Post || create
const SetGoal = asyncHandler(async (req,res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error("Please add a text field ");
    }
    const goal = await Goal.create({
        text : req.body.text,
        user : req.user.id
    });
    res.status(200).json(goal)
})
// update
const UpdateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found !');
    }
    const user = await User.findById(req.user.id);
    // check for user 
    if (!user){
        res.status(401);
        throw new Error("user not found");
    }

    // make sure the logged user matches the goal user  
    if (goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("user not authorized");
    } 


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id ,  req.body, {new : true});
    res.status(200).json(updatedGoal);
})

// delete
const DeleteGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found !");
    }
    const user = await User.findById(req.user.id);
    // check for user 
    if (!user){
        res.status(401);
        throw new Error("user not found");
    }

    // make sure the logged user matches the goal user  
    if (goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("user not authorized");
    } 
    await goal.remove()
    res.status(200).json({id : req.params.id});
});

module.exports = {
    GetGoals,
    SetGoal,
    UpdateGoal,
    DeleteGoal
};