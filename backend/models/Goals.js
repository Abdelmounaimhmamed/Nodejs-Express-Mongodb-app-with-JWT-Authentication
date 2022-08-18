const mongoose = require("mongoose");
const GoalSchema = mongoose.Schema({
    text : {
        type : String,
        required : [true , "Please add this field"]
    }
},{
    TimeTampes : true
});


module.exports = mongoose.model("Goal" , GoalSchema);