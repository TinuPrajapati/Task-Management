const SelfTodo = require("../models/selfTodoModel");
const User = require("../models/usersModel");

// Self Todos create
exports.createTodo = async (req, res) => {
  try {
    const { todo, deadline, priority } = req.body;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = new SelfTodo({
      todo,
      deadline,
      priority,
      userId: user._id,
    });

    await newTodo.save();
    user.self_todo.push(newTodo._id);
    await user.save();
    res.status(201).json({
      message: "Self Todo created successfully",
    });
  } catch (error) {
    console.log(`Error come from Create Self Todo Route :`, error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};

// Self Todos get
exports.getTodo = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todos = await SelfTodo.find({ userId: user._id });
    res.status(200).json(todos);
  } catch (error) {
    console.log(`Error come from Get Self Todo Route :`, error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await SelfTodo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await User.updateOne(
      { _id: deleteTodo.userId },
      { $pull: { self_todo: deleteTodo._id } }
    );

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(`Error come from Delete Self Todo Route :`, error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};
