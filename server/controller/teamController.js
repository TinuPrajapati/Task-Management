const Team = require("../models/teamModel");
const User = require("../models/usersModel");

exports.getTeam = async (req, res) => {
    const {userId} = req.user;
    try {
        const user = await User.findById(userId).select("_id name role email image");
        let team;
        if(user.role === "Admin" || user.role === "Manager" || user.role === "HR") {
            team = await Team.find().populate("assignedBy members", "_id name role email image");
        }else{
            team = await Team.find({members:{$in:[userId]}}).populate("assignedBy members", "_id name role email image");
        }
        res.status(200).json(team);
    } catch (error) {
        console.log("Error come in Get Team routes", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.addTeam = async (req, res) => {
    const {userId} = req.user;
    const {name,projectName,description,priority,startDate,endDate,members} = req.body;
    try { 
        const team = await Team.create({
            name,
            projectName,
            description,
            priority,
            startDate,
            endDate,
            members,
            assignedBy:userId
        });
        team.save();
        res.status(201).json({ message: "Team Project create successfully" });
    } catch (error) {
        console.log("Error come in Add Team routes", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(team);
    } catch (error) {
        console.log("Error come in Update Team routes", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};  

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Team Project deleted successfully" });
    } catch (error) {
        console.log("Error come in Delete Team routes", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};