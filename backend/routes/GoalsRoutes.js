const express = require("express");
const router = express.Router();
const {GetGoals,SetGoal,UpdateGoal,DeleteGoal} = require("./../controllers/GoalsControllers");

const {Protect} = require("../middleware/authMiddleware");

router.route("/").get(Protect,GetGoals).post(Protect,SetGoal);
router.route("/:id").put(Protect,UpdateGoal).delete(Protect,DeleteGoal);

module.exports = router;