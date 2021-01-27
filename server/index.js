const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const todoModel = require('./models/todo');
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://user:12345@cluster0.lxzfr.mongodb.net/user?retryWrites=true&w=majority',  {
    useNewUrlParser : true,
});

app.post('/insert', async (req, res) => {

    const location = req.body.location;
    const day = req.body.day;
    const Todo = new todoModel({ meetingLocation : location, meetingDay : day});
    try {
        await Todo.save();
        res.send("Data Inserted");
    } catch(err){
        console.log(err);
    }
});

app.get('/read', async (req, res) => {
    todoModel.find({}, (err, result) =>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
 
});

app.put('/update', async (req, res) => {

    const newMeeting = req.body.newMeeting;
    const id = req.body.id;

    try {
      await  todoModel.findById(id, (err, updatedMeeting) => {
            updatedMeeting.meetingLocation = newMeeting;
            updatedMeeting.save();
            res.send("update");
        })
    } catch(err){
        console.log(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
   const id = req.params.id;
   await todoModel.findByIdAndRemove(id).exec();
   res.send("delete");
  

});

app.listen(3001, () => {
    console.log("Server is Running");
});  