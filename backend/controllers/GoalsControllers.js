const asyncHandler = require("express-async-handler");

const GetGoals = asyncHandler(async (req,res) => {
    res.status(200).json({message : " get Goals"});
})

const SetGoal = asyncHandler(async (req,res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error("Please add a text field ");
    }
    res.status(200).json({message : "create goals"})
})
const UpdateGoal = asyncHandler(async (req,res) => {
    res.status(200).json({message : `update post ${req.params.id}`});
})

const DeleteGoal = asyncHandler(async (req,res) => {
    res.status(200).json({message : `delete post ${req.params.id}`});
})

module.exports = {
    GetGoals,
    SetGoal,
    UpdateGoal,
    DeleteGoal
};