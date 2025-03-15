const AssignedTodo = require("../models/assignedTodoModel");
const User = require("../models/usersModel");

exports.createTodo = async (req, res) => {
  const { todo,priority,deadline,category,assignedTo } = req.body;
  console.log(req.body);
  const { userId } = req.user;
  try {
    
    return res.status(201).json("Todo added to user successfully");
  } catch (error) {
    console.error("Error come in Create Assigned Todo route : ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error, Please Try Again!" });
  }
};

// Show Todos Routes
exports.showTodos = async (req, res) => {
  const { userId } = req.user;
  try {
    const todos = await AssignedTodo.find({ assignedTo: userId });
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error come in Show Todos (Assigned User) Assigned Todo route : ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error, Please Try Again!" });
  }
};



// Delete Todo Routes
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await AssignedTodo.findByIdAndDelete(id);
    return res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.error("Error come in delete  Assigned Todo route : ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error, Please Try Again!" });
  }
};
