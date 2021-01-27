const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    meetingLocation : {
        type : String,
        required : true
    },
    meetingDay : {
        type : Number,
        required : true
    },
});

const todo =  mongoose.model("TodoList", todoSchema);
module.exports = todo;