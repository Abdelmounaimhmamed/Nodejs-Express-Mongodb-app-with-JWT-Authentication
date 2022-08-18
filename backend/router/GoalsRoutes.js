const express = require("express");
const router = express.Router();
const {GetGoals,SetGoal,UpdateGoal,DeleteGoal} = require("./../controllers/GoalsControllers");

router.route("/").get(GetGoals).post(SetGoal);
router.route("/:id").put(UpdateGoal).delete(DeleteGoal);

module.exports = router;