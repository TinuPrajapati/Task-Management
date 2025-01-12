const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const Project = require("../models/projectModel");

// Admin check all Projects
exports.allProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all projects", error });
  }
};

// Admin create new Project
exports.createProject = async (req, res) => {
  const { category, assignedTo, ProjectTitle, date, description, priority } =
    req.body;
  const { username } = req.user;

  try {
    const user = await User.findOne({ name: assignedTo });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Assigned user details not found" });
    }

    const newProject = new Project({
      priority,
      category,
      ProjectTitle,
      assignedTo,
      endDate: date,
      description,
      assignedBy: username,
    });

    user.projects.push(newProject);
    await user.save();
    await newProject.save();

    res.status(201).json("Project created successfully");
  } catch (error) {
    res.status(500).json({ message: "Error in creating new project", error });
  }
};

exports.particularProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(
      id,
      "_id priority category assignedTo ProjectTitle description"
    );
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in finding particular project details", error });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  const { category, assignedTo, ProjectTitle, date, description, priority } =
    req.body;
  const { username } = req.user;
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        category,
        ProjectTitle,
        assignedTo,
        endDate: date,
        description,
        priority,
        assignedBy: username,
      },
      { runValidators: true, new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json("Project update Successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating project details", error });
  }
};

// Favorite Porject
exports.favoriteProject = async (req, res) => {
  const { id, favorite } = req.body;
  try {
    await Project.findByIdAndUpdate(
      id,
      { favorite },
      { runValidators: true, new: true }
    );

    if (favorite) {
      res.status(200).json("Project added to favorites");
    } else {
      res.status(200).json("Project removed from favorites");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error to add project in favorites list", error });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json("Project deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error in deleting project", error });
  }
};

// Admin create new User
exports.signup = async (req, res) => {
  const { name, email, role, password, number } = req.body;

  try {
    // Check if the email or number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "This email already exists"
          : "This number already exists";
      return res.status(400).json({ message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      role_type: role,
      password: hashedPassword,
      number,
    });

    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json({ message: "Error in creating new user", error });
  }
};

// Fetch particular user by role
exports.particularRoleUser = async (req, res) => {
  const { role } = req.params;
  try {
    const users = await User.find(
      { role_type: role },
      "id name role_type email"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "User not found", error });
  }
};

// Fetch a single user by ID
exports.User = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, "name email role_type number");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User details not Found", error });
  }
};

// Fetch all users
exports.allUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching all users details", error });
  }
};

// Add or remove favorite user
exports.favoriteUser = async (req, res) => {
  const { id, favorite } = req.body;

  try {
    await User.findByIdAndUpdate(
      id,
      { favorite },
      { new: true, runValidators: true }
    );
    const message = favorite
      ? "User added to favorite list successfully"
      : "User removed from favorite list successfully";

    res.status(200).json(message);
  } catch (error) {
    const message = favorite
      ? "add"
      : "remove";
    res.status(500).json({ message: `Error in ${message} user in favorite list`, error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role_type, number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role_type, number, password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json("User details updated successfully");
  } catch (error) {
    res.status(500).json({ message: "Error in updating user details", error });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error: user not found", error });
  }
};