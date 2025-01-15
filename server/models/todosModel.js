const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    category:{
        type: String,
        enum: ["Admin", "Employee", "HR", "Developer", "Designer"],
    },
    user:{
        type:String,
        required:true
    },
    todo:{
        type:String,
        required:true
    },
    work:{
        type:String,
        emum:["personal","assigned"]
    }
},{
    timestamps:true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports= Todo;