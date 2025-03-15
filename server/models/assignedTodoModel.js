const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    todo: {
        type: String,
        required: [true, "Please enter todo"],
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: [true, "Please enter priority"],
    },
    deadline: {
        type: Date,
        required: [true, "Please enter deadline"],
    },
    category: {
        type: String,
        required: [true, "Please enter category"],
    },
    complete:{
        type:Boolean,
        default:false
    },
    assignedTo: {
        type: String,
        required: [true, "Please enter assigned to"],
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{
    timestamps:true
});

const AssignedTodo = mongoose.model("AssignedTodo", todoSchema);
module.exports = AssignedTodo