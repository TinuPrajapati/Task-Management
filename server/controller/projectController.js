const Project = require("../models/projectModel");
const User = require("../models/usersModel");

exports.allProjects = async (req, res) => {
  try {
    const allProjects = await Project.find().populate("assignedBy", "_id name role");
    res.status(200).json(allProjects);
  } catch (error) {
    console.log("error come in All project show routes", error);
    res.status(500).json({ message: "Internal server error, Please try again!" });
  }
};

// Admin create new Project
exports.createProject = async (req, res) => {
  const { name,description, priority, category, assignedTo, startDate,endDate } = req.body;
  const { userId } = req.user;
  let filesPath=[];
 if(req?.files){
  filesPath = req.files.map((file) => file.path);
 }
  try {
    const newProject = new Project({
      priority,
      category,
      name,
      description,
      assignedTo,
      startDate,
      endDate,
      description,
      assignedBy: userId,
      file:filesPath
    });
    await newProject.save();

    res.status(201).json({message:`Project assigned to ${assignedTo} successfully`});
  } catch (error) {
    console.log("error come in create project routes", error);
    res.status(500).json({ message: "Internal server error, Please try again!" });
  }
};

exports.projectByUser = async (req, res) => {
  const {userId} = req.user;
  try {
    const project = await Project.findById(userId);
    res.status(200).json(project);
  } catch (error) {
    console.log("error come in project show by user routes", error);
    res.status(500).json({ message: "Internal server error, Please try again!" });
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
    console.log("error come in update project routes", error);
    res.status(500).json({ message: "Internal server error, Please try again!" });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("error come in delete project routes", error);
    res.status(500).json({ message: "Internal server error, Please try again!" });
  }
};
