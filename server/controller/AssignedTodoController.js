const AssignedTodo = require("../models/assignedTodoModel");

exports.createAssignedTodo = async (req, res) => {
    try {
        const {username}= req.user;
        const {todo,deadline,priority,category,assignedTo} = req.body;
        console.log(req.body)
        res.status(201).json({message:"Todo create and assigned successfully"});
    } catch (error) {
        console.log("Error creating assigned todo:", error);
        res.status(500).json({ message: "Error creating assigned todo"});
    }
}